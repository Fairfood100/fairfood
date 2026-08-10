// =============================================================
// Fairfood Price – Driver Delivery Functions (Standalone)
// يعتمد على: functions.js (xhr, t, esc, toast, STATE, API_BASE ...)
// يجب تحميله بعد functions.js
// =============================================================

// ---- Screen: Orders (الطلبات المتاحة) ----
function showOrders() {
  var container = document.getElementById('incomingOrdersList');
  var empty = document.getElementById('emptyOrders');
  xhr('GET', API_BASE + '/driver/orders/available?_=' + Date.now(), null, STATE.token, function(er, d) {
    if (er) { toast(er.message || t('error_network'), 'error'); return; }
    var list = d.orders || d.data || (Array.isArray(d) ? d : []);
    if (!Array.isArray(list)) list = [];
    STATE.orders = list;
    updateBadge('ordersBadge', list.length);
    if (!list.length) {
      if (empty) empty.classList.remove('is-hidden');
      container.innerHTML = '';
    } else {
      if (empty) empty.classList.add('is-hidden');
      var currency = getCurrency();
      container.innerHTML = list.map(function(o) {
        return '<div class="order-card"><div class="order-detail"><h4>' + esc(o.restaurant_name) + '</h4><p>' + esc(o.delivery_address) + '</p><p>' + t('delivery_fee') + ': ' + formatPrice(o.estimated_earning || 0, currency) + '</p></div><div class="order-actions"><button class="btn btn-success btn-sm" data-action="accept" data-id="' + o.id + '">' + t('accept') + '</button><button class="btn btn-danger btn-sm" data-action="reject" data-id="' + o.id + '">' + t('reject') + '</button></div></div>';
      }).join('');
    }
  });
}

// ---- Screen: Delivery (التوصيل النشط) ----
function showDelivery() {
  if (STATE.activeDelivery) {
    openSheet('activeDeliverySheet');
    renderActiveDeliverySheet(STATE.activeDelivery);
  } else {
    closeSheet('activeDeliverySheet');
    var el = document.getElementById('activeDeliveryContent');
    if (el) el.innerHTML = '<div class="empty-state">' + t('no_active_order') + '</div>';
  }
}

// ---- شيت التوصيل النشط (أزرار: استلمت الطلب / في الطريق / تم التوصيل) ----
function renderActiveDeliverySheet(delivery) {
  var stepContent = document.getElementById('deliveryStepContent');
  if (!stepContent) return;
  var rName = esc(delivery.restaurant_name || delivery.restaurantName || '');
  var cName = esc(delivery.customer_name || delivery.customerName || '');
  var destLat = delivery.destination_lat || delivery.destLat;
  var destLng = delivery.destination_lng || delivery.destLng;
  var orderId = delivery.orderId || delivery.id;
  var status = delivery.status || '';

  stepContent.innerHTML = '<div class="step-card"><h3>🏪 ' + (rName || t('restaurant')) + '</h3></div><div class="step-card"><h3>📦 ' + t('pickup') + '</h3></div><div class="step-card"><h3>🏁 ' + (cName || t('customer')) + '</h3></div><div class="delivery-actions" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:16px">';

  if (status === 'accepted_by_driver' || !status) {
    stepContent.innerHTML += '<button class="btn btn-primary btn-sm" data-action="picked-up" data-id="' + orderId + '" style="flex:1">' + t('picked_up') + '</button>';
  }
  if (status === 'picked_up' || !status) {
    stepContent.innerHTML += '<button class="btn btn-primary btn-sm" data-action="on-the-way" data-id="' + orderId + '" style="flex:1">' + t('on_the_way') + '</button>';
  }
  if (status === 'on_the_way' || !status) {
    stepContent.innerHTML += '<button class="btn btn-success btn-sm" data-action="delivered" data-id="' + orderId + '" style="flex:1">' + t('delivered') + '</button>';
  }
  stepContent.innerHTML += '</div>';

  if (destLat && destLng) {
    var g = document.getElementById('googleMapsBtn');
    if (g) g.href = 'https://maps.google.com/maps?daddr=' + destLat + ',' + destLng;
    var w = document.getElementById('wazeBtn');
    if (w) w.href = 'https://waze.com/ul?ll=' + destLat + ',' + destLng + '&navigate=yes';
  }
  document.getElementById('callCustomerBtn') && (document.getElementById('callCustomerBtn').disabled = true);
}

// ---- قبول الطلب ----
function acceptOrder(id) {
  if (!id) return;
  xhr('POST', API_BASE + '/orders/' + encodeURIComponent(id) + '/driver-accept', {}, STATE.token, function(er, d) {
    if (er) { toast(er.message || t('error_network'), 'error'); return; }
    toast(t('order_accepted_message'), 'success');
    var delivery = { orderId: id };
    xhr('GET', API_BASE + '/orders/' + encodeURIComponent(id), null, STATE.token, function(er2, d2) {
      if (!er2) delivery = d2.data || d2 || delivery;
      STATE.activeDelivery = delivery;
      STATE.orders = STATE.orders.filter(function(o) { return o.id !== id; });
      updateBadge('ordersBadge', STATE.orders.length);
      openSheet('activeDeliverySheet');
      renderActiveDeliverySheet(STATE.activeDelivery);
      showOrders();
    });
  });
}

// ---- رفض الطلب ----
function rejectOrder(id) {
  if (!id) return;
  xhr('POST', API_BASE + '/orders/' + encodeURIComponent(id) + '/cancel', { reason: '' }, STATE.token, function(er, d) {
    if (er) { toast(er.message || t('error_network'), 'error'); return; }
    toast(t('order_rejected_message'), 'info');
    STATE.orders = STATE.orders.filter(function(o) { return o.id !== id; });
    updateBadge('ordersBadge', STATE.orders.length);
    showOrders();
  });
}

// ---- السائق استلم الطلب من المطعم ----
function pickedUp(id) {
  if (!id) return;
  xhr('POST', API_BASE + '/orders/' + encodeURIComponent(id) + '/picked-up', {}, STATE.token, function(er, d) {
    if (er) { toast(er.message || t('error_network'), 'error'); return; }
    toast('✅ ' + t('picked_up'), 'success');
    STATE.activeDelivery = d.data || STATE.activeDelivery || { orderId: id, status: 'picked_up' };
    if (STATE.activeDelivery) STATE.activeDelivery.status = 'picked_up';
    renderActiveDeliverySheet(STATE.activeDelivery);
  });
}

// ---- السائق في الطريق للعميل ----
function onTheWay(id) {
  if (!id) return;
  xhr('POST', API_BASE + '/orders/' + encodeURIComponent(id) + '/on-the-way', { etaMin: 10 }, STATE.token, function(er, d) {
    if (er) { toast(er.message || t('error_network'), 'error'); return; }
    toast('🚀 ' + t('on_the_way'), 'success');
    STATE.activeDelivery = d.data || STATE.activeDelivery || { orderId: id, status: 'on_the_way' };
    if (STATE.activeDelivery) STATE.activeDelivery.status = 'on_the_way';
    renderActiveDeliverySheet(STATE.activeDelivery);
  });
}

// ---- تم التوصيل ----
function delivered(id) {
  if (!id) return;
  xhr('POST', API_BASE + '/orders/' + encodeURIComponent(id) + '/delivered', {}, STATE.token, function(er, d) {
    if (er) { toast(er.message || t('error_network'), 'error'); return; }
    toast('🎉 ' + t('delivered'), 'success');
    STATE.activeDelivery = null;
    closeSheet('activeDeliverySheet');
    if (STATE.currentScreen === 'delivery') showDelivery();
  });
}

// ---- مودال الطلب الوارد ----
function showIncomingModal(order) {
  var details = document.getElementById('incomingOrderDetails');
  if (!details) return;
  var currency = getCurrency();
  details.innerHTML = '<p><strong>' + esc(order.restaurant_name) + '</strong></p><p>' + esc(order.delivery_address) + '</p><p>' + t('delivery_fee') + ': ' + formatPrice(order.estimated_earning || 0, currency) + '</p>';
  document.getElementById('acceptOrderBtn') && (document.getElementById('acceptOrderBtn').dataset.id = order.id);
  document.getElementById('rejectOrderBtn') && (document.getElementById('rejectOrderBtn').dataset.id = order.id);
  openModal('incomingOrderModal');
}
