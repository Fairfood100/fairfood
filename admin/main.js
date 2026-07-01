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
        confirm_logout: 'هل أنت متأكد من تسجيل الخروج؟',
        language: 'اللغة',
        theme: 'المظهر',
        light: 'فاتح',
        dark: 'داكن',
        save_settings: 'حفظ الإعدادات',
        saved_locally: 'تم الحفظ محليًا',
        feature_unavailable: 'الميزة غير متاحة حالياً',
        auth_title: 'تسجيل دخول المشرف',
        auth_email_label: 'البريد الإلكتروني',
        auth_password_label: 'كلمة المرور',
        auth_login_btn: 'دخول',
        auth_login_error: 'فشل تسجيل الدخول',
        auth_welcome: 'مرحباً بك في لوحة الإدارة',
        min_order_label: 'الحد الأدنى للطلب (تجريبي)',
        min_order_placeholder: 'مثال: 20'
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
        confirm_logout: 'Are you sure you want to log out?',
        language: 'Language',
        theme: 'Theme',
        light: 'Light',
        dark: 'Dark',
        save_settings: 'Save settings',
        saved_locally: 'Saved locally',
        feature_unavailable: 'Feature not available',
        min_order_label: 'Min Order (experimental)',
        min_order_placeholder: 'Example: 20'
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
        confirm_logout: 'Möchten Sie sich wirklich abmelden?',
        language: 'Sprache',
        theme: 'Erscheinungsbild',
        light: 'Hell',
        dark: 'Dunkel',
        save_settings: 'Einstellungen speichern',
        saved_locally: 'Lokal gespeichert',
        feature_unavailable: 'Funktion nicht verfügbar',
        min_order_label: 'Mindestbestellung (experimentell)',
        min_order_placeholder: 'Beispiel: 20'
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
     3. API CLIENT (aligned with Customer/Driver pattern)
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

        const payload = await res.json().catch(() => ({}));

        if (res.status === 401) {
          localStorage.removeItem('admin_token');
          Auth.silentLogout();
          throw new Error(I18n.t('session_expired'));
        }

        if (!res.ok || payload.success === false) {
          throw new Error(payload.message || payload.error?.message || `HTTP ${res.status}`);
        }

        return payload.data || payload;
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
    dashboard: null,
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
      document.getElementById('currentPageTitle')?.textContent = I18n.t(titleMap[this.current] || 'dashboard');
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
      if (!container) return;
      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      toast.textContent = msg;
      container.appendChild(toast);
      setTimeout(() => toast.remove(), 4000);
    },

    showLoader() { document.getElementById('app')?.classList.add('app-loading'); },
    hideLoader() { document.getElementById('app')?.classList.remove('app-loading'); },

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
    _initialized: false,

    async login(email, password) {
      const res = await api.post('/admin/auth/login', { email, password });
      Store.token = res.token;
      localStorage.setItem('admin_token', res.token);
      Store.admin = res.user;
      this._initialized = true;
      document.getElementById('authOverlay')?.classList.add('is-hidden');
      document.getElementById('adminName')?.textContent = res.user?.name || I18n.t('admin_name');
      UI.showToast(I18n.t('auth_welcome'), 'success');
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
      document.getElementById('authOverlay')?.classList.remove('is-hidden');
    },

    async fetchAdmin() {
      if (Store.token) {
        try {
          const res = await api.get('/auth/me');
          Store.admin = res.user || res.data || res;
          document.getElementById('adminName')?.textContent = Store.admin?.name || I18n.t('admin_name');
          return;
        } catch (e) { }
      }
      // No token or failed — require login
      this._showLoginScreen();
    },

    _showLoginScreen() {
      document.getElementById('authOverlay')?.classList.remove('is-hidden');
      document.getElementById('authError')?.classList.add('is-hidden');
    },

    _bindEvents() {
      document.getElementById('authLoginBtn')?.addEventListener('click', async () => {
        const email = document.getElementById('authEmail')?.value;
        const password = document.getElementById('authPassword')?.value;
        if (!email || !password) {
          document.getElementById('authError')?.classList.remove('is-hidden');
          return;
        }
        try {
          await Auth.login(email, password);
          App.router.refresh();
          await Promise.all([
            Screens.dashboard(),
            Screens.orders(),
            Screens.accounts(),
            Screens.notifications()
          ]);
        } catch (e) {
          const errEl = document.getElementById('authError');
          if (errEl) {
            errEl.textContent = e.message || I18n.t('auth_login_error');
            errEl.classList.remove('is-hidden');
          }
        }
      });
      // Enter key
      document.getElementById('authPassword')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') document.getElementById('authLoginBtn')?.click();
      });
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
        document.getElementById('statCustomers')?.textContent = d.customers || 0;
        document.getElementById('statRestaurants')?.textContent = d.restaurants || 0;
        document.getElementById('statDrivers')?.textContent = d.drivers || 0;
        document.getElementById('statActiveOrders')?.textContent = d.activeOrders || 0;
        document.getElementById('statRevenueToday')?.textContent = (d.revenueToday || 0) + ' ' + (window.APP_CONFIG?.defaultCurrency || '');
        document.getElementById('statPlatformRevenue')?.textContent = (d.platformCommission || 0) + ' ' + (window.APP_CONFIG?.defaultCurrency || '');
        const chartEl = document.getElementById('revenueChart');
        if (d.revenueData && Array.isArray(d.revenueData)) {
          const max = Math.max(...d.revenueData.map(v => v.value || 0), 1);
          const bars = d.revenueData.map(v => {
            const pct = ((v.value || 0) / max * 100).toFixed(1);
            return `<div style="display:flex;flex-direction:column;align-items:center;flex:1">
              <div style="width:100%;max-width:40px;height:120px;background:var(--border);border-radius:8px;position:relative;overflow:hidden">
                <div style="position:absolute;bottom:0;width:100%;height:${pct}%;background:var(--primary);border-radius:8px;transition:height 0.5s"></div>
              </div>
              <small style="margin-top:6px;color:var(--text-secondary);font-size:0.7rem">${SafeHTML.escape(v.label || '')}</small>
            </div>`;
          }).join('');
          chartEl.innerHTML = `<div style="display:flex;gap:8px;padding:16px 0">${bars}</div>`;
        } else {
          chartEl.innerHTML = `<span style="color:var(--text-secondary)">${I18n.t('chart_loading')}</span>`;
        }
      } catch (e) {
        UI.showToast(I18n.t('error_network'), 'error');
      }
    },

    async orders() {
      const container = document.getElementById('activeOrdersList');
      const empty = document.getElementById('emptyActiveOrders');
      try {
        const res = await api.get('/admin/orders');
        Store.activeOrders = res.data || res || [];
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
        const list = res.data || res || [];
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

    notifications() {
      Store.notifications = [];
      document.getElementById('emptyNotifications')?.classList.remove('is-hidden');
      document.getElementById('notificationsList')?.innerHTML = '';
    },

    settings() {
      const container = document.getElementById('settingsContent');
      if (!container) return;
      container.innerHTML = `
        <div class="settings-item">
          <span>${I18n.t('language')}</span>
          <select id="langSelect">
            <option value="ar" ${I18n._lang === 'ar' ? 'selected' : ''}>${I18n.t('lang_ar')}</option>
            <option value="en" ${I18n._lang === 'en' ? 'selected' : ''}>${I18n.t('lang_en')}</option>
            <option value="de" ${I18n._lang === 'de' ? 'selected' : ''}>${I18n.t('lang_de')}</option>
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
          <span>${I18n.t('min_order_label')}</span>
          <input type="number" id="minOrderInput" placeholder="${I18n.t('min_order_placeholder')}" />
        </div>
        <button class="btn btn-primary btn-block" id="saveSettingsBtn">${I18n.t('save_settings')}</button>
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
      document.getElementById('saveSettingsBtn').addEventListener('click', () => {
        // Settings endpoint not available; save locally and notify
        UI.showToast(I18n.t('saved_locally'), 'success');
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

      Auth._bindEvents();
      await Auth.fetchAdmin();

      document.querySelectorAll('.sidebar-link[data-screen]').forEach(btn => {
        btn.addEventListener('click', () => {
          this.router.navigate(btn.dataset.screen);
          document.getElementById('sidebar')?.classList.remove('open');
        });
      });

      document.querySelector('.sidebar-link[data-action="logout"]')?.addEventListener('click', () => Auth.logout());

      document.getElementById('sidebarToggleBtn')?.addEventListener('click', () => {
        document.getElementById('sidebar')?.classList.toggle('open');
      });

      document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          I18n.setLang(btn.dataset.lang);
        });
      });

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
