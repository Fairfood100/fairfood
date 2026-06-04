const API="https://fairfood.fairfood100.workers.dev";
function euro(c){return (Number(c||0)/100).toFixed(2).replace(".",",")+" €"}
async function api(path, options={}){
  const token = localStorage.ff_token || localStorage.ff_rest_token || localStorage.ff_driver_token || localStorage.ff_admin_token || "";
  const res = await fetch(API+path, {
    ...options,
    headers: {"content-type":"application/json", authorization: token ? "Bearer "+token : "", ...(options.headers||{})},
    body: options.body && typeof options.body !== "string" ? JSON.stringify(options.body) : options.body
  });
  const data = await res.json().catch(()=>({}));
  if(!res.ok || data.success===false) throw new Error(data.error?.message || "API error");
  return data;
}

let token=localStorage.ff_rest_token||"";
async function login(){if(token)return;const d=await api("/api/auth/login",{method:"POST",body:{email:"restaurant@fairfood.local",password:"Password123!"}});localStorage.ff_rest_token=d.token;token=d.token}
async function registerRestaurant(){const name=prompt("Owner name"); if(!name)return; const email=prompt("Email"); const password=prompt("Password","Password123!"); const restaurantName=prompt("Restaurant name"); const address=prompt("Address"); const d=await api("/api/auth/register",{method:"POST",body:{role:"restaurant",name,email,password,restaurantName,address,businessLicenseUrl:"REPLACE_WITH_R2_URL_LATER"}});localStorage.ff_rest_token=d.token;token=d.token;alert("Registered. Admin can approve documents later.")}
async function loadOrders(){await login();const d=await api("/api/restaurant/orders");document.getElementById("orders").innerHTML=d.orders.map(o=>`<div class="order"><h3>#${o.id.slice(0,8)} · ${o.customer_name}</h3><p>${o.delivery_address}</p><p class="status">${o.status}</p><b>${euro(o.total_cents)}</b><br>${o.status==="new"?`<input class="input" id="prep_${o.id}" value="25" type="number"><button class="btn ok" onclick="acceptOrder('${o.id}')">Accept</button><button class="btn danger" onclick="rejectOrder('${o.id}')">Reject</button>`:""}${["accepted_by_restaurant","preparing"].includes(o.status)?`<button class="btn" onclick="preparing('${o.id}')">Preparing</button><button class="btn ok" onclick="ready('${o.id}')">Ready / Dispatch</button>`:""}<button class="btn secondary" onclick="printOrder('${o.id}')">🖨️ Print</button></div>`).join("")||"<p>No orders</p>"}
async function acceptOrder(id){await api(`/api/orders/${id}/restaurant-accept`,{method:"POST",body:{prepTimeMin:Number(document.getElementById("prep_"+id).value||25)}});loadOrders()}
async function rejectOrder(id){await api(`/api/orders/${id}/restaurant-reject`,{method:"POST",body:{reason:"Not available"}});loadOrders()}
async function preparing(id){await api(`/api/orders/${id}/preparing`,{method:"POST"});loadOrders()}
async function ready(id){await api(`/api/orders/${id}/ready`,{method:"POST"});loadOrders()}
async function printOrder(id){const d=await api(`/api/orders/${id}`);const w=open("","print","width=380,height=650");w.document.write(`<h2>Fairfood Order</h2><b>${d.order.customer_name}</b><br>${d.order.delivery_address}<hr>${d.items.map(i=>`${i.quantity}x ${i.name} - ${euro(i.total_cents)}`).join("<br>")}<hr><h2>${euro(d.order.total_cents)}</h2>`);w.print()}
async function loadMenu(){await login();const d=await api("/api/restaurant/menu");document.getElementById("menu").innerHTML=d.items.map(i=>`<div class="order"><b>${i.name}</b><br>${i.category} · ${euro(i.price_cents)} · Stock: ${i.inventory_count??"∞"}<br><button class="btn secondary" onclick="toggleItem('${i.id}',${i.available?0:1})">${i.available?"Disable":"Enable"}</button></div>`).join("")}
async function toggleItem(id,av){await api(`/api/restaurant/menu/${id}`,{method:"PATCH",body:{available:!!av}});loadMenu()}
async function addItem(){const name=prompt("Name");if(!name)return;const price=Number(prompt("Price cents","999"));const stock=Number(prompt("Stock","50"));await api("/api/restaurant/menu",{method:"POST",body:{name,priceCents:price,inventoryCount:stock,category:"New",description:""}});loadMenu()}
async function loadWallet(){const d=await api("/api/wallet");document.getElementById("wallet").innerHTML=`<h2>${euro(d.wallet.balance_cents)}</h2>`}
function loadAll(){loadOrders();loadMenu();loadWallet()}
login().then(()=>{loadAll();setInterval(loadOrders,10000)});
