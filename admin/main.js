(function () {
  'use strict';

  /* ===========================================================
     1. INTERNATIONALIZATION (i18n) – AR / EN / DE
     =========================================================== */
  const I18n = {
    _lang: localStorage.getItem('admin_lang') || 'ar',
    _data: {
      ar: {
        app_title: 'Fairfood Price - الإدارة',
        loading: 'جاري التحميل…',
        dashboard: 'لوحة التحكم',
        active_orders: 'الطلبات النشطة',
        accounts_management: 'إدارة الحسابات',
        notifications: 'الإشعارات',
        settings: 'إعدادات المنصة',
        logout: 'تسجيل الخروج',
        revenue_today: 'أرباح اليوم',
        platform_commission: 'عمولة المنصة',
        total_customers: 'العملاء',
        total_restaurants: 'المطاعم',
        total_drivers: 'السائقين',
        no_active_orders: 'لا توجد طلبات نشطة حالياً',
        no_accounts: 'لا توجد حسابات',
        no_notifications: 'لا توجد إشعارات',
        customers: 'العملاء',
        restaurants: 'المطاعم',
        drivers: 'السائقين',
        platform_settings: 'إعدادات المنصة',
        chart_loading: 'يتم تحميل الرسم البياني…',
        revenue_overview: 'نظرة على الأرباح',
        toggle_sidebar: 'تبديل القائمة',
        admin_navigation: 'التنقل الرئيسي',
        offline_banner: 'أنت غير متصل بالإنترنت',
        reconnect_banner: 'تمت إعادة الاتصال',
        noscript_warning: 'يجب تفعيل JavaScript لاستخدام لوحة الإدارة.',
        lang_ar: 'العربية',
        lang_en: 'English',
        lang_de: 'Deutsch',
        admin_name: 'مدير النظام',
        error_network: 'خطأ في الاتصال بالخادم',
        error_general: 'حدث خطأ ما',
        retry: 'إعادة المحاولة',
        session_expired: 'انتهت الجلسة',
        confirm_logout: 'هل أنت متأكد من تسجيل الخروج؟'
      },
      en: {
        app_title: 'Fairfood Price - Admin',
        loading: 'Loading…',
        dashboard: 'Dashboard',
        active_orders: 'Active Orders',
        accounts_management: 'Accounts Management',
        notifications: 'Notifications',
        settings: 'Settings',
        logout: 'Log out',
        revenue_today: 'Today\'s Revenue',
        platform_commission: 'Platform Commission',
        total_customers: 'Customers',
        total_restaurants: 'Restaurants',
        total_drivers: 'Drivers',
        no_active_orders: 'No active orders',
        no_accounts: 'No accounts',
        no_notifications: 'No notifications',
        customers: 'Customers',
        restaurants: 'Restaurants',
        drivers: 'Drivers',
        platform_settings: 'Platform Settings',
        chart_loading: 'Loading chart…',
        revenue_overview: 'Revenue Overview',
        toggle_sidebar: 'Toggle sidebar',
        admin_navigation: 'Main navigation',
        offline_banner: 'You are offline',
        reconnect_banner: 'Reconnected',
        noscript_warning: 'JavaScript must be enabled to use the admin panel.',
        lang_ar: 'العربية',
        lang_en: 'English',
        lang_de: 'Deutsch',
        admin_name: 'Admin',
        error_network: 'Network error',
        error_general: 'Something went wrong',
        retry: 'Retry',
        session_expired: 'Session expired',
        confirm_logout: 'Are you sure you want to log out?'
      },
      de: {
        app_title: 'Fairfood Price - Verwaltung',
        loading: 'Lädt…',
        dashboard: 'Dashboard',
        active_orders: 'Aktive Bestellungen',
        accounts_management: 'Kontoverwaltung',
        notifications: 'Benachrichtigungen',
        settings: 'Einstellungen',
        logout: 'Abmelden',
        revenue_today: 'Heutige Einnahmen',
        platform_commission: 'Plattform-Provision',
        total_customers: 'Kunden',
        total_restaurants: 'Restaurants',
        total_drivers: 'Fahrer',
        no_active_orders: 'Keine aktiven Bestellungen',
        no_accounts: 'Keine Konten',
        no_notifications: 'Keine Benachrichtigungen',
        customers: 'Kunden',
        restaurants: 'Restaurants',
        drivers: 'Fahrer',
        platform_settings: 'Plattform-Einstellungen',
        chart_loading: 'Diagramm wird geladen…',
        revenue_overview: 'Umsatzübersicht',
        toggle_sidebar: 'Seitenleiste umschalten',
        admin_navigation: 'Hauptnavigation',
        offline_banner: 'Sie sind offline',
        reconnect_banner: 'Wieder verbunden',
        noscript_warning: 'JavaScript muss aktiviert sein, um die Verwaltung zu nutzen.',
        lang_ar: 'العربية',
        lang_en: 'English',
        lang_de: 'Deutsch',
        admin_name: 'Administrator',
        error_network: 'Netzwerkfehler',
        error_general: 'Ein Fehler ist aufgetreten',
        retry: 'Wiederholen',
        session_expired: 'Sitzung abgelaufen',
        confirm_logout: 'Möchten Sie sich wirklich abmelden?'
      }
    },
    t(key) { return this._data[this._lang]?.[key] || this._data.en[key] || key; },
    setLang(lang) {
      if (this._data[lang]) {
        this._lang = lang;
        localStorage.setItem('admin_lang', lang);
        document.documentElement.lang = lang;
        document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
        this._updateUIStrings();
        if (App.router) App.router.refresh();
      }
    },
    _updateUIStrings() {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        const translation = this.t(key);
        if (translation) el.textContent = translation;
      });
      document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        const translation = this.t(key);
        if (translation) el.placeholder = translation;
      });
      document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
        const key = el.dataset.i18nAriaLabel;
        const translation = this.t(key);
        if (translation) el.setAttribute('aria-label', translation);
      });
    }
  };

  /* ===========================================================
     2. SANITIZATION & UTILS
     =========================================================== */
  const SafeHTML = {
    escape(str) {
      const div = document.createElement('div');
      div.textContent = str || '';
      return div.innerHTML;
    }
  };

  /* ===========================================================
     3. API CLIENT (with timeout, retry & CSRF)
     =========================================================== */
  class ApiClient {
    constructor(baseURL = '/api/v1') {
      this.base = baseURL;
    }

    async request(method, path, body = null, retries = 1) {
      const url = `${this.base}${path}`;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);

      const headers = {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      };
      const token = localStorage.getItem('admin_token');
      if (token) headers['Authorization'] = `Bearer ${token}`;

      try {
        const res = await fetch(url, {
          method,
          headers,
          body: body ? JSON.stringify(body) : null,
          signal: controller.signal
        });
        clearTimeout(timeout);

        if (res.status === 401) {
          localStorage.removeItem('admin_token');
          Auth.silentLogout();
          throw new Error(I18n.t('session_expired'));
        }

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.message || `HTTP ${res.status}`);
        }

        return await res.json();
      } catch (err) {
        clearTimeout(timeout);
        if (err.name === 'AbortError') throw new Error('Request timeout');
        if (retries > 0 && method === 'GET') {
          return this.request(method, path, body, retries - 1);
        }
        throw err;
      }
    }

    get(path) { return this.request('GET', path); }
    post(path, data) { return this.request('POST', path, data); }
    put(path, data) { return this.request('PUT', path, data); }
    delete(path) { return this.request('DELETE', path); }
  }

  const api = new ApiClient(window.APP_CONFIG?.apiBaseUrl || '/api/v1');

  /* ===========================================================
     4. APPLICATION STATE (Store)
     =========================================================== */
  const Store = {
    admin: null,
    token: localStorage.getItem('admin_token') || null,
    dashboard: null,       // { customers, restaurants, drivers, activeOrders, revenueToday, platformCommission }
    activeOrders: [],
    accounts: { customers: [], restaurants: [], drivers: [] },
    currentAccountTab: 'customers',
    notifications: [],
    settings: {
      language: localStorage.getItem('admin_lang') || 'ar',
      theme: localStorage.getItem('admin_theme') || 'light'
    }
  };

  /* ===========================================================
     5. ROUTER
     =========================================================== */
  class Router {
    constructor() {
      this.current = 'dashboard';
      this.screenMap = {
        dashboard: 'dashboardScreen',
        orders: 'ordersScreen',
        accounts: 'accountsScreen',
        notifications: 'notificationsScreen',
        settings: 'settingsScreen'
      };
    }

    navigate(screen, params = null) {
      if (this.current === screen) return;
      this.current = screen;
      this._updateSidebar();
      this._updateTitle();
      this._renderScreen(screen, params);
    }

    refresh() {
      this._renderScreen(this.current, null);
    }

    _updateSidebar() {
      document.querySelectorAll('.sidebar-link').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.screen === this.current);
      });
    }

    _updateTitle() {
      const titleMap = {
        dashboard: 'dashboard',
        orders: 'active_orders',
        accounts: 'accounts_management',
        notifications: 'notifications',
        settings: 'settings'
      };
      document.getElementById('currentPageTitle').textContent = I18n.t(titleMap[this.current] || 'dashboard');
    }

    _renderScreen(screen, params) {
      document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
      const screenId = this.screenMap[screen];
      if (screenId) {
        document.getElementById(screenId)?.classList.add('active');
      }

      switch (screen) {
        case 'dashboard': App.screens.dashboard(); break;
        case 'orders': App.screens.orders(); break;
        case 'accounts': App.screens.accounts(); break;
        case 'notifications': App.screens.notifications(); break;
        case 'settings': App.screens.settings(); break;
      }
    }
  }

  /* ===========================================================
     6. UI HELPERS
     =========================================================== */
  const UI = {
    showToast(msg, type = 'success') {
      const container = document.getElementById('toastContainer');
      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      toast.textContent = msg;
      container.appendChild(toast);
      setTimeout(() => toast.remove(), 4000);
    },

    showLoader() { document.getElementById('app').classList.add('app-loading'); },
    hideLoader() { document.getElementById('app').classList.remove('app-loading'); },

    showOfflineBanner() {
      document.getElementById('offlineBanner')?.classList.remove('is-hidden');
      document.getElementById('reconnectBanner')?.classList.add('is-hidden');
    },
    showReconnectBanner() {
      document.getElementById('reconnectBanner')?.classList.remove('is-hidden');
      document.getElementById('offlineBanner')?.classList.add('is-hidden');
    },
    hideBanners() {
      document.getElementById('offlineBanner')?.classList.add('is-hidden');
      document.getElementById('reconnectBanner')?.classList.add('is-hidden');
    },

    announce(message) {
      const region = document.getElementById('ariaLiveRegion');
      if (region) region.textContent = message;
    }
  };

  /* ===========================================================
     7. AUTH SERVICE
     =========================================================== */
  const Auth = {
    async login(email, password) {
      const res = await api.post('/admin/auth/login', { email, password });
      Store.token = res.token;
      localStorage.setItem('admin_token', res.token);
      Store.admin = res.user;
      UI.showToast('Welcome!', 'success');
    },
    logout() {
      if (confirm(I18n.t('confirm_logout'))) {
        this.silentLogout();
        UI.showToast(I18n.t('logout'), 'success');
      }
    },
    silentLogout() {
      Store.token = null;
      localStorage.removeItem('admin_token');
      Store.admin = null;
      App.router.navigate('dashboard');
    },
    async fetchAdmin() {
      if (Store.token) {
        try {
          const res = await api.get('/admin/profile');
          Store.admin = res.data || res;
          document.getElementById('adminName').textContent = Store.admin?.name || I18n.t('admin_name');
        } catch (e) {
          this.silentLogout();
        }
      }
    }
  };

  /* ===========================================================
     8. SCREENS (Business Logic)
     =========================================================== */
  const Screens = {
    async dashboard() {
      try {
        const res = await api.get('/admin/dashboard');
        Store.dashboard = res.data || res;
        const d = Store.dashboard;
        document.getElementById('statCustomers').textContent = d.customers || 0;
        document.getElementById('statRestaurants').textContent = d.restaurants || 0;
        document.getElementById('statDrivers').textContent = d.drivers || 0;
        document.getElementById('statActiveOrders').textContent = d.activeOrders || 0;
        document.getElementById('statRevenueToday').textContent = (d.revenueToday || 0) + ' ' + (window.APP_CONFIG?.defaultCurrency || '');
        document.getElementById('statPlatformRevenue').textContent = (d.platformCommission || 0) + ' ' + (window.APP_CONFIG?.defaultCurrency || '');
        // Chart placeholder – could be replaced with real chart
        document.getElementById('revenueChart').innerHTML = '<span>' + I18n.t('chart_loading') + '</span>';
      } catch (e) {
        UI.showToast(I18n.t('error_network'), 'error');
      }
    },

    async orders() {
      const container = document.getElementById('activeOrdersList');
      const empty = document.getElementById('emptyActiveOrders');
      try {
        const res = await api.get('/admin/orders/active');
        Store.activeOrders = res.data || [];
        if (Store.activeOrders.length === 0) {
          empty.classList.remove('is-hidden');
          container.innerHTML = '';
        } else {
          empty.classList.add('is-hidden');
          container.innerHTML = Store.activeOrders.map(order => `
            <div class="order-card">
              <div>
                <strong>#${order.id} - ${SafeHTML.escape(order.restaurant_name)}</strong>
                <p>${SafeHTML.escape(order.customer_name)} | ${order.status}</p>
              </div>
              <div>
                <span>${order.total} ${window.APP_CONFIG?.defaultCurrency || ''}</span>
              </div>
            </div>
          `).join('');
        }
      } catch (e) {
        UI.showToast(e.message, 'error');
      }
    },

    async accounts() {
      const container = document.getElementById('accountsList');
      const empty = document.getElementById('emptyAccounts');
      const tab = Store.currentAccountTab || 'customers';
      try {
        const res = await api.get(`/admin/accounts?type=${tab}`);
        const list = res.data || [];
        Store.accounts[tab] = list;
        if (list.length === 0) {
          empty.classList.remove('is-hidden');
          container.innerHTML = '';
        } else {
          empty.classList.add('is-hidden');
          container.innerHTML = list.map(user => `
            <div class="account-card">
              <div>
                <strong>${SafeHTML.escape(user.name)}</strong>
                <p>${SafeHTML.escape(user.email || user.phone)}</p>
              </div>
              <div>
                <span>${user.status || ''}</span>
              </div>
            </div>
          `).join('');
        }
      } catch (e) {
        UI.showToast(e.message, 'error');
      }
    },

    async notifications() {
      const container = document.getElementById('notificationsList');
      const empty = document.getElementById('emptyNotifications');
      try {
        const res = await api.get('/admin/notifications');
        Store.notifications = res.data || [];
        if (Store.notifications.length === 0) {
          empty.classList.remove('is-hidden');
          container.innerHTML = '';
        } else {
          empty.classList.add('is-hidden');
          container.innerHTML = Store.notifications.map(n => `
            <div class="notification-card">
              <div>
                <strong>${SafeHTML.escape(n.title)}</strong>
                <p>${SafeHTML.escape(n.body)}</p>
                <small>${new Date(n.created_at).toLocaleString()}</small>
              </div>
            </div>
          `).join('');
        }
      } catch (e) {
        UI.showToast(e.message, 'error');
      }
    },

    settings() {
      const container = document.getElementById('settingsContent');
      container.innerHTML = `
        <div class="settings-item">
          <span>${I18n.t('language')}</span>
          <select id="langSelect">
            <option value="ar" ${I18n._lang === 'ar' ? 'selected' : ''}>العربية</option>
            <option value="en" ${I18n._lang === 'en' ? 'selected' : ''}>English</option>
            <option value="de" ${I18n._lang === 'de' ? 'selected' : ''}>Deutsch</option>
          </select>
        </div>
        <div class="settings-item">
          <span>${I18n.t('theme')}</span>
          <select id="themeSelect">
            <option value="light" ${Store.settings.theme === 'light' ? 'selected' : ''}>${I18n.t('light')}</option>
            <option value="dark" ${Store.settings.theme === 'dark' ? 'selected' : ''}>${I18n.t('dark')}</option>
          </select>
        </div>
        <div class="settings-item">
          <span>الحد الأدنى للطلب (تجريبي)</span>
          <input type="number" id="minOrderInput" placeholder="مثال: 20" />
        </div>
        <button class="btn btn-primary btn-block" id="saveSettingsBtn">حفظ الإعدادات</button>
      `;

      document.getElementById('langSelect').addEventListener('change', (e) => {
        I18n.setLang(e.target.value);
        Store.settings.language = e.target.value;
        localStorage.setItem('admin_lang', e.target.value);
      });
      document.getElementById('themeSelect').addEventListener('change', (e) => {
        document.body.setAttribute('data-theme', e.target.value);
        Store.settings.theme = e.target.value;
        localStorage.setItem('admin_theme', e.target.value);
      });
      document.getElementById('saveSettingsBtn').addEventListener('click', async () => {
        const minOrder = document.getElementById('minOrderInput').value;
        try {
          await api.put('/admin/settings', { min_order_amount: minOrder });
          UI.showToast('تم الحفظ', 'success');
        } catch (e) {
          UI.showToast(e.message, 'error');
        }
      });
    }
  };

  /* ===========================================================
     9. APPLICATION INITIALIZATION
     =========================================================== */
  const App = {
    router: null,
    screens: Screens,
    auth: Auth,

    async init() {
      this.router = new Router();
      I18n.setLang(Store.settings.language);
      document.body.setAttribute('data-theme', Store.settings.theme);

      await Auth.fetchAdmin();

      // Sidebar navigation
      document.querySelectorAll('.sidebar-link[data-screen]').forEach(btn => {
        btn.addEventListener('click', () => {
          this.router.navigate(btn.dataset.screen);
          // Close sidebar on mobile after click
          document.getElementById('sidebar')?.classList.remove('open');
        });
      });

      // Logout button in sidebar
      document.querySelector('.sidebar-link[data-action="logout"]')?.addEventListener('click', () => Auth.logout());

      // Sidebar toggle for mobile
      document.getElementById('sidebarToggleBtn')?.addEventListener('click', () => {
        document.getElementById('sidebar')?.classList.toggle('open');
      });

      // Language switchers
      document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          I18n.setLang(btn.dataset.lang);
        });
      });

      // Account tabs
      document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
          document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          Store.currentAccountTab = tab.dataset.tab;
          App.screens.accounts();
        });
      });

      window.addEventListener('online', () => {
        UI.showReconnectBanner();
        setTimeout(() => UI.hideBanners(), 3000);
      });
      window.addEventListener('offline', () => UI.showOfflineBanner());

      this.router.navigate('dashboard');
      UI.hideLoader();
    }
  };

  document.addEventListener('DOMContentLoaded', () => App.init());

})();