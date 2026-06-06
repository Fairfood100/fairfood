import { ok, error, onOptions } from "../../utils/response.js";
import { requireAuth } from "../../utils/auth.js";

export const onRequestOptions = onOptions;

const uid = () => crypto.randomUUID();

async function tableColumns(env, table) {
  const r = await env.DB.prepare(`PRAGMA table_info(${table})`).all();
  return new Set((r.results || []).map(x => x.name));
}

async function insertFlexible(env, table, data) {
  const cols = await tableColumns(env, table);
  const entries = Object.entries(data).filter(([k, v]) => cols.has(k) && v !== undefined);
  if (!entries.length) return null;
  const names = entries.map(([k]) => k);
  const vals = entries.map(([, v]) => v);
  const qs = names.map(() => "?").join(",");
  await env.DB.prepare(`INSERT INTO ${table} (${names.join(",")}) VALUES (${qs})`).bind(...vals).run();
}

export async function onRequestGet({ request, env }) {
  const user = await requireAuth(request, env);
  if (!user) return error("Unauthorized", 401);

  const action = new URL(request.url).searchParams.get("action") || "me";

  if (action === "me") {
    const row = await env.DB.prepare("SELECT id,name,email,role,status FROM users WHERE id=?").bind(user.sub).first();
    return ok({ user: row || { id: user.sub, role: user.role } });
  }

  if (action === "addresses") {
    const r = await env.DB.prepare("SELECT * FROM addresses WHERE user_id=? ORDER BY created_at DESC").bind(user.sub).all();
    return ok({ addresses: r.results || [] });
  }

  if (action === "wallet") {
    const w = await env.DB.prepare("SELECT * FROM wallets WHERE owner_id=? ORDER BY created_at DESC LIMIT 1").bind(user.sub).first();
    return ok({ wallet: w || { balance_cents: 0, pending_cents: 0 } });
  }

  if (action === "notifications") {
    const r = await env.DB.prepare("SELECT * FROM notifications WHERE user_id=? ORDER BY created_at DESC LIMIT 50").bind(user.sub).all();
    return ok({ notifications: r.results || [] });
  }

  return error("Unknown customer action", 404);
}

export async function onRequestPost({ request, env }) {
  const user = await requireAuth(request, env);
  if (!user) return error("Unauthorized", 401);

  const action = new URL(request.url).searchParams.get("action") || "address";
  const body = await request.json().catch(() => ({}));

  if (action === "address") {
    const id = uid();
    await insertFlexible(env, "addresses", {
      id,
      user_id: user.sub,
      name: body.name || "Address",
      details: body.details || body.address || "",
      lat: body.lat || null,
      lng: body.lng || null,
      created_at: new Date().toISOString()
    });
    return ok({ addressId: id });
  }

  return error("Unknown customer action", 404);
}
