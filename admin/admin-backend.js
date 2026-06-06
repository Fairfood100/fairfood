const API = "https://fairfood.pages.dev";
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

let token=localStorage.ff_admin_token||"";
async function login(){if(token)return;const d=await api("/api/auth/login",{method:"POST",body:{email:"admin@fairfood.local",password:"Password123!"}});localStorage.ff_admin_token=d.token;token=d.token}
async function loadAdmin(){await login();const d=await api("/api/admin/dashboard");document.getElementById("dash").innerHTML=`<div class="panel"><h2>Revenue</h2><h1>${euro(d.revenue.total_cents)}</h1></div>`+d.users.map(u=>`<div class="panel"><h2>${u.role}</h2><h1>${u.count}</h1></div>`).join("")+d.orders.map(o=>`<div class="panel"><h2>${o.status}</h2><h1>${o.count}</h1></div>`).join("")+d.wallets.map(w=>`<div class="panel"><h2>${w.owner_type} wallet</h2><h1>${euro(w.balance_cents)}</h1></div>`).join("");
const orders=await api("/api/admin/orders");document.getElementById("orders").innerHTML=orders.orders.map(o=>`<div class="order"><b>${o.restaurant_name}</b> · ${o.customer_name}<br><span class="status">${o.status}</span> · ${euro(o.total_cents)}</div>`).join("");
const users=await api("/api/admin/users");document.getElementById("users").innerHTML=users.users.map(u=>`<div class="order">${u.role} · ${u.name} · ${u.email} · ${u.status}</div>`).join("");
const docs=await api("/api/admin/documents");document.getElementById("docs").innerHTML=docs.documents.map(x=>`<div class="order">${x.owner_type} · ${x.document_type} · ${x.status}<br>${x.file_url||"No file yet"}<br><button class="btn ok" onclick="docAction('${x.id}','approve')">Approve</button><button class="btn danger" onclick="docAction('${x.id}','reject')">Reject</button></div>`).join("")}
async function docAction(id,action){await api(`/api/admin/documents/${id}/${action}`,{method:"POST"});loadAdmin()}
loadAdmin();setInterval(loadAdmin,15000);
