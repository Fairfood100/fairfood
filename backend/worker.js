const encoder = new TextEncoder();

function cors(env) {
  return {
    "access-control-allow-origin": env.CORS_ORIGIN || "*",
    "access-control-allow-methods": "GET,POST,PATCH,DELETE,OPTIONS",
    "access-control-allow-headers": "content-type,authorization",
    "x-content-type-options": "nosniff",
    "x-frame-options": "DENY",
    "referrer-policy": "no-referrer"
  };
}
function json(data, status = 200, env = {}) {
  return new Response(JSON.stringify(data), { status, headers: { "content-type":"application/json; charset=utf-8", ...cors(env) } });
}
function ok(data = {}, env = {}, status = 200) { return json({ success:true, ...data }, status, env); }
function fail(message, status = 400, code = "ERROR", env = {}) { return json({ success:false, error:{ code, message } }, status, env); }
function uid(prefix) { return prefix + "_" + crypto.randomUUID(); }
async function readBody(request) { try { return await request.json(); } catch { return {}; } }

async function sha256Hex(input) {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(input));
  return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2,"0")).join("");
}
async function hashPassword(password) {
  const salt = crypto.randomUUID().replaceAll("-", "");
  return `sha256$${salt}$${await sha256Hex(salt + password)}`;
}
async function verifyPassword(password, stored) {
  const [type, salt, hash] = String(stored || "").split("$");
  if (type !== "sha256") return false;
  return await sha256Hex(salt + password) === hash;
}
function b64urlEncode(value) {
  const bytes = typeof value === "string" ? encoder.encode(value) : value;
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replaceAll("+","-").replaceAll("/","_").replaceAll("=","");
}
function b64urlDecode(str) {
  str = str.replaceAll("-","+").replaceAll("_","/");
  while (str.length % 4) str += "=";
  const binary = atob(str);
  return new Uint8Array([...binary].map(c => c.charCodeAt(0)));
}
async function hmac(secret, data) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), {name:"HMAC", hash:"SHA-256"}, false, ["sign"]);
  return crypto.subtle.sign("HMAC", key, encoder.encode(data));
}
async function signJwt(payload, env) {
  const now = Math.floor(Date.now()/1000);
  const header = b64urlEncode(JSON.stringify({alg:"HS256", typ:"JWT"}));
  const body = b64urlEncode(JSON.stringify({...payload, iss:env.JWT_ISSUER || "fairfood", iat:now, exp:now + Number(env.ACCESS_TOKEN_TTL_SECONDS || 86400)}));
  const data = `${header}.${body}`;
  const sig = b64urlEncode(new Uint8Array(await hmac(env.JWT_SECRET || "dev-secret-change-me", data)));
  return `${data}.${sig}`;
}
async function verifyJwt(token, env) {
  const [h,p,s] = String(token || "").split(".");
  if (!h || !p || !s) throw new Error("Invalid token");
  const data = `${h}.${p}`;
  const expected = b64urlEncode(new Uint8Array(await hmac(env.JWT_SECRET || "dev-secret-change-me", data)));
  if (expected !== s) throw new Error("Invalid signature");
  const payload = JSON.parse(new TextDecoder().decode(b64urlDecode(p)));
  if (payload.exp < Math.floor(Date.now()/1000)) throw new Error("Expired token");
  return payload;
}
async function currentUser(request, env) {
  const auth = request.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token) return null;
  const payload = await verifyJwt(token, env);
  return env.DB.prepare("SELECT id, role, name, email, phone, status FROM users WHERE id=? AND status='active'").bind(payload.sub).first();
}
async function requireAuth(request, env, roles = null) {
  const user = await currentUser(request, env).catch(() => null);
  if (!user) return { error: fail("Authentication required", 401, "AUTH_REQUIRED", env) };
  if (roles && ![].concat(roles).includes(user.role)) return { error: fail("Forbidden", 403, "FORBIDDEN", env) };
  return { user };
}
async function audit(env, actor, action, entityType=null, entityId=null, request=null) {
  const ip = request?.headers?.get("cf-connecting-ip") || request?.headers?.get("x-forwarded-for") || null;
  await env.DB.prepare("INSERT INTO audit_logs (id, actor_user_id, action, entity_type, entity_id, ip) VALUES (?, ?, ?, ?, ?, ?)")
    .bind(uid("aud"), actor?.id || null, action, entityType, entityId, ip).run().catch(()=>{});
}
async function rateLimit(request, env, limit = 180) {
  const ip = request.headers.get("cf-connecting-ip") || "local";
  const key = "rl:" + ip;
  const now = Math.floor(Date.now()/1000);
  const bucket = await env.DB.prepare("SELECT * FROM rate_limits WHERE key=?").bind(key).first().catch(()=>null);
  if (!bucket || bucket.reset_at < now) {
    await env.DB.prepare("INSERT OR REPLACE INTO rate_limits (key,count,reset_at) VALUES (?,1,?)").bind(key, now + 60).run().catch(()=>{});
    return true;
  }
  if (bucket.count >= limit) return false;
  await env.DB.prepare("UPDATE rate_limits SET count=count+1 WHERE key=?").bind(key).run().catch(()=>{});
  return true;
}
async function notify(env, userId, title, body) {
  if (!userId) return;
  await env.DB.prepare("INSERT INTO notifications (id,user_id,title,body) VALUES (?,?,?,?)")
    .bind(uid("n"), userId, title, body || "").run().catch(()=>{});
}
async function addEvent(env, orderId, actorId, type, note) {
  await env.DB.prepare("INSERT INTO order_events (id, order_id, actor_user_id, event_type, note) VALUES (?, ?, ?, ?, ?)")
    .bind(uid("ev"), orderId, actorId || null, type, note || type).run();
}
function distanceKm(aLat,aLng,bLat,bLng) {
  if ([aLat,aLng,bLat,bLng].some(v => v === null || v === undefined || Number.isNaN(Number(v)))) return 999999;
  const R=6371, dLat=(Number(bLat)-Number(aLat))*Math.PI/180, dLng=(Number(bLng)-Number(aLng))*Math.PI/180;
  const s=Math.sin(dLat/2)**2 + Math.cos(Number(aLat)*Math.PI/180)*Math.cos(Number(bLat)*Math.PI/180)*Math.sin(dLng/2)**2;
  return R*2*Math.atan2(Math.sqrt(s),Math.sqrt(1-s));
}
async function createWalletIfMissing(env, ownerType, ownerId) {
  const existing = await env.DB.prepare("SELECT id FROM wallets WHERE owner_type=? AND owner_id=?").bind(ownerType, ownerId).first();
  if (existing) return existing.id;
  const wid = uid("w");
  await env.DB.prepare("INSERT INTO wallets (id,owner_type,owner_id,balance_cents,pending_cents) VALUES (?,?,?,?,?)").bind(wid, ownerType, ownerId, 0, 0).run();
  return wid;
}
async function creditWallet(env, ownerType, ownerId, orderId, amount, note) {
  const wid = await createWalletIfMissing(env, ownerType, ownerId);
  await env.DB.batch([
    env.DB.prepare("UPDATE wallets SET balance_cents=balance_cents+? WHERE id=?").bind(amount, wid),
    env.DB.prepare("INSERT INTO wallet_transactions (id,wallet_id,order_id,type,amount_cents,note) VALUES (?,?,?,?,?,?)").bind(uid("wt"), wid, orderId, "credit", amount, note)
  ]);
}
async function getOrder(env, id) {
  return env.DB.prepare("SELECT o.*, r.name restaurant_name, r.address restaurant_address, r.lat restaurant_lat, r.lng restaurant_lng, r.owner_user_id FROM orders o JOIN restaurants r ON r.id=o.restaurant_id WHERE o.id=?").bind(id).first();
}
async function dispatchBestDriver(env, order) {
  const drivers = (await env.DB.prepare("SELECT * FROM drivers WHERE status='online' AND verification_status='approved'").all()).results || [];
  if (!drivers.length) return null;
  const ranked = drivers.map(d => ({...d, score: distanceKm(order.restaurant_lat, order.restaurant_lng, d.lat, d.lng)})).sort((a,b)=>a.score-b.score);
  return ranked[0] || null;
}

async function app(request, env) {
  if (request.method === "OPTIONS") return new Response(null, { headers: cors(env) });
  if (!(await rateLimit(request, env))) return fail("Too many requests", 429, "RATE_LIMIT", env);
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, "") || "/";
  const method = request.method;

  if (path === "/" || path === "/api/health") return ok({ service:"Fairfood Launch Ready Lite", status:"ok", apiBase:env.PUBLIC_API_BASE }, env);

  if (path === "/api/auth/register" && method === "POST") {
    const b = await readBody(request);
    if (!["customer","restaurant","driver"].includes(b.role)) return fail("Invalid role", 422, "INVALID_ROLE", env);
    if (!b.email || !b.password || !b.name) return fail("Missing registration fields", 422, "MISSING_FIELDS", env);
    const userId = uid("u");
    await env.DB.prepare("INSERT INTO users (id, role, name, email, phone, password_hash, status) VALUES (?, ?, ?, ?, ?, ?, 'active')")
      .bind(userId, b.role, b.name, String(b.email).toLowerCase(), b.phone || null, await hashPassword(b.password)).run();
    if (b.role === "customer") await createWalletIfMissing(env, "customer", userId);
    if (b.role === "restaurant") {
      const rid = uid("r");
      await env.DB.prepare("INSERT INTO restaurants (id, owner_user_id, name, description, address, cuisine, status, verification_status) VALUES (?, ?, ?, ?, ?, ?, 'closed', 'pending')")
        .bind(rid, userId, b.restaurantName || b.name, b.description || "", b.address || "Address needed", b.cuisine || "Food").run();
      await createWalletIfMissing(env, "restaurant", rid);
      await env.DB.prepare("INSERT INTO documents (id, owner_type, owner_id, document_type, file_url, status) VALUES (?, 'restaurant', ?, 'business_license', ?, 'pending')")
        .bind(uid("doc"), rid, b.businessLicenseUrl || "").run();
    }
    if (b.role === "driver") {
      const did = uid("d");
      await env.DB.prepare("INSERT INTO drivers (id, user_id, status, vehicle, plate_number, verification_status) VALUES (?, ?, 'offline', ?, ?, 'pending')")
        .bind(did, userId, b.vehicle || "car", b.plateNumber || "").run();
      await createWalletIfMissing(env, "driver", did);
      await env.DB.prepare("INSERT INTO documents (id, owner_type, owner_id, document_type, file_url, status) VALUES (?, 'driver', ?, 'driver_license', ?, 'pending')")
        .bind(uid("doc"), did, b.driverLicenseUrl || "").run();
    }
    const user = await env.DB.prepare("SELECT id, role, name, email, phone FROM users WHERE id=?").bind(userId).first();
    await audit(env, user, "auth.register", "user", userId, request);
    return ok({ user, token: await signJwt({sub:user.id, role:user.role}, env) }, env, 201);
  }

  if (path === "/api/auth/login" && method === "POST") {
    const b = await readBody(request);
    const user = await env.DB.prepare("SELECT * FROM users WHERE email=?").bind(String(b.email || "").toLowerCase()).first();
    if (!user || !(await verifyPassword(b.password || "", user.password_hash))) return fail("Invalid login", 401, "INVALID_LOGIN", env);
    if (user.status !== "active") return fail("Account not active", 403, "ACCOUNT_NOT_ACTIVE", env);
    const safe = { id:user.id, role:user.role, name:user.name, email:user.email, phone:user.phone };
    await audit(env, safe, "auth.login", "user", user.id, request);
    return ok({ user:safe, token: await signJwt({ sub:user.id, role:user.role }, env) }, env);
  }

  if (path === "/api/auth/me" && method === "GET") {
    const a = await requireAuth(request, env); if (a.error) return a.error;
    return ok({ user:a.user }, env);
  }

  if (path === "/api/restaurants" && method === "GET") {
    const rows = await env.DB.prepare("SELECT * FROM restaurants WHERE status='open' AND verification_status='approved' ORDER BY rating DESC").all();
    return ok({ restaurants: rows.results || [] }, env);
  }

  const publicMenu = path.match(/^\/api\/restaurants\/([^/]+)\/menu$/);
  if (publicMenu && method === "GET") {
    const rows = await env.DB.prepare("SELECT * FROM menu_items WHERE restaurant_id=? AND available=1 AND (inventory_count IS NULL OR inventory_count > 0) ORDER BY category, name").bind(publicMenu[1]).all();
    return ok({ items: rows.results || [] }, env);
  }

  if (path === "/api/coupons/validate" && method === "POST") {
    const b = await readBody(request);
    const subtotal = Number(b.subtotalCents || 0);
    const c = await env.DB.prepare("SELECT * FROM coupons WHERE code=? AND active=1").bind(String(b.code || "").toUpperCase()).first();
    if (!c) return fail("Invalid coupon", 404, "INVALID_COUPON", env);
    if (subtotal < c.min_order_cents) return fail("Minimum order not reached for coupon", 422, "COUPON_MIN_ORDER", env);
    const discount = Math.min(subtotal, Math.max(Number(c.amount_off_cents || 0), Math.round(subtotal * Number(c.percent_off || 0) / 100)));
    return ok({ coupon:c, discountCents:discount }, env);
  }

  if (path === "/api/orders" && method === "POST") {
    const a = await requireAuth(request, env, "customer"); if (a.error) return a.error;
    const b = await readBody(request);
    if (!b.restaurantId || !Array.isArray(b.items) || !b.items.length || !b.deliveryAddress) return fail("Missing order data", 422, "INVALID_ORDER", env);
    const restaurant = await env.DB.prepare("SELECT * FROM restaurants WHERE id=? AND status='open' AND verification_status='approved'").bind(b.restaurantId).first();
    if (!restaurant) return fail("Restaurant is closed", 422, "RESTAURANT_CLOSED", env);
    let subtotal = 0; const prepared = [];
    for (const it of b.items) {
      const m = await env.DB.prepare("SELECT * FROM menu_items WHERE id=? AND restaurant_id=? AND available=1").bind(it.menuItemId, restaurant.id).first();
      if (!m) return fail("Item unavailable", 422, "ITEM_UNAVAILABLE", env);
      const qty = Math.max(1, Number(it.quantity || 1));
      if (m.inventory_count !== null && Number(m.inventory_count) < qty) return fail("Item out of stock", 422, "OUT_OF_STOCK", env);
      const total = qty * m.price_cents; subtotal += total; prepared.push({m, qty, total});
    }
    if (subtotal < restaurant.min_order_cents) return fail("Minimum order not reached", 422, "MIN_ORDER", env);
    let discount = 0, couponCode = null;
    if (b.couponCode) {
      const c = await env.DB.prepare("SELECT * FROM coupons WHERE code=? AND active=1").bind(String(b.couponCode).toUpperCase()).first();
      if (c && subtotal >= c.min_order_cents) {
        discount = Math.min(subtotal, Math.max(Number(c.amount_off_cents || 0), Math.round(subtotal * Number(c.percent_off || 0) / 100)));
        couponCode = c.code;
      }
    }
    const orderId = uid("o");
    const total = Math.max(0, subtotal + restaurant.delivery_fee_cents - discount);
    await env.DB.prepare("INSERT INTO orders (id, customer_user_id, restaurant_id, customer_name, customer_phone, delivery_address, delivery_note, subtotal_cents, delivery_fee_cents, discount_cents, total_cents, payment_method, payment_status, coupon_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
      .bind(orderId, a.user.id, restaurant.id, b.customerName || a.user.name, b.customerPhone || a.user.phone, b.deliveryAddress, b.deliveryNote || "", subtotal, restaurant.delivery_fee_cents, discount, total, b.paymentMethod || "cash", b.paymentMethod === "cash" ? "pending" : "pending", couponCode).run();
    for (const item of prepared) {
      await env.DB.prepare("INSERT INTO order_items (id, order_id, menu_item_id, name, quantity, unit_price_cents, total_cents) VALUES (?, ?, ?, ?, ?, ?, ?)")
        .bind(uid("oi"), orderId, item.m.id, item.m.name, item.qty, item.m.price_cents, item.total).run();
      if (item.m.inventory_count !== null) {
        await env.DB.prepare("UPDATE menu_items SET inventory_count=inventory_count-? WHERE id=?").bind(item.qty, item.m.id).run();
      }
    }
    await addEvent(env, orderId, a.user.id, "order.created", "طلب جديد وصل للمطعم");
    await notify(env, restaurant.owner_user_id, "طلب جديد", "لديك طلب جديد يحتاج قبول أو رفض.");
    await audit(env, a.user, "order.create", "order", orderId, request);
    return ok({ orderId }, env, 201);
  }

  if (path === "/api/orders/my" && method === "GET") {
    const a = await requireAuth(request, env, "customer"); if (a.error) return a.error;
    const rows = await env.DB.prepare("SELECT o.*, r.name AS restaurant_name FROM orders o JOIN restaurants r ON r.id=o.restaurant_id WHERE o.customer_user_id=? ORDER BY o.created_at DESC LIMIT 50").bind(a.user.id).all();
    return ok({ orders: rows.results || [] }, env);
  }

  if (path === "/api/restaurant/profile" && method === "GET") {
    const a = await requireAuth(request, env, "restaurant"); if (a.error) return a.error;
    const restaurant = await env.DB.prepare("SELECT * FROM restaurants WHERE owner_user_id=?").bind(a.user.id).first();
    return ok({ restaurant }, env);
  }

  if (path === "/api/restaurant/menu" && method === "GET") {
    const a = await requireAuth(request, env, "restaurant"); if (a.error) return a.error;
    const r = await env.DB.prepare("SELECT id FROM restaurants WHERE owner_user_id=?").bind(a.user.id).first();
    const items = await env.DB.prepare("SELECT * FROM menu_items WHERE restaurant_id=? ORDER BY category, name").bind(r.id).all();
    return ok({ items: items.results || [] }, env);
  }

  if (path === "/api/restaurant/menu" && method === "POST") {
    const a = await requireAuth(request, env, "restaurant"); if (a.error) return a.error;
    const b = await readBody(request);
    const r = await env.DB.prepare("SELECT id FROM restaurants WHERE owner_user_id=?").bind(a.user.id).first();
    const itemId = uid("m");
    await env.DB.prepare("INSERT INTO menu_items (id, restaurant_id, category, name, description, price_cents, image, tags, available, inventory_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
      .bind(itemId, r.id, b.category || "Main", b.name || "Item", b.description || "", Number(b.priceCents || 0), b.image || "", b.tags || "", b.available === false ? 0 : 1, b.inventoryCount ?? null).run();
    return ok({ id:itemId }, env, 201);
  }

  const restaurantItem = path.match(/^\/api\/restaurant\/menu\/([^/]+)$/);
  if (restaurantItem && ["PATCH","DELETE"].includes(method)) {
    const a = await requireAuth(request, env, "restaurant"); if (a.error) return a.error;
    const r = await env.DB.prepare("SELECT id FROM restaurants WHERE owner_user_id=?").bind(a.user.id).first();
    if (method === "DELETE") {
      await env.DB.prepare("DELETE FROM menu_items WHERE id=? AND restaurant_id=?").bind(restaurantItem[1], r.id).run();
      return ok({ message:"deleted" }, env);
    }
    const b = await readBody(request);
    await env.DB.prepare("UPDATE menu_items SET category=COALESCE(?,category), name=COALESCE(?,name), description=COALESCE(?,description), price_cents=COALESCE(?,price_cents), image=COALESCE(?,image), tags=COALESCE(?,tags), available=COALESCE(?,available), inventory_count=COALESCE(?,inventory_count), updated_at=CURRENT_TIMESTAMP WHERE id=? AND restaurant_id=?")
      .bind(b.category ?? null, b.name ?? null, b.description ?? null, b.priceCents ?? null, b.image ?? null, b.tags ?? null, b.available === undefined ? null : (b.available ? 1 : 0), b.inventoryCount ?? null, restaurantItem[1], r.id).run();
    return ok({ message:"updated" }, env);
  }

  if (path === "/api/restaurant/orders" && method === "GET") {
    const a = await requireAuth(request, env, "restaurant"); if (a.error) return a.error;
    const r = await env.DB.prepare("SELECT id FROM restaurants WHERE owner_user_id=?").bind(a.user.id).first();
    const rows = await env.DB.prepare("SELECT * FROM orders WHERE restaurant_id=? ORDER BY created_at DESC LIMIT 100").bind(r.id).all();
    return ok({ orders: rows.results || [] }, env);
  }

  if (path === "/api/driver/status" && method === "POST") {
    const a = await requireAuth(request, env, "driver"); if (a.error) return a.error;
    const b = await readBody(request);
    const status = b.online ? "online" : "offline";
    await env.DB.prepare("UPDATE drivers SET status=?, updated_at=CURRENT_TIMESTAMP WHERE user_id=?").bind(status, a.user.id).run();
    return ok({ status }, env);
  }

  if (path === "/api/driver/location" && method === "POST") {
    const a = await requireAuth(request, env, "driver"); if (a.error) return a.error;
    const b = await readBody(request);
    const lat = Number(b.lat), lng = Number(b.lng);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return fail("Invalid location", 422, "INVALID_LOCATION", env);
    const d = await env.DB.prepare("SELECT id FROM drivers WHERE user_id=?").bind(a.user.id).first();
    await env.DB.batch([
      env.DB.prepare("UPDATE drivers SET lat=?, lng=?, last_location_at=CURRENT_TIMESTAMP WHERE id=?").bind(lat, lng, d.id),
      env.DB.prepare("INSERT INTO driver_locations (id,driver_id,order_id,lat,lng,accuracy) VALUES (?,?,?,?,?,?)").bind(uid("dl"), d.id, b.orderId || null, lat, lng, b.accuracy || null)
    ]);
    return ok({ location:{lat,lng} }, env);
  }

  if (path === "/api/driver/orders/available" && method === "GET") {
    const a = await requireAuth(request, env, "driver"); if (a.error) return a.error;
    const rows = await env.DB.prepare("SELECT o.*, r.name AS restaurant_name, r.address AS restaurant_address, r.lat AS restaurant_lat, r.lng AS restaurant_lng FROM orders o JOIN restaurants r ON r.id=o.restaurant_id WHERE o.status='ready_for_driver' AND o.driver_id IS NULL ORDER BY o.updated_at ASC LIMIT 50").all();
    return ok({ orders: rows.results || [] }, env);
  }

  if (path === "/api/driver/orders/current" && method === "GET") {
    const a = await requireAuth(request, env, "driver"); if (a.error) return a.error;
    const d = await env.DB.prepare("SELECT id FROM drivers WHERE user_id=?").bind(a.user.id).first();
    const rows = await env.DB.prepare("SELECT o.*, r.name AS restaurant_name, r.address AS restaurant_address, r.lat AS restaurant_lat, r.lng AS restaurant_lng FROM orders o JOIN restaurants r ON r.id=o.restaurant_id WHERE o.driver_id=? AND o.status NOT IN ('completed','cancelled') ORDER BY o.updated_at DESC").bind(d?.id || "").all();
    return ok({ orders: rows.results || [] }, env);
  }

  const action = path.match(/^\/api\/orders\/([^/]+)\/([^/]+)$/);
  if (action && method === "POST") {
    const [, orderId, act] = action;
    const a = await requireAuth(request, env); if (a.error) return a.error;
    const b = await readBody(request);
    const order = await getOrder(env, orderId);
    if (!order) return fail("Order not found", 404, "NOT_FOUND", env);

    if (act === "restaurant-accept") {
      if (a.user.role !== "restaurant" || order.owner_user_id !== a.user.id) return fail("Forbidden", 403, "FORBIDDEN", env);
      const prep = Math.max(5, Number(b.prepTimeMin || 25));
      await env.DB.prepare("UPDATE orders SET status='accepted_by_restaurant', prep_time_min=?, restaurant_note=?, updated_at=CURRENT_TIMESTAMP WHERE id=?").bind(prep, b.note || "", orderId).run();
      await addEvent(env, orderId, a.user.id, "restaurant.accepted", `المطعم قبل الطلب - وقت التجهيز ${prep} دقيقة`);
      await notify(env, order.customer_user_id, "تم قبول الطلب", `المطعم قبل طلبك. وقت التجهيز ${prep} دقيقة.`);
      return ok({ message:"accepted" }, env);
    }
    if (act === "restaurant-reject") {
      if (a.user.role !== "restaurant" || order.owner_user_id !== a.user.id) return fail("Forbidden", 403, "FORBIDDEN", env);
      await env.DB.prepare("UPDATE orders SET status='rejected_by_restaurant', cancel_reason=?, updated_at=CURRENT_TIMESTAMP WHERE id=?").bind(b.reason || "Rejected", orderId).run();
      await addEvent(env, orderId, a.user.id, "restaurant.rejected", b.reason || "رفض المطعم الطلب");
      await notify(env, order.customer_user_id, "تم رفض الطلب", "المطعم رفض الطلب.");
      return ok({ message:"rejected" }, env);
    }
    if (act === "preparing") {
      if (a.user.role !== "restaurant" || order.owner_user_id !== a.user.id) return fail("Forbidden", 403, "FORBIDDEN", env);
      await env.DB.prepare("UPDATE orders SET status='preparing', updated_at=CURRENT_TIMESTAMP WHERE id=?").bind(orderId).run();
      await addEvent(env, orderId, a.user.id, "restaurant.preparing", "جاري تحضير الطلب");
      return ok({ message:"preparing" }, env);
    }
    if (act === "ready") {
      if (a.user.role !== "restaurant" || order.owner_user_id !== a.user.id) return fail("Forbidden", 403, "FORBIDDEN", env);
      const best = await dispatchBestDriver(env, order);
      if (best) {
        await env.DB.batch([
          env.DB.prepare("UPDATE orders SET status='accepted_by_driver', driver_id=?, updated_at=CURRENT_TIMESTAMP WHERE id=?").bind(best.id, orderId),
          env.DB.prepare("UPDATE drivers SET status='busy' WHERE id=?").bind(best.id)
        ]);
        await addEvent(env, orderId, a.user.id, "dispatch.auto_assigned", "تم تعيين سائق تلقائيًا");
        const driverUser = await env.DB.prepare("SELECT user_id FROM drivers WHERE id=?").bind(best.id).first();
        await notify(env, driverUser?.user_id, "طلب توصيل جديد", "تم تعيين طلب جاهز لك.");
        await notify(env, order.customer_user_id, "تم تعيين السائق", "السائق في طريقه لاستلام الطلب.");
        return ok({ message:"ready and assigned", driverId:best.id }, env);
      }
      await env.DB.prepare("UPDATE orders SET status='ready_for_driver', updated_at=CURRENT_TIMESTAMP WHERE id=?").bind(orderId).run();
      await addEvent(env, orderId, a.user.id, "restaurant.ready", "الطلب جاهز للسائق");
      await notify(env, order.customer_user_id, "الطلب جاهز", "الطلب جاهز ونبحث عن سائق.");
      return ok({ message:"ready" }, env);
    }
    if (act === "driver-accept") {
      if (a.user.role !== "driver") return fail("Driver role required", 403, "FORBIDDEN", env);
      if (order.status !== "ready_for_driver" || order.driver_id) return fail("Order not available", 409, "NOT_AVAILABLE", env);
      const d = await env.DB.prepare("SELECT * FROM drivers WHERE user_id=?").bind(a.user.id).first();
      if (!d || d.status !== "online" || d.verification_status !== "approved") return fail("Driver must be online and approved", 409, "DRIVER_NOT_ONLINE", env);
      await env.DB.batch([
        env.DB.prepare("UPDATE orders SET status='accepted_by_driver', driver_id=?, updated_at=CURRENT_TIMESTAMP WHERE id=?").bind(d.id, orderId),
        env.DB.prepare("UPDATE drivers SET status='busy' WHERE id=?").bind(d.id)
      ]);
      await addEvent(env, orderId, a.user.id, "driver.accepted", "السائق قبل التوصيل");
      await notify(env, order.customer_user_id, "السائق قبل الطلب", "السائق في طريقه للمطعم.");
      return ok({ message:"driver accepted" }, env);
    }
    if (act === "picked-up") {
      if (a.user.role !== "driver") return fail("Driver role required", 403, "FORBIDDEN", env);
      await env.DB.prepare("UPDATE orders SET status='picked_up', updated_at=CURRENT_TIMESTAMP WHERE id=?").bind(orderId).run();
      await addEvent(env, orderId, a.user.id, "driver.picked_up", "السائق استلم الطلب من المطعم");
      await notify(env, order.customer_user_id, "تم استلام الطلب", "السائق استلم الطلب من المطعم.");
      return ok({ message:"picked up" }, env);
    }
    if (act === "on-the-way") {
      if (a.user.role !== "driver") return fail("Driver role required", 403, "FORBIDDEN", env);
      const eta = Math.max(3, Number(b.etaMin || 10));
      await env.DB.prepare("UPDATE orders SET status='on_the_way', eta_min=?, updated_at=CURRENT_TIMESTAMP WHERE id=?").bind(eta, orderId).run();
      await addEvent(env, orderId, a.user.id, "driver.on_the_way", `السائق في الطريق إليك - ${eta} دقائق تقريباً`);
      await notify(env, order.customer_user_id, "السائق في الطريق", `السائق في الطريق إليك - ${eta} دقائق تقريباً.`);
      return ok({ message:"on the way", etaMin:eta }, env);
    }
    if (act === "delivered") {
      if (a.user.role !== "driver") return fail("Driver role required", 403, "FORBIDDEN", env);
      const d = await env.DB.prepare("SELECT id FROM drivers WHERE user_id=?").bind(a.user.id).first();
      const restaurantShare = Math.round(order.subtotal_cents * 0.88);
      const driverShare = order.delivery_fee_cents;
      const platformShare = Math.max(0, order.total_cents - restaurantShare - driverShare);
      await env.DB.batch([
        env.DB.prepare("UPDATE orders SET status='completed', payment_status=CASE WHEN payment_method='cash' THEN 'paid' ELSE payment_status END, updated_at=CURRENT_TIMESTAMP WHERE id=?").bind(orderId),
        env.DB.prepare("UPDATE drivers SET status='online' WHERE id=?").bind(d?.id || "")
      ]);
      await creditWallet(env, "restaurant", order.restaurant_id, orderId, restaurantShare, "Restaurant order share");
      if (d?.id) await creditWallet(env, "driver", d.id, orderId, driverShare, "Driver delivery fee");
      await creditWallet(env, "platform", "platform", orderId, platformShare, "Platform commission");
      await addEvent(env, orderId, a.user.id, "order.completed", "تم تسليم الطلب");
      await notify(env, order.customer_user_id, "تم التسليم", "تم تسليم طلبك بنجاح.");
      return ok({ message:"completed" }, env);
    }
    if (act === "cancel") {
      await env.DB.prepare("UPDATE orders SET status='cancelled', cancel_reason=?, updated_at=CURRENT_TIMESTAMP WHERE id=?").bind(b.reason || "Cancelled", orderId).run();
      await addEvent(env, orderId, a.user.id, "order.cancelled", b.reason || "تم إلغاء الطلب");
      await notify(env, order.customer_user_id, "تم إلغاء الطلب", b.reason || "تم إلغاء الطلب.");
      return ok({ message:"cancelled" }, env);
    }
  }

  const single = path.match(/^\/api\/orders\/([^/]+)$/);
  if (single && method === "GET") {
    const a = await requireAuth(request, env); if (a.error) return a.error;
    const order = await getOrder(env, single[1]);
    if (!order) return fail("Order not found", 404, "NOT_FOUND", env);
    const items = await env.DB.prepare("SELECT * FROM order_items WHERE order_id=?").bind(order.id).all();
    const events = await env.DB.prepare("SELECT * FROM order_events WHERE order_id=? ORDER BY created_at").bind(order.id).all();
    return ok({ order, items:items.results || [], events:events.results || [] }, env);
  }

  if (path === "/api/wallet" && method === "GET") {
    const a = await requireAuth(request, env); if (a.error) return a.error;
    let ownerType=a.user.role, ownerId=a.user.id;
    if (a.user.role === "restaurant") { const r=await env.DB.prepare("SELECT id FROM restaurants WHERE owner_user_id=?").bind(a.user.id).first(); ownerType="restaurant"; ownerId=r?.id; }
    if (a.user.role === "driver") { const d=await env.DB.prepare("SELECT id FROM drivers WHERE user_id=?").bind(a.user.id).first(); ownerType="driver"; ownerId=d?.id; }
    const wid = await createWalletIfMissing(env, ownerType, ownerId);
    const wallet = await env.DB.prepare("SELECT * FROM wallets WHERE id=?").bind(wid).first();
    const tx = await env.DB.prepare("SELECT * FROM wallet_transactions WHERE wallet_id=? ORDER BY created_at DESC LIMIT 50").bind(wid).all();
    return ok({ wallet, transactions:tx.results || [] }, env);
  }

  if (path === "/api/notifications" && method === "GET") {
    const a = await requireAuth(request, env); if (a.error) return a.error;
    const rows = await env.DB.prepare("SELECT * FROM notifications WHERE user_id=? ORDER BY created_at DESC LIMIT 50").bind(a.user.id).all();
    return ok({ notifications:rows.results || [] }, env);
  }

  if (path === "/api/support/tickets" && method === "POST") {
    const a = await requireAuth(request, env); if (a.error) return a.error;
    const b = await readBody(request);
    const tid = uid("t");
    await env.DB.prepare("INSERT INTO support_tickets (id,user_id,order_id,subject,message) VALUES (?,?,?,?,?)").bind(tid, a.user.id, b.orderId || null, b.subject || "Support", b.message || "").run();
    return ok({ id:tid }, env, 201);
  }

  if (path === "/api/ratings" && method === "POST") {
    const a = await requireAuth(request, env); if (a.error) return a.error;
    const b = await readBody(request);
    await env.DB.prepare("INSERT INTO ratings (id,order_id,from_user_id,target_type,target_id,stars,comment) VALUES (?,?,?,?,?,?,?)")
      .bind(uid("rat"), b.orderId, a.user.id, b.targetType, b.targetId, Number(b.stars || 5), b.comment || "").run();
    return ok({ message:"rated" }, env);
  }

  if (path === "/api/payments/create-intent" && method === "POST") {
    const a = await requireAuth(request, env, "customer"); if (a.error) return a.error;
    return ok({
      enabled:false,
      cashMode:true,
      provider:"stripe/apple_pay/google_pay",
      message:"Payment providers are ready as placeholders. Add Stripe/Apple Pay/Google Pay credentials to activate."
    }, env);
  }

  if (path === "/api/admin/dashboard" && method === "GET") {
    const a = await requireAuth(request, env, "admin"); if (a.error) return a.error;
    const users = await env.DB.prepare("SELECT role, COUNT(*) count FROM users GROUP BY role").all();
    const orders = await env.DB.prepare("SELECT status, COUNT(*) count FROM orders GROUP BY status").all();
    const revenue = await env.DB.prepare("SELECT COALESCE(SUM(total_cents),0) total_cents FROM orders WHERE status='completed'").first();
    const wallets = await env.DB.prepare("SELECT owner_type, COALESCE(SUM(balance_cents),0) balance_cents FROM wallets GROUP BY owner_type").all();
    return ok({ users:users.results || [], orders:orders.results || [], revenue, wallets:wallets.results || [] }, env);
  }
  if (path === "/api/admin/orders" && method === "GET") {
    const a = await requireAuth(request, env, "admin"); if (a.error) return a.error;
    const rows = await env.DB.prepare("SELECT o.*, r.name restaurant_name FROM orders o JOIN restaurants r ON r.id=o.restaurant_id ORDER BY o.created_at DESC LIMIT 200").all();
    return ok({ orders:rows.results || [] }, env);
  }
  if (path === "/api/admin/users" && method === "GET") {
    const a = await requireAuth(request, env, "admin"); if (a.error) return a.error;
    const rows = await env.DB.prepare("SELECT id, role, name, email, phone, status, created_at FROM users ORDER BY created_at DESC").all();
    return ok({ users:rows.results || [] }, env);
  }
  if (path === "/api/admin/documents" && method === "GET") {
    const a = await requireAuth(request, env, "admin"); if (a.error) return a.error;
    const rows = await env.DB.prepare("SELECT * FROM documents ORDER BY created_at DESC LIMIT 100").all();
    return ok({ documents:rows.results || [] }, env);
  }
  const docApprove = path.match(/^\/api\/admin\/documents\/([^/]+)\/(approve|reject)$/);
  if (docApprove && method === "POST") {
    const a = await requireAuth(request, env, "admin"); if (a.error) return a.error;
    const status = docApprove[2] === "approve" ? "approved" : "rejected";
    await env.DB.prepare("UPDATE documents SET status=? WHERE id=?").bind(status, docApprove[1]).run();
    return ok({ status }, env);
  }

  return fail("Route not found", 404, "ROUTE_NOT_FOUND", env);
}

export default {
  async fetch(request, env) {
    try { return await app(request, env); }
    catch (e) { return fail(e.message || "Internal server error", e.status || 500, "INTERNAL", env); }
  }
};
