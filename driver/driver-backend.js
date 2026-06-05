const API = window.location.origin;
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

let token=localStorage.ff_driver_token||"", online=false;
async function login(){if(token)return;const d=await api("/api/auth/login",{method:"POST",body:{email:"driver@fairfood.local",password:"Password123!"}});localStorage.ff_driver_token=d.token;token=d.token}
async function registerDriver(){const name=prompt("Name"); if(!name)return; const email=prompt("Email"); const password=prompt("Password","Password123!"); const plateNumber=prompt("Plate"); const d=await api("/api/auth/register",{method:"POST",body:{role:"driver",name,email,password,vehicle:"car",plateNumber,driverLicenseUrl:"REPLACE_WITH_R2_URL_LATER"}});localStorage.ff_driver_token=d.token;token=d.token;alert("Registered. Admin can approve documents later.")}
async function toggleOnline(){online=!online;await api("/api/driver/status",{method:"POST",body:{online}});document.getElementById("onlineBtn").textContent=online?"Offline":"Online";loadAll()}
function navUrl(o,mode="restaurant"){const dest=mode==="restaurant"?(o.restaurant_address||""):(o.delivery_address||"");return "https://www.google.com/maps/dir/?api=1&travelmode=driving&destination="+encodeURIComponent(dest)}
async function loadAvailable(){const d=await api("/api/driver/orders/available");document.getElementById("available").innerHTML=d.orders.map(o=>`<div class="order"><h3>${o.restaurant_name}</h3><p>${o.delivery_address}</p><b>${euro(o.total_cents)}</b><br><button class="btn ok" onclick="accept('${o.id}')">Accept</button></div>`).join("")||"<p>No available orders</p>"}
async function loadCurrent(){const d=await api("/api/driver/orders/current");document.getElementById("current").innerHTML=d.orders.map(o=>`<div class="order"><h3>${o.restaurant_name}</h3><p class="status">${o.status}</p><a class="btn" href="${navUrl(o,'restaurant')}" target="_blank">🧭 To restaurant</a><a class="btn secondary" href="${navUrl(o,'customer')}" target="_blank">🧭 To customer</a><br>${o.status==="accepted_by_driver"?`<button class="btn" onclick="pickup('${o.id}')">Picked up</button>`:""}${o.status==="picked_up"?`<input class="input" id="eta_${o.id}" value="10" type="number"><button class="btn" onclick="onWay('${o.id}')">On the way</button>`:""}${o.status==="on_the_way"?`<button class="btn ok" onclick="delivered('${o.id}')">Delivered</button>`:""}</div>`).join("")||"<p>No active delivery</p>"}
async function accept(id){await api(`/api/orders/${id}/driver-accept`,{method:"POST"});loadAll()}
async function pickup(id){await api(`/api/orders/${id}/picked-up`,{method:"POST"});loadAll()}
async function onWay(id){await api(`/api/orders/${id}/on-the-way`,{method:"POST",body:{etaMin:Number(document.getElementById("eta_"+id).value||10)}});loadAll()}
async function delivered(id){await api(`/api/orders/${id}/delivered`,{method:"POST"});loadAll()}
async function loadWallet(){const d=await api("/api/wallet");document.getElementById("wallet").innerHTML=`<h2>${euro(d.wallet.balance_cents)}</h2>`}
function loadAll(){loadAvailable();loadCurrent();loadWallet()}
login().then(async()=>{online=true;await api("/api/driver/status",{method:"POST",body:{online:true}});document.getElementById("onlineBtn").textContent="Offline";loadAll();setInterval(loadAll,10000)});
