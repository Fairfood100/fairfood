// =============================================================
// Fairfood Price – Admin Functions (Standalone)
// =============================================================

function sg(k, d) { try { var v = localStorage.getItem(k); return v !== null ? v : d; } catch (e) { return d; } }
function ss(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
function sr(k) { try { localStorage.removeItem(k); } catch (e) {} }

var API_BASE = '/api/v1';

// ---- i18n ----
var LANG = sg('admin_lang') || 'ar';
var TRANS = {
  ar: {
    loading: 'جاري التحميل…', dashboard: 'لوحة التحكم', orders: 'الطلبات النشطة',
    accounts: 'إدارة الحسابات', settings: 'إعدادات المنصة', logout: 'تسجيل الخروج',
    revenue_today: 'أرباح اليوم', commission: 'عمولة المنصة', customers: 'العملاء',
    restaurants: 'المطاعم', drivers: 'السائقين', no_orders: 'لا توجد طلبات',
    no_accounts: 'لا توجد حسابات', no_notifications: 'لا توجد إشعارات',
    chart_loading: 'جار تحميل الرسم…', revenue_overview: 'نظرة على الأرباح',
    auth_title: 'تسجيل دخول المشرف', auth_email: 'البريد الإلكتروني', auth_password: 'كلمة المرور',
    auth_btn: 'دخول', auth_error: 'فشل تسجيل الدخول', auth_welcome: 'مرحباً',
    session_expired: 'انتهت الجلسة', error_network: 'خطأ في الاتصال',
    approved: 'تم القبول', rejected: 'تم الرفض', approve: 'قبول', reject: 'رفض',
    confirm_logout: 'تأكيد تسجيل الخروج؟', admin_name: 'مدير النظام',
    language: 'اللغة', theme: 'المظهر', light: 'فاتح', dark: 'داكن',
    save_settings: 'حفظ', saved: 'تم الحفظ', lang_ar: 'العربية', lang_en: 'English', lang_de: 'Deutsch',
    toggle_sidebar: 'تبديل القائمة', delete_confirm: 'حذف هذا المستخدم؟'
  },
  en: {
    loading: 'Loading…', dashboard: 'Dashboard', orders: 'Active Orders',
    accounts: 'Accounts', settings: 'Settings', logout: 'Log out',
    revenue_today: "Today's Revenue", commission: 'Commission', customers: 'Customers',
    restaurants: 'Restaurants', drivers: 'Drivers', no_orders: 'No active orders',
    no_accounts: 'No accounts', no_notifications: 'No notifications',
    chart_loading: 'Loading chart…', revenue_overview: 'Revenue Overview',
    auth_title: 'Admin Login', auth_email: 'Email', auth_password: 'Password',
    auth_btn: 'Login', auth_error: 'Login failed', auth_welcome: 'Welcome',
    session_expired: 'Session expired', error_network: 'Network error',
    approved: 'Approved', rejected: 'Rejected', approve: 'Approve', reject: 'Reject',
    confirm_logout: 'Confirm logout?', admin_name: 'Admin',
    language: 'Language', theme: 'Theme', light: 'Light', dark: 'Dark',
    save_settings: 'Save', saved: 'Saved', lang_ar: 'العربية', lang_en: 'English', lang_de: 'Deutsch',
    toggle_sidebar: 'Toggle sidebar', delete_confirm: 'Delete this user?'
  },
  de: {
    loading: 'Lädt…', dashboard: 'Dashboard', orders: 'Aktive Bestellungen',
    accounts: 'Konten', settings: 'Einstellungen', logout: 'Abmelden',
    revenue_today: 'Heutige Einnahmen', commission: 'Provision', customers: 'Kunden',
    restaurants: 'Restaurants', drivers: 'Fahrer', no_orders: 'Keine Bestellungen',
    no_accounts: 'Keine Konten', no_notifications: 'Keine Benachrichtigungen',
    chart_loading: 'Diagramm wird geladen…', revenue_overview: 'Umsatzübersicht',
    auth_title: 'Admin Login', auth_email: 'E-Mail', auth_password: 'Passwort',
    auth_btn: 'Anmelden', auth_error: 'Fehler', auth_welcome: 'Willkommen',
    session_expired: 'Sitzung abgelaufen', error_network: 'Netzwerkfehler',
    approved: 'Genehmigt', rejected: 'Abgelehnt', approve: 'Genehmigen', reject: 'Ablehnen',
    confirm_logout: 'Abmelden?', admin_name: 'Administrator',
    language: 'Sprache', theme: 'Erscheinungsbild', light: 'Hell', dark: 'Dunkel',
    save_settings: 'Speichern', saved: 'Gespeichert', lang_ar: 'العربية', lang_en: 'English', lang_de: 'Deutsch',
    toggle_sidebar: 'Seitenleiste umschalten', delete_confirm: 'Diesen Benutzer löschen?'
  }
};
function t(key) { return (TRANS[LANG] && TRANS[LANG][key]) || (TRANS.en && TRANS.en[key]) || key; }
function setLang(lang) {
  if (!TRANS[lang]) return;
  LANG = lang; ss('admin_lang', lang);
  document.documentElement.lang = lang;
  document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(function(el) { var k = el.dataset.i18n; if (k) el.textContent = t(k); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) { var k = el.dataset.i18nPlaceholder; if (k) el.placeholder = t(k); });
}

function getCurrency() { return { ar: 'SAR', en: 'USD', de: 'EUR' }[LANG] || 'SAR'; }
function formatPrice(cents) {
  try { return new Intl.NumberFormat('ar-SA', { style: 'currency', currency: getCurrency(), minimumFractionDigits: 0 }).format(cents / 100); }
  catch (e) { return (cents / 100).toFixed(2) + ' ' + getCurrency(); }
}
function esc(str) { var d = document.createElement('div'); d.textContent = str || ''; return d.innerHTML; }

// ---- XHR API ----
function xhr(method, url, body, token, cb) {
  var x = new XMLHttpRequest();
  x.open(method, url, true);
  x.setRequestHeader('Content-Type', 'application/json');
  if (token) x.setRequestHeader('Authorization', 'Bearer ' + token);
  x.onreadystatechange = function() {
    if (x.readyState !== 4) return;
    try { cb(null, JSON.parse(x.responseText)); }
    catch (e) { cb(e); }
  };
  x.onerror = function() { cb(new Error('Network error')); };
  x.send(body ? JSON.stringify(body) : '{}');
}

// ---- Toast ----
function toast(msg, type) {
  var c = document.getElementById('toastContainer'); if (!c) return;
  var el = document.createElement('div'); el.className = 'toast toast-' + (type || 'success');
  el.textContent = msg; c.appendChild(el);
  setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); }, 4000);
}

// ---- Overlay ----
function showLogin() {
  var o = document.getElementById('authOverlay');
  if (o) o.classList.remove('is-hidden');
  var e = document.getElementById('authError');
  if (e) e.classList.add('is-hidden');
}
function hideLogin() {
  var o = document.getElementById('authOverlay');
  if (o) o.classList.add('is-hidden');
}

// ---- Login ----
window.adminLogin = function() {
  var btn = document.getElementById('authLoginBtn');
  if (!btn || btn.disabled) return false;
  btn.disabled = true; btn.textContent = '...';
  var email = (document.getElementById('authEmail') && document.getElementById('authEmail').value || '').trim();
  var pass = document.getElementById('authPassword') && document.getElementById('authPassword').value || '';
  var err = document.getElementById('authError');
  if (err) err.classList.add('is-hidden');
  if (!email || !pass) {
    if (err) { err.textContent = 'املأ الحقول'; err.classList.remove('is-hidden'); }
    btn.disabled = false; btn.textContent = t('auth_btn'); return false;
  }
  xhr('POST', API_BASE + '/admin/auth/login', { email: email, password: pass }, null, function(er, d) {
    if (er) { if (err) { err.textContent = t('error_network'); err.classList.remove('is-hidden'); } }
    else if (d.success && (d.data && d.data.token || d.token)) {
      ss('admin_token', d.data && d.data.token || d.token);
      hideLogin();
      init();
    } else {
      if (err) { err.textContent = d.message || t('auth_error'); err.classList.remove('is-hidden'); }
    }
    btn.disabled = false; btn.textContent = t('auth_btn');
  });
  return false;
};

// ---- Logout ----
window.logOut = function() {
  if (!confirm(t('confirm_logout'))) return;
  sr('admin_token'); showLogin();
  document.getElementById('adminName') && (document.getElementById('adminName').textContent = t('admin_name'));
};

// ---- State ----
var STATE = { tab: 'customers' };

// ---- Init: check token and load dashboard ----
function init() {
  var tok = sg('admin_token');
  if (!tok) { showLogin(); return; }
  xhr('GET', API_BASE + '/auth/me', null, tok, function(er, d) {
    if (er || !d.success) { sr('admin_token'); showLogin(); return; }
    var user = d.user || d.data || d;
    document.getElementById('adminName') && (document.getElementById('adminName').textContent = user.name || t('admin_name'));
    hideLogin();
    nav('dashboard');
  });
}

// ---- Navigation ----
function nav(screen) {
  document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); });
  var map = { dashboard: 'dashboardScreen', orders: 'ordersScreen', accounts: 'accountsScreen', notifications: 'notificationsScreen', settings: 'settingsScreen' };
  var el = document.getElementById(map[screen]);
  if (el) el.classList.add('active');
  document.querySelectorAll('.sidebar-link[data-screen]').forEach(function(b) { b.classList.toggle('active', b.dataset.screen === screen); });
  var titles = { dashboard: 'dashboard', orders: 'orders', accounts: 'accounts', notifications: 'no_notifications', settings: 'settings' };
  var titleEl = document.getElementById('currentPageTitle');
  if (titleEl) titleEl.textContent = t(titles[screen] || 'dashboard');
  document.getElementById('sidebar') && document.getElementById('sidebar').classList.remove('open');
  if (screen === 'dashboard') loadDashboard();
  else if (screen === 'orders') loadOrders();
  else if (screen === 'accounts' || screen === 'accountsTab') loadAccounts(STATE.tab);
  else if (screen === 'notifications') loadNotifications();
  else if (screen === 'settings') loadSettings();
}

// ---- Dashboard ----
function loadDashboard() {
  var tok = sg('admin_token'); if (!tok) return;
  xhr('GET', API_BASE + '/admin/dashboard', null, tok, function(er, d) {
    if (er || !d.success) { toast(t('error_network'), 'error'); return; }
    var ids = ['statCustomers', 'statRestaurants', 'statDrivers', 'statActiveOrders'];
    var keys = ['customers', 'restaurants', 'drivers', 'activeOrders'];
    for (var i = 0; i < ids.length; i++) {
      var el = document.getElementById(ids[i]);
      if (el) el.textContent = (d[keys[i]] || 0).toString();
    }
    var revEl = document.getElementById('statRevenueToday');
    if (revEl) revEl.textContent = formatPrice(d.revenueToday || 0);
    var comEl = document.getElementById('statPlatformRevenue');
    if (comEl) comEl.textContent = formatPrice(d.platformCommission || 0);
    var chart = document.getElementById('revenueChart');
    if (chart) {
      if (d.revenueData && d.revenueData.length) {
        var max = 1;
        for (var j = 0; j < d.revenueData.length; j++) { if (d.revenueData[j].value > max) max = d.revenueData[j].value; }
        var bars = '';
        for (var k = 0; k < d.revenueData.length; k++) {
          var pct = ((d.revenueData[k].value || 0) / max * 100).toFixed(1);
          bars += '<div style="display:flex;flex-direction:column;align-items:center;flex:1"><div style="width:100%;max-width:40px;height:120px;background:var(--border);border-radius:8px;position:relative;overflow:hidden"><div style="position:absolute;bottom:0;width:100%;height:' + pct + '%;background:var(--primary);border-radius:8px;transition:height 0.5s"></div></div><small style="margin-top:6px;color:var(--text-secondary);font-size:0.7rem">' + esc(d.revenueData[k].label || '') + '</small></div>';
        }
        chart.innerHTML = '<div style="display:flex;gap:8px;padding:16px 0">' + bars + '</div>';
      } else {
        chart.innerHTML = '<span style="color:var(--text-secondary)">' + t('chart_loading') + '</span>';
      }
    }
  });
}

// ---- Orders ----
function loadOrders() {
  var tok = sg('admin_token'); if (!tok) return;
  xhr('GET', API_BASE + '/admin/orders', null, tok, function(er, d) {
    if (er || !d.success) { toast(t('error_network'), 'error'); return; }
    var list = d.data || d.orders || [];
    var container = document.getElementById('activeOrdersList');
    var empty = document.getElementById('emptyActiveOrders');
    if (!container) return;
    if (!list.length) {
      if (empty) empty.classList.remove('is-hidden');
      container.innerHTML = '';
    } else {
      if (empty) empty.classList.add('is-hidden');
      var html = '';
      for (var i = 0; i < list.length; i++) {
        var o = list[i];
        html += '<div class="order-card"><div><strong>#' + o.id + ' - ' + esc(o.restaurant_name) + '</strong><p>' + esc(o.customer_name) + ' | ' + o.status + '</p></div><div><span>' + formatPrice(o.total_cents || 0) + '</span></div></div>';
      }
      container.innerHTML = html;
    }
  });
}

// ---- Accounts ----
function loadAccounts(tab) {
  STATE.tab = tab || 'customers';
  var tok = sg('admin_token'); if (!tok) return;
  document.querySelectorAll('.tab').forEach(function(t) { t.classList.toggle('active', t.dataset.tab === STATE.tab); });
  xhr('GET', API_BASE + '/admin/accounts?type=' + STATE.tab + '&_=' + Date.now(), null, tok, function(er, d) {
    if (er || !d.success) { toast(t('error_network'), 'error'); return; }
    var list = d.data || [];
    var container = document.getElementById('accountsList');
    var empty = document.getElementById('emptyAccounts');
    if (!container) return;
    if (!list.length) {
      if (empty) empty.classList.remove('is-hidden');
      container.innerHTML = '';
    } else {
      if (empty) empty.classList.add('is-hidden');
      var html = '';
      for (var i = 0; i < list.length; i++) {
        var u = list[i];
        var v = (u.verification_status || '').trim();
        var showVerify = (STATE.tab === 'drivers' || STATE.tab === 'restaurants') && v && v !== 'approved';
        html += '<div class="account-card" data-uid="' + u.id + '">' +
          '<div><strong>' + esc(u.name) + '</strong><p>' + esc(u.email || u.phone || '') + (v ? ' | <small>' + v + '</small>' : '') + '</p></div>' +
          '<div class="account-actions">';
        if (showVerify) {
          html += '<button class="btn-approve" data-action="approve" data-uid="' + u.id + '">' + t('approve') + '</button>' +
            '<button class="btn-reject" data-action="reject" data-uid="' + u.id + '">' + t('reject') + '</button>';
        }
        html += '<button class="btn-delete" data-action="delete" data-uid="' + u.id + '">✖</button></div></div>';
      }
      container.innerHTML = html;
    }
  });
}

// ---- Event Delegation for dynamic buttons ----
document.addEventListener('click', function(e) {
  var btn = e.target;
  var action = btn && btn.getAttribute && btn.getAttribute('data-action');
  var uid = btn && btn.getAttribute && btn.getAttribute('data-uid');
  if (!action || !uid) return;
  e.preventDefault();
  if (action === 'approve') handleAction('approve', uid, btn);
  else if (action === 'reject') handleAction('reject', uid, btn);
  else if (action === 'delete') handleAction('delete', uid, btn);
});

function handleAction(action, uid, btn) {
  if (action === 'delete' && !confirm(t('delete_confirm'))) return;
  var tok = sg('admin_token');
  if (!tok) { showLogin(); return; }
  btn.disabled = true; btn.textContent = '...';
  xhr('POST', API_BASE + '/admin/users/' + uid + '/' + action, {}, tok, function(er, d) {
    if (er || !d.success) {
      toast(er ? t('error_network') : (d.message || t('error_network')), 'error');
      btn.disabled = false;
      btn.textContent = action === 'delete' ? '✖' : (action === 'approve' ? t('approve') : t('reject'));
      return;
    }
    toast(action === 'delete' ? 'تم الحذف' : (action === 'approve' ? t('approved') : t('rejected')), 'success');
    loadAccounts(STATE.tab);
  });
}

// ---- Notifications ----
function loadNotifications() {
  var empty = document.getElementById('emptyNotifications');
  if (empty) empty.classList.remove('is-hidden');
  var list = document.getElementById('notificationsList');
  if (list) list.innerHTML = '';
}

// ---- Settings ----
function loadSettings() {
  var c = document.getElementById('settingsContent'); if (!c) return;
  c.innerHTML =
    '<div class="settings-item"><span>' + t('language') + '</span><select id="langSelect">' +
    '<option value="ar"' + (LANG === 'ar' ? ' selected' : '') + '>' + t('lang_ar') + '</option>' +
    '<option value="en"' + (LANG === 'en' ? ' selected' : '') + '>' + t('lang_en') + '</option>' +
    '<option value="de"' + (LANG === 'de' ? ' selected' : '') + '>' + t('lang_de') + '</option></select></div>' +
    '<div class="settings-item"><span>' + t('theme') + '</span><select id="themeSelect">' +
    '<option value="light"' + (sg('admin_theme') !== 'dark' ? ' selected' : '') + '>' + t('light') + '</option>' +
    '<option value="dark"' + (sg('admin_theme') === 'dark' ? ' selected' : '') + '>' + t('dark') + '</option></select></div>' +
    '<button class="btn btn-primary btn-block" onclick="toast(\'' + t('saved') + '\',\'success\')">' + t('save_settings') + '</button>';
  var ls = document.getElementById('langSelect');
  if (ls) ls.addEventListener('change', function(e) { setLang(e.target.value); });
  var ts = document.getElementById('themeSelect');
  if (ts) ts.addEventListener('change', function(e) {
    document.body.setAttribute('data-theme', e.target.value);
    ss('admin_theme', e.target.value);
  });
}

// ---- Sidebar Toggle ----
function toggleSidebar() {
  var s = document.getElementById('sidebar');
  if (s) s.classList.toggle('open');
}

// ---- Boot ----
function boot() {
  var l = sg('admin_lang') || 'ar';
  setLang(l);
  document.body.setAttribute('data-theme', sg('admin_theme') || 'light');
  var toggleBtn = document.getElementById('sidebarToggleBtn');
  if (toggleBtn) toggleBtn.onclick = toggleSidebar;
  var logoutBtn = document.querySelector('[data-action="logout"]');
  if (logoutBtn) logoutBtn.onclick = logOut;
  document.querySelectorAll('.sidebar-link[data-screen]').forEach(function(b) {
    b.onclick = function() { nav(b.dataset.screen); };
  });
  document.querySelectorAll('.tab').forEach(function(t) {
    t.onclick = function() { loadAccounts(t.dataset.tab); };
  });
  document.querySelectorAll('.lang-btn').forEach(function(b) {
    b.onclick = function() { setLang(b.dataset.lang); };
  });
  var pw = document.getElementById('authPassword');
  if (pw) pw.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') { var btn = document.getElementById('authLoginBtn'); if (btn) btn.click(); }
  });
  init();
}

boot();
