(function () {
  'use strict';

  /* ===========================================================
     1. INTERNATIONALIZATION (i18n) – AR / EN / DE
     =========================================================== */
  const I18n = {
    _lang: localStorage.getItem('driver_lang') || 'ar',
    _data: {
      ar: {
        app_title: 'Fairfood Price - السائق', loading: 'جاري التحميل…', locating: 'تحديد الموقع…',
        online: '🟢 متصل', offline: '🔴 غير متصل', home: 'الرئيسية', incoming_orders: 'طلبات جديدة',
        active_delivery: 'توصيل نشط', earnings: 'أرباحي', settings: 'الإعدادات',
        nav_home: 'الرئيسية', nav_orders: 'الطلبات', nav_delivery: 'التوصيل',
        nav_earnings: 'الأرباح', nav_settings: 'الإعدادات', nav_profile: 'ملفي', nav_wallet: 'المحفظة',
        no_new_orders: 'لا توجد طلبات جديدة حاليًا', accept: 'قبول', reject: 'رفض',
        new_order: 'طلب جديد', today_earnings: 'ر.س', today_deliveries: 'توصيل',
        offline_banner: 'أنت غير متصل بالإنترنت', reconnect_banner: 'تمت إعادة الاتصال',
        map_unavailable: 'الخريطة غير متاحة حاليًا', navigate_google: '🗺️ Google Maps',
        navigate_waze: '🚗 Waze', call_customer: '📞 اتصال', chat_customer: '💬 محادثة',
        emergency_support: '🆘 طوارئ', close: 'إغلاق', back: 'رجوع',
        estimated_time: 'الوقت المقدر', delivery_fee: 'رسوم التوصيل',
        pickup: 'استلام الطلب', dropoff: 'تسليم الطلب',
        earnings_today: 'أرباح اليوم', deliveries_today: 'التوصيلات',
        error_network: 'خطأ في الاتصال بالخادم', error_general: 'حدث خطأ ما', retry: 'إعادة المحاولة',
        logout: 'تسجيل الخروج', language: 'اللغة', theme: 'المظهر', dark: 'داكن', light: 'فاتح',
        menu: 'القائمة', main_navigation: 'التنقل الرئيسي', no_active_order: 'لا يوجد توصيل نشط',
        auth_welcome: 'أهلاً بك!', order_accepted: 'تم قبول الطلب', session_expired: 'انتهت الجلسة',
        support_unavailable: 'رقم الدعم غير متاح حاليًا', my_profile: 'ملفي الشخصي',
        total_deliveries: 'التوصيلات', weekly_earnings: 'أسبوعي', monthly_earnings: 'شهري',
        documents: 'المستندات', vehicle_info: 'معلومات المركبة', notifications: 'الإشعارات',
        orders_history: 'سجل الطلبات', wallet: 'المحفظة', dashboard: 'لوحة التحكم',
        wallet_balance: 'الرصيد الحالي', withdraw: 'طلب سحب', transaction_history: 'سجل الحركات',
        no_transactions: 'لا توجد حركات مالية', no_orders_history: 'لا يوجد سجل طلبات',
        no_notifications: 'لا توجد إشعارات', support: 'الدعم الفني', about: 'عن التطبيق',
        type_message: 'اكتب رسالة...', send: 'إرسال', order_history: 'تاريخ الطلب',
        amount: 'المبلغ', distance: 'المسافة', status: 'الحالة',
        delivery_sheet_title: 'توصيل نشط',
        order_accepted_message: 'تم قبول الطلب بنجاح',
        order_rejected_message: 'تم رفض الطلب',
        earnings_weekly: 'الأسبوعي',
        earnings_monthly: 'الشهري',
        document_upload: 'رفع مستند',
        vehicle_plate: 'رقم اللوحة',
        vehicle_model: 'نوع المركبة',
        notification_mark_read: 'تحديد كمقروء',
        settings_language: 'اللغة',
        settings_theme: 'المظهر',
        settings_sounds: 'الأصوات',
        settings_notifications: 'الإشعارات',
        confirm_logout: 'هل أنت متأكد من تسجيل الخروج؟',
        no_documents: 'لا توجد مستندات',
        no_vehicle_info: 'لا توجد معلومات مركبة',
        withdraw_request_sent: 'تم إرسال طلب السحب',
        transaction_debit: 'خصم',
        transaction_credit: 'إيداع',
        order_details: 'تفاصيل الطلب',
        feature_unavailable: 'هذه الميزة غير متاحة حاليًا',
        driver_login: 'تسجيل دخول السائق',
        driver_register_title: 'تسجيل سائق جديد',
        driver_register_btn: 'تسجيل',
        driver_register_success: 'تم التسجيل بنجاح',
        no_account: 'ليس لديك حساب؟ تسجيل',
        have_account: 'لديك حساب؟ دخول',
        name_label: 'الاسم الكامل',
        phone_label: 'رقم الهاتف',
        vehicle_label: 'نوع المركبة',
        plate_label: 'رقم اللوحة',
        vehicle_car: 'سيارة',
        vehicle_motorcycle: 'دراجة نارية',
        vehicle_bicycle: 'دراجة',
        vehicle_scooter: 'سكوتر',
        fill_fields: 'الرجاء تعبئة جميع الحقول',
        email: 'البريد الإلكتروني',
        password: 'كلمة المرور',
        login: 'دخول',
        na: 'غير متوفر',
        pending: 'قيد الإجراء',
        picked_up: 'استلمت الطلب',
        on_the_way: 'في الطريق',
        delivered: 'تم التوصيل',
        restaurant: 'المطعم',
        customer: 'العميل',
        arabic: 'العربية',
        english: 'English',
        german: 'Deutsch'
      },
      en: {
        app_title: 'Fairfood Price - Driver', loading: 'Loading…', locating: 'Locating…',
        online: '🟢 Online', offline: '🔴 Offline', home: 'Home', incoming_orders: 'Incoming Orders',
        active_delivery: 'Active Delivery', earnings: 'Earnings', settings: 'Settings',
        nav_home: 'Home', nav_orders: 'Orders', nav_delivery: 'Delivery',
        nav_earnings: 'Earnings', nav_settings: 'Settings', nav_profile: 'Profile', nav_wallet: 'Wallet',
        no_new_orders: 'No new orders', accept: 'Accept', reject: 'Reject',
        new_order: 'New Order', today_earnings: 'SAR', today_deliveries: 'deliveries',
        offline_banner: 'You are offline', reconnect_banner: 'Reconnected',
        map_unavailable: 'Map not available', navigate_google: '🗺️ Google Maps',
        navigate_waze: '🚗 Waze', call_customer: '📞 Call', chat_customer: '💬 Chat',
        emergency_support: '🆘 Emergency', close: 'Close', back: 'Back',
        estimated_time: 'Estimated time', delivery_fee: 'Delivery fee',
        pickup: 'Pick up', dropoff: 'Drop off',
        earnings_today: 'Today\'s earnings', deliveries_today: 'Deliveries',
        error_network: 'Network error', error_general: 'Something went wrong', retry: 'Retry',
        logout: 'Log out', language: 'Language', theme: 'Theme', dark: 'Dark', light: 'Light',
        menu: 'Menu', main_navigation: 'Main navigation', no_active_order: 'No active delivery',
        auth_welcome: 'Welcome!', order_accepted: 'Order accepted', session_expired: 'Session expired',
        support_unavailable: 'Support number not available', my_profile: 'My Profile',
        total_deliveries: 'Total Deliveries', weekly_earnings: 'Weekly', monthly_earnings: 'Monthly',
        documents: 'Documents', vehicle_info: 'Vehicle Info', notifications: 'Notifications',
        orders_history: 'Order History', wallet: 'Wallet', dashboard: 'Dashboard',
        wallet_balance: 'Current Balance', withdraw: 'Withdraw', transaction_history: 'Transaction History',
        no_transactions: 'No transactions', no_orders_history: 'No order history',
        no_notifications: 'No notifications', support: 'Support', about: 'About',
        type_message: 'Type a message...', send: 'Send', order_history: 'Order History',
        amount: 'Amount', distance: 'Distance', status: 'Status',
        delivery_sheet_title: 'Active Delivery',
        order_accepted_message: 'Order accepted successfully',
        order_rejected_message: 'Order rejected',
        earnings_weekly: 'Weekly',
        earnings_monthly: 'Monthly',
        document_upload: 'Upload Document',
        vehicle_plate: 'Plate Number',
        vehicle_model: 'Vehicle Model',
        notification_mark_read: 'Mark as read',
        settings_language: 'Language',
        settings_theme: 'Theme',
        settings_sounds: 'Sounds',
        settings_notifications: 'Notifications',
        confirm_logout: 'Are you sure you want to log out?',
        no_documents: 'No documents',
        no_vehicle_info: 'No vehicle information',
        withdraw_request_sent: 'Withdrawal request sent',
        transaction_debit: 'Debit',
        transaction_credit: 'Credit',
        order_details: 'Order Details',
        feature_unavailable: 'This feature is currently unavailable',
        driver_login: 'Driver Login',
        driver_register_title: 'Register New Driver',
        driver_register_btn: 'Register',
        driver_register_success: 'Registration successful',
        no_account: 'No account? Register',
        have_account: 'Already have an account? Login',
        name_label: 'Full Name',
        phone_label: 'Phone Number',
        vehicle_label: 'Vehicle Type',
        plate_label: 'Plate Number',
        vehicle_car: 'Car',
        vehicle_motorcycle: 'Motorcycle',
        vehicle_bicycle: 'Bicycle',
        vehicle_scooter: 'Scooter',
        fill_fields: 'Please fill in all fields',
        email: 'Email',
        password: 'Password',
        login: 'Login',
        na: 'N/A',
        pending: 'Pending',
        picked_up: 'Picked up',
        on_the_way: 'On the way',
        delivered: 'Delivered',
        restaurant: 'Restaurant',
        customer: 'Customer',
        arabic: 'العربية',
        english: 'English',
        german: 'Deutsch'
      },
      de: {
        app_title: 'Fairfood Price - Fahrer', loading: 'Lädt…', locating: 'Standort wird ermittelt…',
        online: '🟢 Online', offline: '🔴 Offline', home: 'Startseite', incoming_orders: 'Neue Aufträge',
        active_delivery: 'Aktive Lieferung', earnings: 'Verdienst', settings: 'Einstellungen',
        nav_home: 'Start', nav_orders: 'Aufträge', nav_delivery: 'Lieferung',
        nav_earnings: 'Verdienst', nav_settings: 'Einstellungen', nav_profile: 'Profil', nav_wallet: 'Geldbörse',
        no_new_orders: 'Keine neuen Aufträge', accept: 'Annehmen', reject: 'Ablehnen',
        new_order: 'Neuer Auftrag', today_earnings: 'EUR', today_deliveries: 'Lieferungen',
        offline_banner: 'Sie sind offline', reconnect_banner: 'Wieder verbunden',
        map_unavailable: 'Karte nicht verfügbar', navigate_google: '🗺️ Google Maps',
        navigate_waze: '🚗 Waze', call_customer: '📞 Anrufen', chat_customer: '💬 Chat',
        emergency_support: '🆘 Notfall', close: 'Schließen', back: 'Zurück',
        estimated_time: 'Voraussichtliche Zeit', delivery_fee: 'Liefergebühr',
        pickup: 'Abholung', dropoff: 'Zustellung',
        earnings_today: 'Heutiger Verdienst', deliveries_today: 'Lieferungen heute',
        error_network: 'Netzwerkfehler', error_general: 'Ein Fehler ist aufgetreten', retry: 'Wiederholen',
        logout: 'Abmelden', language: 'Sprache', theme: 'Erscheinungsbild', dark: 'Dunkel', light: 'Hell',
        menu: 'Menü', main_navigation: 'Hauptnavigation', no_active_order: 'Keine aktive Lieferung',
        auth_welcome: 'Willkommen!', order_accepted: 'Auftrag angenommen', session_expired: 'Sitzung abgelaufen',
        support_unavailable: 'Supportnummer nicht verfügbar', my_profile: 'Mein Profil',
        total_deliveries: 'Gesamtlieferungen', weekly_earnings: 'Wöchentlich', monthly_earnings: 'Monatlich',
        documents: 'Dokumente', vehicle_info: 'Fahrzeuginformation', notifications: 'Benachrichtigungen',
        orders_history: 'Bestellverlauf', wallet: 'Geldbörse', dashboard: 'Dashboard',
        wallet_balance: 'Aktuelles Guthaben', withdraw: 'Abheben', transaction_history: 'Transaktionsverlauf',
        no_transactions: 'Keine Transaktionen', no_orders_history: 'Kein Bestellverlauf',
        no_notifications: 'Keine Benachrichtigungen', support: 'Support', about: 'Über',
        type_message: 'Nachricht schreiben...', send: 'Senden', order_history: 'Bestellverlauf',
        amount: 'Betrag', distance: 'Entfernung', status: 'Status',
        delivery_sheet_title: 'Aktive Lieferung',
        order_accepted_message: 'Auftrag angenommen',
        order_rejected_message: 'Auftrag abgelehnt',
        earnings_weekly: 'Wöchentlich',
        earnings_monthly: 'Monatlich',
        document_upload: 'Dokument hochladen',
        vehicle_plate: 'Kennzeichen',
        vehicle_model: 'Fahrzeugmodell',
        notification_mark_read: 'Als gelesen markieren',
        settings_language: 'Sprache',
        settings_theme: 'Erscheinungsbild',
        settings_sounds: 'Töne',
        settings_notifications: 'Benachrichtigungen',
        confirm_logout: 'Möchten Sie sich wirklich abmelden?',
        no_documents: 'Keine Dokumente',
        no_vehicle_info: 'Keine Fahrzeuginformationen',
        withdraw_request_sent: 'Auszahlungsantrag gesendet',
        transaction_debit: 'Belastung',
        transaction_credit: 'Gutschrift',
        order_details: 'Bestelldetails',
        feature_unavailable: 'Diese Funktion ist derzeit nicht verfügbar',
        driver_login: 'Fahrer-Login',
        driver_register_title: 'Neuen Fahrer registrieren',
        driver_register_btn: 'Registrieren',
        driver_register_success: 'Registrierung erfolgreich',
        no_account: 'Kein Konto? Registrieren',
        have_account: 'Bereits Konto? Anmelden',
        name_label: 'Vollständiger Name',
        phone_label: 'Telefonnummer',
        vehicle_label: 'Fahrzeugtyp',
        plate_label: 'Kennzeichen',
        vehicle_car: 'Auto',
        vehicle_motorcycle: 'Motorrad',
        vehicle_bicycle: 'Fahrrad',
        vehicle_scooter: 'Roller',
        fill_fields: 'Bitte füllen Sie alle Felder aus',
        email: 'E-Mail',
        password: 'Passwort',
        login: 'Anmelden',
        na: 'N/A',
        pending: 'Ausstehend',
        picked_up: 'Abgeholt',
        on_the_way: 'Unterwegs',
        delivered: 'Geliefert',
        restaurant: 'Restaurant',
        customer: 'Kunde',
        arabic: 'العربية',
        english: 'English',
        german: 'Deutsch'
      }
    },
    t(key) { return this._data[this._lang]?.[key] || this._data.en[key] || key; },
    setLang(lang) {
      if (this._data[lang]) {
        this._lang = lang;
        localStorage.setItem('driver_lang', lang);
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

  function getCurrency() {
    const localeMap = { ar: 'SAR', en: 'USD', de: 'EUR' };
    return localeMap[I18n._lang] || 'SAR';
  }

  function formatPrice(cents, currencyCode) {
    try {
      return new Intl.NumberFormat('ar-SA', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      }).format(cents / 100);
    } catch {
      return (cents / 100).toFixed(2) + ' ' + currencyCode;
    }
  }

  /* ===========================================================
     3. API CLIENT (modified to match backend response format)
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
      const token = localStorage.getItem('driver_token');
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

        // لو صار 401 وكانت الف call من دوام قديم (التوكن تغير) نتجاهلها
        if (res.status === 401 && !path.includes('/auth/login')) {
          const currentToken = localStorage.getItem('driver_token');
          if (currentToken && currentToken !== token) {
            // المستخدم سجل دخول بتوكن جديد - نتجاهل الـ 401 القديم
            throw new Error('IGNORE_STALE_401');
          }
          localStorage.removeItem('driver_token');
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
    user: null,
    token: localStorage.getItem('driver_token') || null,
    isOnline: localStorage.getItem('driver_online') === 'true',
    orders: [],
    activeDelivery: null,
    earnings: null,
    wallet: null,
    transactions: [],
    notifications: [],
    documents: [],
    vehicleInfo: null,
    settings: {
      language: localStorage.getItem('driver_lang') || 'ar',
      theme: localStorage.getItem('driver_theme') || 'light',
      sounds: localStorage.getItem('driver_sounds') !== 'false'
    },
    map: null,
    socket: null,
    userLocation: null,
    userMarker: null,
    driverMarker: null
  };

  /* ===========================================================
     5. ROUTER
     =========================================================== */
  class Router {
    constructor() {
      this.current = 'home';
      this.history = [];
      this.screenMap = {
        home: 'homeScreen',
        orders: 'ordersScreen',
        delivery: 'deliveryScreen',
        earnings: 'earningsScreen',
        wallet: 'walletScreen',
        profile: 'profileScreen',
        settings: 'settingsScreen',
        documents: 'documentsScreen',
        vehicleInfo: 'vehicleInfoScreen',
        notifications: 'notificationsScreen',
        ordersHistory: 'ordersHistoryScreen'
      };
    }

    navigate(screen, params = null) {
      if (this.current !== screen) {
        this.history.push({ screen: this.current, params: null });
      }
      this.current = screen;
      this._updateNav();
      this._renderScreen(screen, params);
    }

    refresh() {
      this._renderScreen(this.current, null);
    }

    back() {
      if (this.history.length > 0) {
        const prev = this.history.pop();
        this.current = prev.screen;
        this._updateNav();
        this._renderScreen(prev.screen, prev.params);
      }
    }

    _updateNav() {
      document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.screen === this.current);
      });
    }

    _renderScreen(screen, params) {
      UI.closeSheet('activeDeliverySheet');
      UI.closeModal('incomingOrderModal');
      UI.closeModal('chatModal');
      UI.closeModal('supportModal');
      UI.closeModal('aboutModal');

      if (Auth._authRequired) return;

      document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
      const screenId = this.screenMap[screen];
      if (screenId) {
        document.getElementById(screenId)?.classList.add('active');
      }

      switch (screen) {
        case 'home': App.screens.home(); break;
        case 'orders': App.screens.orders(); break;
        case 'delivery': App.screens.delivery(); break;
        case 'earnings': App.screens.earnings(); break;
        case 'wallet': App.screens.wallet(); break;
        case 'profile': App.screens.profile(); break;
        case 'settings': App.screens.settings(); break;
        case 'documents': App.screens.documents(); break;
        case 'vehicleInfo': App.screens.vehicleInfo(); break;
        case 'notifications': App.screens.notifications(); break;
        case 'ordersHistory': App.screens.ordersHistory(); break;
      }

      if (Store.map && screen === 'home') {
        clearTimeout(Store._mapTimer);
        Store._mapTimer = setTimeout(() => Store.map?.invalidateSize(), 200);
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

    openSheet(id) { document.getElementById(id)?.classList.remove('is-hidden'); },
    closeSheet(id) { document.getElementById(id)?.classList.add('is-hidden'); },
    openModal(id) { document.getElementById(id)?.classList.remove('is-hidden'); },
    closeModal(id) { document.getElementById(id)?.classList.add('is-hidden'); },

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

    updateBadge(id, count) {
      const badge = document.getElementById(id);
      if (!badge) return;
      badge.textContent = count;
      count > 0 ? badge.classList.remove('is-hidden') : badge.classList.add('is-hidden');
    },

    announce(message) {
      const region = document.getElementById('ariaLiveRegion');
      if (region) region.textContent = message;
    }
  };

  /* ===========================================================
     7. MAP SERVICE (uses shared/map-service.js)
     =========================================================== */
  const MapService = {
    async init() {
      const map = await FairfoodMap.init('driverMap', { hideZoomControl: true });
      if (!map) { document.getElementById('mapFallback')?.classList.remove('is-hidden'); return; }
      Store.map = map;
      const pos = await FairfoodMap.getCurrentPosition();
      Store.userLocation = { lat: pos.lat, lng: pos.lng };
      map.setView([pos.lat, pos.lng], 14);
      document.getElementById('mapFallback')?.classList.add('is-hidden');
      this.updateUserMarker();
    },

    updateUserMarker() {
      if (!Store.userLocation) return;
      FairfoodMap.addMarker('driver_user', Store.userLocation.lat, Store.userLocation.lng, '', 'user');
    },

    updateDriverMarker(lat, lng) {
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
      FairfoodMap.addMarker('driver_delivery', lat, lng, '', 'driver');
    },

    startTracking() {
      if (!Store.token) return;
      FairfoodMap.startWatching((pos) => {
        Store.userLocation = { lat: pos.lat, lng: pos.lng };
        document.getElementById('mapFallback')?.classList.add('is-hidden');
        this.updateUserMarker();
        api.post('/driver/location', { lat: pos.lat, lng: pos.lng, accuracy: pos.accuracy || 0 }).catch(() => {});
      });
    },

    stopTracking() {
      FairfoodMap.stopWatching();
    }
  };

  /* ===========================================================
     8. REALTIME SERVICE (Native WebSocket)
     =========================================================== */
  const RealtimeService = {
    _ws: null,
    _reconnectTimer: null,

    init() {
      if (!Store.token) return;
      if (this._ws) { try { this._ws.close(); } catch (e) {} }
      const url = (window.APP_CONFIG?.socketUrl || window.location.origin).replace(/^http/, 'ws') + '/api/realtime';
      this._ws = new WebSocket(url);

      this._ws.onopen = () => {
        UI.hideBanners();
        // Join driver channel
        this._send({ type: 'join:drivers' });
        // Join own order channels if active
        if (Store.activeDelivery?.orderId) {
          this._send({ type: 'join:order', orderId: Store.activeDelivery.orderId });
        }
      };

      this._ws.onmessage = (ev) => {
        try {
          const msg = JSON.parse(ev.data);
          const event = msg.event || msg.type;
          const data = msg.data || msg;

          if (event === 'driver:new_order') {
            if (!App._knownOrderIds.has(data.id)) {
              App._knownOrderIds.add(data.id);
              Store.orders.push(data);
              UI.updateBadge('ordersBadge', Store.orders.length);
              UI.announce(I18n.t('new_order'));
              App.screens.showIncomingModal(data);
              try { document.getElementById('soundNewOrder')?.play(); } catch (e) { }
            }
          }

          if (event === 'driver:order_cancelled') {
            Store.orders = Store.orders.filter(o => o.id !== data.order_id);
            UI.updateBadge('ordersBadge', Store.orders.length);
            try { document.getElementById('soundCancelled')?.play(); } catch (e) { }
          }

          if (event === 'driver:delivery_update') {
            Store.activeDelivery = data;
            if (['home', 'delivery'].includes(App.router.current)) {
              App.screens.delivery();
            }
          }

          if (event === 'order:status') {
            // Update active delivery status if applicable
            if (Store.activeDelivery && data.orderId === Store.activeDelivery.orderId) {
              Store.activeDelivery = { ...Store.activeDelivery, ...data };
            }
          }
        } catch (e) { /* ignore parse errors */ }
      };

      this._ws.onclose = () => {
        UI.showOfflineBanner();
        this._reconnectTimer = setTimeout(() => this.init(), 5000);
      };

      this._ws.onerror = () => { this._ws?.close(); };
    },

    _send(msg) {
      if (this._ws?.readyState === WebSocket.OPEN) {
        this._ws.send(JSON.stringify(msg));
      }
    },

    joinOrder(orderId) {
      this._send({ type: 'join:order', orderId });
    },

    disconnect() {
      clearTimeout(this._reconnectTimer);
      if (this._ws) { try { this._ws.close(); } catch (e) {} this._ws = null; }
    }
  };

  /* ===========================================================
     9. AUTH SERVICE
     =========================================================== */
  const Auth = {
    _authRequired: false,

    async login(email, password) {
      try {
        const res = await api.post('/driver/auth/login', { email, password });
        Store.token = res.token;
        localStorage.setItem('driver_token', res.token);
        Store.user = res.user;
        this._authRequired = false;
        document.getElementById('authSheet')?.classList.add('is-hidden');
        document.getElementById('authError')?.classList.add('is-hidden');
        RealtimeService.init();
        MapService.startTracking();
        App._startPolling();
        App.router.navigate('home');
        UI.showToast(I18n.t('auth_welcome'), 'success');
      } catch (e) {
        const errEl = document.getElementById('authError');
        if (errEl) {
          errEl.textContent = e.message;
          errEl.classList.remove('is-hidden');
        }
      }
    },

    logout() {
      RealtimeService.disconnect();
      MapService.stopTracking();
      clearInterval(App._pollTimer);
      clearInterval(App._activePollTimer);
      this.silentLogout();
      UI.showToast(I18n.t('logout'), 'success');
    },

    silentLogout() {
      RealtimeService.disconnect();
      MapService.stopTracking();
      FairfoodMap.destroy('driverMap');
      clearInterval(App._pollTimer);
      clearInterval(App._activePollTimer);
      Store.token = null;
      localStorage.removeItem('driver_token');
      Store.user = null;
      Store.isOnline = false;
      localStorage.setItem('driver_online', 'false');
      this.showRequired();
    },

    showRequired() {
      this._authRequired = true;
      document.getElementById('authSheet')?.classList.remove('is-hidden');
    },

    async fetchUser() {
      if (Store.token) {
        try {
          const res = await api.get('/driver/profile');
          Store.user = res.user || res.data || res;
          if (Store.user) {
            document.getElementById('authSheet')?.classList.add('is-hidden');
            return;
          }
        } catch (e) { }
      }
      this.showRequired();
    },

    _bindEvents() {
      let loginInProgress = false;
      document.getElementById('authLoginBtn')?.addEventListener('click', async () => {
        if (loginInProgress) return;
        const email = document.getElementById('authEmail').value.trim();
        const password = document.getElementById('authPassword').value;
        if (!email || !password) {
          const ae = document.getElementById('authError');
          if (ae) { ae.textContent = I18n.t('fill_fields'); ae.classList.remove('is-hidden'); }
          return;
        }
        loginInProgress = true;
        const btn = document.getElementById('authLoginBtn');
        btn.disabled = true;
        btn.textContent = '...';
        await Auth.login(email, password);
        btn.disabled = false;
        btn.textContent = I18n.t('login');
        loginInProgress = false;
      });
      document.getElementById('authPassword')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') document.getElementById('authLoginBtn')?.click();
      });
      document.getElementById('regPassword')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') document.getElementById('doRegisterBtn')?.click();
      });

      // Toggle register / login
      document.getElementById('showRegisterLink')?.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('authLoginForm')?.classList.add('is-hidden');
        document.getElementById('authRegisterForm')?.classList.remove('is-hidden');
        document.getElementById('authError')?.classList.add('is-hidden');
      });
      document.getElementById('showLoginLink')?.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('authRegisterForm')?.classList.add('is-hidden');
        document.getElementById('authLoginForm')?.classList.remove('is-hidden');
        document.getElementById('authError')?.classList.add('is-hidden');
      });

      // Register
      let registerInProgress = false;
      document.getElementById('doRegisterBtn')?.addEventListener('click', async () => {
        if (registerInProgress) return;
        const name = document.getElementById('regName')?.value.trim();
        const email = document.getElementById('regEmail')?.value.trim();
        const phone = document.getElementById('regPhone')?.value.trim();
        const password = document.getElementById('regPassword')?.value;
        const vehicle = document.getElementById('regVehicle')?.value;
        const plateNumber = document.getElementById('regPlate')?.value.trim();
        if (!name || !email || !password) {
          const ae = document.getElementById('authError');
          if (ae) { ae.textContent = I18n.t('fill_fields'); ae.classList.remove('is-hidden'); }
          return;
        }
        registerInProgress = true;
        const btn = document.getElementById('doRegisterBtn');
        btn.disabled = true;
        btn.textContent = '...';
        try {
          const res = await api.request('POST', '/auth/register', { role: 'driver', name, email, phone, password, vehicle, plateNumber });
          const token = res.token || res.data?.token;
          const user = res.user || res.data?.user;
          if (!token) throw new Error(I18n.t('error_general'));
          localStorage.setItem('driver_token', token);
          Store.token = token;
          Store.user = user;
          document.getElementById('authSheet')?.classList.add('is-hidden');
          UI.showToast(I18n.t('driver_register_success'), 'success');
          Auth._authRequired = false;
          await MapService.init();
          MapService.startTracking();
          RealtimeService.init();
          App._startPolling();
        } catch (err) {
          const ae = document.getElementById('authError');
          if (ae) { ae.textContent = err.message || I18n.t('error_general'); ae.classList.remove('is-hidden'); }
        } finally {
          btn.disabled = false;
          btn.textContent = I18n.t('driver_register_btn');
          registerInProgress = false;
        }
      });
    }
  };

  /* ===========================================================
     10. SCREENS (Business Logic)
     =========================================================== */
  const Screens = {
    home() {
      this._loadQuickStats();
      if (Store.activeDelivery) {
        UI.openSheet('activeDeliverySheet');
        this._renderActiveDeliverySheet(Store.activeDelivery);
      }
    },

    async orders() {
      const container = document.getElementById('incomingOrdersList');
      const emptyState = document.getElementById('emptyOrders');
      try {
        const res = await api.get('/driver/orders/available');
        Store.orders = res.orders || res.data || res || [];
        if (!Array.isArray(Store.orders)) Store.orders = [];
        UI.updateBadge('ordersBadge', Store.orders.length);
        if (Store.orders.length === 0) {
          emptyState.classList.remove('is-hidden');
          container.innerHTML = '';
        } else {
          emptyState.classList.add('is-hidden');
          const currency = getCurrency();
          container.innerHTML = Store.orders.map(order => `
            <div class="order-card">
              <div class="order-detail">
                <h4>${SafeHTML.escape(order.restaurant_name)}</h4>
                <p>${SafeHTML.escape(order.delivery_address)}</p>
                <p>${I18n.t('delivery_fee')}: ${formatPrice(order.estimated_earning || 0, currency)}</p>
              </div>
              <div class="order-actions">
                <button class="btn btn-success btn-sm accept-order-btn" data-id="${order.id}">${I18n.t('accept')}</button>
                <button class="btn btn-danger btn-sm reject-order-btn" data-id="${order.id}">${I18n.t('reject')}</button>
              </div>
            </div>
          `).join('');
          container.querySelectorAll('.accept-order-btn').forEach(btn => {
            btn.addEventListener('click', () => this.acceptOrder(btn.dataset.id));
          });
          container.querySelectorAll('.reject-order-btn').forEach(btn => {
            btn.addEventListener('click', () => this.rejectOrder(btn.dataset.id));
          });
        }
      } catch (e) {
        UI.showToast(I18n.t('error_network'), 'error');
      }
    },

    async acceptOrder(orderId) {
      try {
        await api.post(`/orders/${encodeURIComponent(orderId)}/driver-accept`);
        RealtimeService.joinOrder(orderId);
        // Fetch current order details for the delivery sheet
        let delivery = { orderId };
        try {
          const orderRes = await api.get(`/orders/${encodeURIComponent(orderId)}`);
          delivery = orderRes.data || orderRes || delivery;
        } catch (e) { /* use basic info */ }
        Store.activeDelivery = delivery;
        UI.showToast(I18n.t('order_accepted_message'), 'success');
        Store.orders = Store.orders.filter(o => o.id !== orderId);
        UI.updateBadge('ordersBadge', Store.orders.length);
        UI.openSheet('activeDeliverySheet');
        this._renderActiveDeliverySheet(Store.activeDelivery);
        this.orders();
      } catch (e) {
        UI.showToast(e.message, 'error');
      }
    },

    async rejectOrder(orderId) {
      try {
        await api.post(`/orders/${encodeURIComponent(orderId)}/cancel`);
        UI.showToast(I18n.t('order_rejected_message'), 'info');
        Store.orders = Store.orders.filter(o => o.id !== orderId);
        UI.updateBadge('ordersBadge', Store.orders.length);
        this.orders();
      } catch (e) {
        UI.showToast(e.message, 'error');
      }
    },

    delivery() {
      if (Store.activeDelivery) {
        UI.openSheet('activeDeliverySheet');
        this._renderActiveDeliverySheet(Store.activeDelivery);
      } else {
        UI.closeSheet('activeDeliverySheet');
        document.getElementById('activeDeliveryContent').innerHTML = `
          <div class="empty-state">${I18n.t('no_active_order')}</div>`;
      }
    },

    _renderActiveDeliverySheet(delivery) {
      const stepContent = document.getElementById('deliveryStepContent');
      const rName = SafeHTML.escape(delivery.restaurant_name || delivery.restaurantName || '');
      const cName = SafeHTML.escape(delivery.customer_name || delivery.customerName || '');
      const destLat = delivery.destination_lat || delivery.destLat;
      const destLng = delivery.destination_lng || delivery.destLng;
      const orderId = delivery.orderId || delivery.id;

      stepContent.innerHTML = `
        <div class="step-card"><h3>🏪 ${rName || I18n.t('restaurant')}</h3></div>
        <div class="step-card"><h3>📦 ${I18n.t('pickup')}</h3></div>
        <div class="step-card"><h3>🏁 ${cName || I18n.t('customer')}</h3></div>
        <div class="delivery-actions" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:16px">
          <button class="btn btn-primary btn-sm" id="pickedUpBtn" style="flex:1">${I18n.t('picked_up')}</button>
          <button class="btn btn-primary btn-sm" id="onTheWayBtn" style="flex:1">${I18n.t('on_the_way')}</button>
          <button class="btn btn-success btn-sm" id="deliveredBtn" style="flex:1">${I18n.t('delivered')}</button>
        </div>
      `;

      if (destLat && destLng) {
        const googleMapsUrl = `https://maps.google.com/maps?daddr=${destLat},${destLng}`;
        const wazeUrl = `https://waze.com/ul?ll=${destLat},${destLng}&navigate=yes`;
        document.getElementById('googleMapsBtn').href = googleMapsUrl;
        document.getElementById('wazeBtn').href = wazeUrl;
      }

      document.getElementById('callCustomerBtn').disabled = true;
      document.getElementById('chatCustomerBtn').onclick = () => {
        UI.openModal('chatModal');
      };
      document.getElementById('emergencySupportBtn').onclick = () => {
        const supportPhone = window.APP_CONFIG?.supportPhone;
        if (supportPhone) {
          window.location.href = `tel:${supportPhone}`;
        } else {
          UI.showToast(I18n.t('support_unavailable'), 'info');
        }
      };

      // Delivery status actions
      const pickedUpBtn = document.getElementById('pickedUpBtn');
      const onTheWayBtn = document.getElementById('onTheWayBtn');
      const deliveredBtn = document.getElementById('deliveredBtn');

      if (pickedUpBtn) {
        pickedUpBtn.onclick = async () => {
          try {
            await api.post(`/orders/${encodeURIComponent(orderId)}/picked-up`);
            UI.showToast('✅ ' + I18n.t('picked_up'), 'success');
          } catch (e) { UI.showToast(e.message, 'error'); }
        };
      }
      if (onTheWayBtn) {
        onTheWayBtn.onclick = async () => {
          try {
            await api.post(`/orders/${encodeURIComponent(orderId)}/on-the-way`);
            UI.showToast('🚀 ' + I18n.t('on_the_way'), 'success');
          } catch (e) { UI.showToast(e.message, 'error'); }
        };
      }
      if (deliveredBtn) {
        deliveredBtn.onclick = async () => {
          try {
            await api.post(`/orders/${encodeURIComponent(orderId)}/delivered`);
            UI.showToast('🎉 ' + I18n.t('delivered'), 'success');
            Store.activeDelivery = null;
            UI.closeSheet('activeDeliverySheet');
          } catch (e) { UI.showToast(e.message, 'error'); }
        };
      }
    },

    async earnings() {
      const container = document.getElementById('earningsContainer');
      try {
        const res = await api.get('/driver/earnings');
        const data = res.data || res || {};
        Store.earnings = data;
        const currency = getCurrency();
        container.innerHTML = `
          <div class="earnings-card">
            <h4>${I18n.t('earnings_today')}</h4>
            <div class="amount">${formatPrice(data.today_earnings || 0, currency)}</div>
          </div>
          <div class="earnings-card">
            <h4>${I18n.t('earnings_weekly')}</h4>
            <div class="amount">${formatPrice(data.weekly_earnings || 0, currency)}</div>
          </div>
          <div class="earnings-card">
            <h4>${I18n.t('earnings_monthly')}</h4>
            <div class="amount">${formatPrice(data.monthly_earnings || 0, currency)}</div>
          </div>
        `;
      } catch (e) {
        UI.showToast(e.message, 'error');
      }
    },

    async wallet() {
      try {
        const res = await api.get('/driver/wallet');
        Store.wallet = res.data || res || {};
        const currency = getCurrency();
        document.getElementById('walletBalance').textContent = formatPrice(Store.wallet.balance_cents || 0, currency);

        const tRes = await api.get('/driver/wallet/transactions');
        Store.transactions = tRes.data || tRes || [];
        if (!Array.isArray(Store.transactions)) Store.transactions = [];
        const tContainer = document.getElementById('transactionsList');
        const emptyTrans = document.getElementById('emptyTransactions');
        if (Store.transactions.length === 0) {
          emptyTrans.classList.remove('is-hidden');
          tContainer.innerHTML = '';
        } else {
          emptyTrans.classList.add('is-hidden');
          tContainer.innerHTML = Store.transactions.map(tx => `
            <div class="order-card">
              <div>
                <strong>${SafeHTML.escape(tx.description)}</strong>
                <p>${new Date(tx.created_at).toLocaleDateString()}</p>
              </div>
              <span class="tx-amount ${tx.type === 'credit' ? 'tx-credit' : 'tx-debit'}">
                ${tx.type === 'credit' ? '+' : '-'}${formatPrice(tx.amount_cents || 0, currency)}
              </span>
            </div>
          `).join('');
        }

        document.getElementById('withdrawBtn').onclick = () => {
          UI.showToast(I18n.t('feature_unavailable'), 'info');
        };
      } catch (e) {
        UI.showToast(e.message, 'error');
      }
    },

    profile() {
      if (Store.user) {
        document.getElementById('driverName')?.textContent = Store.user.name || '---';
        document.getElementById('driverRating')?.textContent = Store.user.rating || '0.0';
        document.getElementById('driverVehicleNumber')?.textContent = Store.user.vehicle_plate || '---';
        document.getElementById('driverVehicleType')?.textContent = Store.user.vehicle_model || '---';
        if (Store.user.avatar_url) {
          document.getElementById('driverAvatarImg')?.setAttribute('src', Store.user.avatar_url);
        }
        document.getElementById('statDeliveries')?.textContent = Store.user.total_deliveries || 0;
        const pCurrency = getCurrency();
        document.getElementById('statToday')?.textContent = formatPrice(Store.user.today_earnings || 0, pCurrency);
        document.getElementById('statWeekly')?.textContent = formatPrice(Store.user.weekly_earnings || 0, pCurrency);
        document.getElementById('statMonthly')?.textContent = formatPrice(Store.user.monthly_earnings || 0, pCurrency);
      }
    },

    settings() {
      const container = document.getElementById('settingsContent');
      container.innerHTML = `
        <div class="settings-item">
          <span>${I18n.t('settings_language')}</span>
          <select id="langSelect">
            <option value="ar" ${I18n._lang === 'ar' ? 'selected' : ''}>${I18n.t('arabic')}</option>
            <option value="en" ${I18n._lang === 'en' ? 'selected' : ''}>${I18n.t('english')}</option>
            <option value="de" ${I18n._lang === 'de' ? 'selected' : ''}>${I18n.t('german')}</option>
          </select>
        </div>
        <div class="settings-item">
          <span>${I18n.t('settings_theme')}</span>
          <select id="themeSelect">
            <option value="light" ${Store.settings.theme === 'light' ? 'selected' : ''}>${I18n.t('light')}</option>
            <option value="dark" ${Store.settings.theme === 'dark' ? 'selected' : ''}>${I18n.t('dark')}</option>
          </select>
        </div>
        <div class="settings-item">
          <span>${I18n.t('settings_sounds')}</span>
          <input type="checkbox" id="soundsCheck" ${Store.settings.sounds ? 'checked' : ''}>
        </div>
        <button class="btn btn-danger btn-block" id="logoutBtn">${I18n.t('logout')}</button>
      `;

      document.getElementById('langSelect').addEventListener('change', (e) => {
        I18n.setLang(e.target.value);
        Store.settings.language = e.target.value;
        localStorage.setItem('driver_lang', e.target.value);
      });
      document.getElementById('themeSelect').addEventListener('change', (e) => {
        document.body.setAttribute('data-theme', e.target.value);
        Store.settings.theme = e.target.value;
        localStorage.setItem('driver_theme', e.target.value);
      });
      document.getElementById('soundsCheck').addEventListener('change', (e) => {
        Store.settings.sounds = e.target.checked;
        localStorage.setItem('driver_sounds', e.target.checked);
      });
      document.getElementById('logoutBtn').addEventListener('click', () => Auth.logout());
    },

    async documents() {
      const container = document.getElementById('documentsContent');
      try {
        const res = await api.get('/driver/documents');
        const docs = res.data || res || [];
        if (!Array.isArray(docs) || docs.length === 0) {
          container.innerHTML = `<div class="empty-state">${I18n.t('no_documents')}</div>`;
        } else {
          container.innerHTML = docs.map(d => `
            <div class="order-card">
              <div class="order-detail">
                <h4>${SafeHTML.escape(d.type || d.name || '')}</h4>
                <p>${d.status || I18n.t('pending')}</p>
              </div>
            </div>
          `).join('');
        }
      } catch (e) {
        container.innerHTML = `<div class="empty-state">${I18n.t('no_documents')}</div>`;
      }
    },

    async vehicleInfo() {
      const container = document.getElementById('vehicleInfoContent');
      try {
        const res = await api.get('/driver/vehicle');
        const v = res.data || res || {};
        if (!v.plate_number && !v.vehicle_model) {
          container.innerHTML = `<div class="empty-state">${I18n.t('no_vehicle_info')}</div>`;
        } else {
          container.innerHTML = `
            <div class="earnings-card">
              <p><strong>${I18n.t('vehicle_plate')}:</strong> ${SafeHTML.escape(v.plate_number || I18n.t('na'))}</p>
              <p><strong>${I18n.t('vehicle_model')}:</strong> ${SafeHTML.escape(v.vehicle_model || v.vehicle || I18n.t('na'))}</p>
            </div>
          `;
        }
      } catch (e) {
        container.innerHTML = `<div class="empty-state">${I18n.t('no_vehicle_info')}</div>`;
      }
    },

    async notifications() {
      const container = document.getElementById('notificationsList');
      const empty = document.getElementById('emptyNotifications');
      try {
        const res = await api.get('/driver/notifications');
        const notifs = res.data || res || [];
        if (!Array.isArray(notifs) || notifs.length === 0) {
          empty.classList.remove('is-hidden');
          container.innerHTML = '';
        } else {
          empty.classList.add('is-hidden');
          container.innerHTML = notifs.map(n => `
            <div class="order-card">
              <div class="order-detail">
                <h4>${SafeHTML.escape(n.title || '')}</h4>
                <p>${SafeHTML.escape(n.body || n.message || '')}</p>
                <small>${new Date(n.created_at).toLocaleDateString()}</small>
              </div>
            </div>
          `).join('');
        }
      } catch (e) {
        empty.classList.remove('is-hidden');
        container.innerHTML = '';
      }
    },

    async ordersHistory() {
      const container = document.getElementById('ordersHistoryList');
      const empty = document.getElementById('emptyOrdersHistory');
      try {
        const res = await api.get('/driver/orders/history');
        const orders = res.data || res || [];
        if (!Array.isArray(orders) || orders.length === 0) {
          empty.classList.remove('is-hidden');
          container.innerHTML = '';
        } else {
          empty.classList.add('is-hidden');
          container.innerHTML = orders.map(o => `
            <div class="order-card">
              <div class="order-detail">
                <h4>${SafeHTML.escape(o.restaurant_name || '')}</h4>
                <p>${SafeHTML.escape(o.delivery_address || o.restaurant_address || '')}</p>
                <p>${new Date(o.updated_at || o.created_at).toLocaleDateString()}</p>
                <span class="status-badge">${o.status || ''}</span>
              </div>
            </div>
          `).join('');
        }
      } catch (e) {
        empty.classList.remove('is-hidden');
        container.innerHTML = '';
      }
    },

    showIncomingModal(order) {
      const details = document.getElementById('incomingOrderDetails');
      const currency = getCurrency();
      details.innerHTML = `
        <p><strong>${SafeHTML.escape(order.restaurant_name)}</strong></p>
        <p>${SafeHTML.escape(order.delivery_address)}</p>
        <p>${I18n.t('delivery_fee')}: ${formatPrice(order.estimated_earning || 0, currency)}</p>
      `;
      UI.openModal('incomingOrderModal');

      document.getElementById('acceptOrderBtn').onclick = () => {
        this.acceptOrder(order.id);
        UI.closeModal('incomingOrderModal');
      };
      document.getElementById('rejectOrderBtn').onclick = () => {
        this.rejectOrder(order.id);
        UI.closeModal('incomingOrderModal');
      };
    },

    async _loadQuickStats() {
      if (!Store.token) return;
      try {
        const res = await api.get('/driver/earnings');
        const data = res.data || res || {};
        const currency = getCurrency();
        document.getElementById('quickStats').innerHTML = `
          <div class="stat-badge">💰 ${formatPrice(data.today_earnings || 0, currency)}</div>
          <div class="stat-badge">📦 ${data.today_deliveries || 0} ${I18n.t('today_deliveries')}</div>
        `;
      } catch (e) { /* ignore */ }
    }
  };

  /* ===========================================================
     11. APPLICATION INITIALIZATION
     =========================================================== */
  const App = {
    router: null,
    screens: Screens,
    auth: Auth,

    async init() {
      console.log('[App] init start');
      try {
        this.router = new Router();
        I18n.setLang(Store.settings.language);
        document.body.setAttribute('data-theme', Store.settings.theme);

        Auth._bindEvents();
        // Timeout للـ fetchUser عشان ما يعلق
        try {
          await Promise.race([
            Auth.fetchUser(),
            new Promise((_, reject) => setTimeout(() => reject(new Error('fetchUser timeout')), 8000))
          ]);
        } catch (e) {
          if (e.message === 'fetchUser timeout') console.warn('[App] fetchUser timed out');
          else throw e;
        }

        if (Store.token) {
          RealtimeService.init();
          this._startPolling();
        }
      } catch (e) {
        console.error('Init error:', e);
      }
      console.log('[App] init step1 done');
      UI.hideLoader();

      // Map أولاً، ثم GPS بعده (عشان ما يصير سباق)
      try { await MapService.init(); } catch (e) { console.warn('Map init error:', e); }
      try { MapService.startTracking(); } catch (e) { console.warn('Tracking error:', e); }
      console.log('[App] init step2 done (map)');

      const toggleBtn = document.getElementById('toggleOnlineBtn');
      this._updateOnlineBtn();
      toggleBtn?.addEventListener('click', async () => {
        const newState = !Store.isOnline;
        try {
          await api.post('/driver/status', { online: newState });
          Store.isOnline = newState;
          localStorage.setItem('driver_online', newState);
          this._updateOnlineBtn();
        } catch (e) {
          UI.showToast(e.message, 'error');
        }
      });

      document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => this.router.navigate(btn.dataset.screen));
      });

      document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', () => this.router.navigate(btn.dataset.screen || 'home'));
      });

      document.getElementById('menuBtn')?.addEventListener('click', () => {
        this.router.navigate('profile');
      });

      document.getElementById('closeDeliverySheetBtn')?.addEventListener('click', () => UI.closeSheet('activeDeliverySheet'));
      document.getElementById('closeChatModalBtn')?.addEventListener('click', () => UI.closeModal('chatModal'));
      document.getElementById('closeSupportModalBtn')?.addEventListener('click', () => UI.closeModal('supportModal'));
      document.getElementById('closeAboutModalBtn')?.addEventListener('click', () => UI.closeModal('aboutModal'));

      document.querySelectorAll('.menu-item[data-action]').forEach(item => {
        item.addEventListener('click', () => {
          const action = item.dataset.action;
          if (action === 'theme') {
            const newTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
            document.body.setAttribute('data-theme', newTheme);
            Store.settings.theme = newTheme;
            localStorage.setItem('driver_theme', newTheme);
          } else if (action === 'support') {
            UI.openModal('supportModal');
          } else if (action === 'about') {
            UI.openModal('aboutModal');
          } else if (action === 'logout') {
            Auth.logout();
          } else if (action === 'dashboard') {
            this.router.navigate('home');
          }
        });
      });

      document.querySelectorAll('.menu-item[data-screen]').forEach(item => {
        item.addEventListener('click', () => {
          this.router.navigate(item.dataset.screen);
        });
      });

      document.getElementById('sendMessageBtn')?.addEventListener('click', () => {
        UI.showToast(I18n.t('feature_unavailable'), 'info');
      });

      window.addEventListener('online', () => {
        UI.showReconnectBanner();
        clearTimeout(UI._hideBannerTimer);
        UI._hideBannerTimer = setTimeout(() => UI.hideBanners(), 3000);
      });
      window.addEventListener('offline', () => UI.showOfflineBanner());

      this.router.navigate('home');
      UI.hideLoader();
    },

    _knownOrderIds: new Set(),

    _startPolling() {
      clearInterval(this._pollTimer);
      this._pollTimer = setInterval(async () => {
        if (!Store.token || Auth._authRequired) return;
        try {
          const res = await api.get('/driver/orders/available');
          const orders = res.orders || res.data || res || [];
          if (Array.isArray(orders)) {
            const incomingIds = new Set(orders.map(o => o.id));
            for (const order of orders) {
              if (!this._knownOrderIds.has(order.id)) {
                UI.announce(I18n.t('new_order'));
                App.screens.showIncomingModal(order);
                try { document.getElementById('soundNewOrder')?.play(); } catch (e) { }
              }
            }
            Store.orders = orders;
            this._knownOrderIds = incomingIds;
            UI.updateBadge('ordersBadge', Store.orders.length);
          }
        } catch (e) { /* ignore polling errors */ }
      }, 15000);

      clearInterval(this._activePollTimer);
      this._activePollTimer = setInterval(async () => {
        if (!Store.token || Auth._authRequired) return;
        if (Store.activeDelivery) return;
        try {
          const res = await api.get('/driver/orders/current');
          const list = res.orders || res.data || res || [];
          if (Array.isArray(list) && list.length > 0) {
            Store.activeDelivery = list[0];
            if (['home', 'delivery'].includes(App.router.current)) {
              App.screens.delivery();
            }
          }
        } catch (e) { /* ignore */ }
      }, 10000);
    },

    _updateOnlineBtn() {
      const btn = document.getElementById('toggleOnlineBtn');
      if (!btn) return;
      btn.className = Store.isOnline ? 'btn btn-success btn-block' : 'btn btn-danger btn-block';
      btn.innerHTML = `<span>${I18n.t(Store.isOnline ? 'online' : 'offline')}</span>`;
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    // Fallback: إخفاء اللودر بعد 4 ثواني مهما صار
    const loaderTimer = setTimeout(() => {
      document.getElementById('app')?.classList.remove('app-loading');
    }, 4000);
    App.init().finally(() => { clearTimeout(loaderTimer); UI.hideLoader(); });
  });

})();
