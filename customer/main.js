(function () {
  'use strict';

  const I18n = {
    _lang: localStorage.getItem('app_lang') || 'ar',
    _data: {
      ar: {
        app_title: 'Fairfood', loading: 'جاري التحميل…', locating: 'تحديد الموقع…',
        nav_home: 'الرئيسية', nav_cart: 'السلة', nav_orders: 'طلباتي', nav_tracking: 'التتبع', nav_wallet: 'المحفظة', nav_profile: 'حسابي',
        search_placeholder: 'ابحث عن مطعم…', all_categories: 'جميع التصنيفات',
        sort_rating: 'الأعلى تقييمًا', sort_time: 'أسرع توصيل', sort_fee: 'الأقل رسومًا', no_results: 'لا توجد نتائج',
        add_to_cart: 'أضف', place_order: 'تأكيد الطلب', empty_cart: 'السلة فارغة',
        delivery_address_label: 'عنوان التوصيل', payment_method_label: 'طريقة الدفع',
        order_notes_label: 'ملاحظات للمطعم', order_notes_placeholder: 'مثال: بدون بصل',
        coupon_label: 'كود الخصم', coupon_placeholder: 'أدخل الكود', apply_coupon: 'تطبيق',
        add_address: '+ إضافة عنوان جديد', address_name_label: 'اسم العنوان',
        address_name_placeholder: 'مثال: المنزل', address_details_label: 'العنوان التفصيلي',
        address_details_placeholder: 'الشارع، رقم المبنى، المدينة', use_current_location: 'استخدام موقعي الحالي',
        save_address: 'حفظ العنوان', auth_title: 'تسجيل الدخول', email_label: 'البريد الإلكتروني',
        password_label: 'كلمة المرور', login_btn: 'دخول', guest_btn: 'متابعة كزائر',
        no_active_order: 'لا يوجد طلب نشط', tracking_placeholder: 'سيظهر التتبع هنا بعد تأكيد الطلب.',
        error_network: 'خطأ في الاتصال بالخادم', error_general: 'حدث خطأ ما', retry: 'إعادة المحاولة',
        logout: 'تسجيل الخروج', order_success: 'تم تقديم طلبك بنجاح!',
        free_delivery: 'توصيل مجاني', back: 'رجوع', total: 'الإجمالي', added: 'تمت الإضافة',
        order_status_pending: 'قيد الانتظار', order_status_accepted: 'تم القبول',
        order_status_preparing: 'قيد التحضير', order_status_ready: 'جاهز',
        order_status_picked_up: 'في الطريق', order_status_delivered: 'تم التوصيل',
        order_status_cancelled: 'ملغي',
        delivery_fee: 'رسوم التوصيل', service_fee: 'رسوم الخدمة',
        address_required: 'يرجى اختيار عنوان التوصيل', cart_empty_error: 'السلة فارغة',
        restaurant_missing: 'الرجاء اختيار مطعم أولاً', order_placing: 'جارٍ تأكيد الطلب…',
        location_denied: 'تعذر الوصول للموقع', auth_welcome: 'أهلاً بك!',
        guest_welcome: 'وضع الزائر', address_saved: 'تم حفظ العنوان',
        estimated_time: 'الوقت المقدر', map_unavailable: 'الخريطة غير متاحة حاليًا',
        address_unavailable: 'العنوان غير متاح', invalid_quote: 'عرض سعر غير صالح، يرجى إعادة المحاولة',
        orders_empty: 'لا توجد طلبات سابقة', wallet_balance: 'الرصيد',
        wallet_pending: 'معلق', wallet_empty: 'لا توجد حركات', order_date: 'التاريخ',
        discount: 'خصم', coupon_applied: 'تم تطبيق الكود', coupon_invalid: 'الكود غير صالح',
        pay_cash: 'كاش', pay_card: 'بطاقة', pay_wallet: 'محفظة', pay_stripe: 'Stripe',
        confirm_cancel: 'هل تريد إلغاء الطلب؟', cancel: 'إلغاء', order_cancelled: 'تم إلغاء الطلب',
        notifications: 'الإشعارات', no_notifications: 'لا توجد إشعارات',
        orders_history: 'الطلبات السابقة', order_details: 'تفاصيل الطلب',
        driver_location: 'موقع السائق', restaurant_name: 'المطعم',
        total_paid: 'المدفوع', status: 'الحالة', min: 'دقيقة',
        coupon_saved: 'تم توفير', items_count: 'أصناف',
        register_toggle: 'ليس لديك حساب؟ إنشاء حساب جديد',
        register_btn: 'إنشاء حساب',
        login_toggle: 'لديك حساب؟ تسجيل الدخول',
        name_label: 'الاسم',
        phone_label: 'رقم الجوال',
        auth_required: 'الرجاء تسجيل الدخول للمتابعة',
        register_success: 'تم إنشاء الحساب بنجاح',
        order_income: 'الوارد',
        order_spending: 'المنصرف',
        transaction_history: 'حركات المحفظة'
      },
      en: {
        app_title: 'Fairfood', loading: 'Loading…', locating: 'Locating…',
        nav_home: 'Home', nav_cart: 'Cart', nav_orders: 'My Orders', nav_tracking: 'Tracking', nav_wallet: 'Wallet', nav_profile: 'Profile',
        search_placeholder: 'Search restaurants…', all_categories: 'All Categories',
        sort_rating: 'Top Rated', sort_time: 'Fastest Delivery', sort_fee: 'Lowest Fee', no_results: 'No results',
        add_to_cart: 'Add', place_order: 'Place Order', empty_cart: 'Cart is empty',
        delivery_address_label: 'Delivery Address', payment_method_label: 'Payment Method',
        order_notes_label: 'Notes for Restaurant', order_notes_placeholder: 'e.g. No onions',
        coupon_label: 'Promo Code', coupon_placeholder: 'Enter code', apply_coupon: 'Apply',
        add_address: '+ Add New Address', address_name_label: 'Address Name',
        address_name_placeholder: 'e.g. Home', address_details_label: 'Full Address',
        address_details_placeholder: 'Street, Building, City', use_current_location: 'Use My Current Location',
        save_address: 'Save Address', auth_title: 'Sign In', email_label: 'Email',
        password_label: 'Password', login_btn: 'Sign In', guest_btn: 'Continue as Guest',
        no_active_order: 'No Active Order', tracking_placeholder: 'Tracking will appear after order confirmation.',
        error_network: 'Network error', error_general: 'Something went wrong', retry: 'Retry',
        logout: 'Log out', order_success: 'Your order has been placed!',
        free_delivery: 'Free delivery', back: 'Back', total: 'Total', added: 'Added',
        order_status_pending: 'Pending', order_status_accepted: 'Accepted',
        order_status_preparing: 'Preparing', order_status_ready: 'Ready',
        order_status_picked_up: 'On the way', order_status_delivered: 'Delivered',
        order_status_cancelled: 'Cancelled',
        delivery_fee: 'Delivery fee', service_fee: 'Service fee',
        address_required: 'Please select a delivery address', cart_empty_error: 'Cart is empty',
        restaurant_missing: 'Please select a restaurant first', order_placing: 'Placing order…',
        location_denied: 'Location access denied', auth_welcome: 'Welcome!',
        guest_welcome: 'Guest mode', address_saved: 'Address saved',
        estimated_time: 'Estimated time', map_unavailable: 'Map not available',
        address_unavailable: 'Address unavailable', invalid_quote: 'Invalid quote, please try again',
        orders_empty: 'No past orders', wallet_balance: 'Balance',
        wallet_pending: 'Pending', wallet_empty: 'No transactions', order_date: 'Date',
        discount: 'Discount', coupon_applied: 'Coupon applied', coupon_invalid: 'Invalid coupon',
        pay_cash: 'Cash', pay_card: 'Card', pay_wallet: 'Wallet', pay_stripe: 'Stripe',
        confirm_cancel: 'Cancel this order?', cancel: 'Cancel', order_cancelled: 'Order cancelled',
        notifications: 'Notifications', no_notifications: 'No notifications',
        orders_history: 'Past Orders', order_details: 'Order Details',
        driver_location: 'Driver location', restaurant_name: 'Restaurant',
        total_paid: 'Total paid', status: 'Status', min: 'min',
        coupon_saved: 'Saved', items_count: 'items',
        register_toggle: "Don't have an account? Register",
        register_btn: 'Register',
        login_toggle: 'Already have an account? Login',
        name_label: 'Name',
        phone_label: 'Phone',
        auth_required: 'Please sign in to continue',
        register_success: 'Account created successfully',
        order_income: 'Income',
        order_spending: 'Spending',
        transaction_history: 'Wallet History'
      },
      de: {
        app_title: 'Fairfood', loading: 'Lädt…', locating: 'Standort…',
        nav_home: 'Start', nav_cart: 'Korb', nav_orders: 'Bestellungen', nav_tracking: 'Sendung', nav_wallet: 'Geldbörse', nav_profile: 'Konto',
        search_placeholder: 'Restaurants suchen…', all_categories: 'Alle Kategorien',
        sort_rating: 'Bestbewertet', sort_time: 'Schnellste Lieferung', sort_fee: 'Niedrigste Gebühr', no_results: 'Keine Ergebnisse',
        add_to_cart: 'Hinzufügen', place_order: 'Bestellen', empty_cart: 'Warenkorb leer',
        delivery_address_label: 'Lieferadresse', payment_method_label: 'Zahlungsmethode',
        order_notes_label: 'Notiz', order_notes_placeholder: 'z.B. Keine Zwiebeln',
        coupon_label: 'Gutschein', coupon_placeholder: 'Code eingeben', apply_coupon: 'Einlösen',
        add_address: '+ Neue Adresse', address_name_label: 'Name',
        address_name_placeholder: 'z.B. Zuhause', address_details_label: 'Adresse',
        address_details_placeholder: 'Straße, Nr., Stadt', use_current_location: 'Mein Standort',
        save_address: 'Speichern', auth_title: 'Anmelden', email_label: 'E‑Mail',
        password_label: 'Passwort', login_btn: 'Anmelden', guest_btn: 'Als Gast',
        no_active_order: 'Keine aktive Bestellung', tracking_placeholder: 'Tracking erscheint nach Bestellung.',
        error_network: 'Netzwerkfehler', error_general: 'Fehler', retry: 'Wiederholen',
        logout: 'Abmelden', order_success: 'Bestellung aufgegeben!',
        free_delivery: 'Kostenloser Versand', back: 'Zurück', total: 'Gesamt', added: 'Hinzugefügt',
        order_status_pending: 'Ausstehend', order_status_accepted: 'Akzeptiert',
        order_status_preparing: 'Zubereitung', order_status_ready: 'Bereit',
        order_status_picked_up: 'Unterwegs', order_status_delivered: 'Geliefert',
        order_status_cancelled: 'Storniert',
        delivery_fee: 'Liefergebühr', service_fee: 'Servicegebühr',
        address_required: 'Bitte Adresse wählen', cart_empty_error: 'Warenkorb leer',
        restaurant_missing: 'Bitte Restaurant wählen', order_placing: 'Bestellung wird aufgegeben…',
        location_denied: 'Standort verweigert', auth_welcome: 'Willkommen!',
        guest_welcome: 'Gastmodus', address_saved: 'Adresse gespeichert',
        estimated_time: 'Voraussichtliche Zeit', map_unavailable: 'Karte nicht verfügbar',
        address_unavailable: 'Adresse nicht verfügbar', invalid_quote: 'Ungültiges Angebot',
        orders_empty: 'Keine vergangenen Bestellungen', wallet_balance: 'Guthaben',
        wallet_pending: 'Ausstehend', wallet_empty: 'Keine Transaktionen', order_date: 'Datum',
        discount: 'Rabatt', coupon_applied: 'Gutschein eingelöst', coupon_invalid: 'Ungültiger Gutschein',
        pay_cash: 'Bar', pay_card: 'Karte', pay_wallet: 'Wallet', pay_stripe: 'Stripe',
        confirm_cancel: 'Bestellung stornieren?', cancel: 'Stornieren', order_cancelled: 'Storniert',
        notifications: 'Benachrichtigungen', no_notifications: 'Keine Benachrichtigungen',
        orders_history: 'Bisherige Bestellungen', order_details: 'Bestelldetails',
        driver_location: 'Fahrerstandort', restaurant_name: 'Restaurant',
        total_paid: 'Bezahlt', status: 'Status', min: 'Min.',
        coupon_saved: 'Gespart', items_count: 'Artikel',
        register_toggle: 'Noch kein Konto? Registrieren',
        register_btn: 'Registrieren',
        login_toggle: 'Bereits ein Konto? Anmelden',
        name_label: 'Name',
        phone_label: 'Telefon',
        auth_required: 'Bitte anmelden um fortzufahren',
        register_success: 'Konto erfolgreich erstellt',
        order_income: 'Einnahmen',
        order_spending: 'Ausgaben',
        transaction_history: 'Transaktionsverlauf'
      }
    },
    t(key) { return this._data[this._lang]?.[key] || this._data.en[key] || key; },
    setLang(lang) {
      if (this._data[lang]) {
        this._lang = lang;
        localStorage.setItem('app_lang', lang);
        document.documentElement.lang = lang;
        document.body.dir = (lang === 'ar') ? 'rtl' : 'ltr';
        this._updateUIStrings();
        if (App.router) App.router.refresh();
      }
    },
    _updateUIStrings() {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        const t = this.t(key);
        if (t) el.textContent = t;
      });
      document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        const t = this.t(key);
        if (t) el.placeholder = t;
      });
    }
  };

  const SafeHTML = {
    escape(str) {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    }
  };

  function fmtPrice(cents) {
    return (cents / 100).toFixed(2);
  }

  const STATUS_MAP = {
    'new': 'pending',
    'accepted_by_restaurant': 'accepted',
    'preparing': 'preparing',
    'ready_for_driver': 'ready',
    'accepted_by_driver': 'picked_up',
    'picked_up': 'picked_up',
    'on_the_way': 'picked_up',
    'completed': 'delivered',
    'cancelled': 'cancelled'
  };

  function mapStatus(s) { return STATUS_MAP[s] || s; }

  class ApiClient {
    constructor(baseURL = '/api/v1') {
      this.base = baseURL;
    }

    async request(method, path, body = null, retries = 1) {
      const url = `${this.base}${path}`;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      const headers = { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' };
      const token = localStorage.getItem('token') || localStorage.getItem('ff_token');
      if (token) headers.Authorization = `Bearer ${token}`;

      try {
        const res = await fetch(url, {
          method, headers,
          body: body ? JSON.stringify(body) : null,
          signal: controller.signal
        });
        clearTimeout(timeout);
        const payload = await res.json().catch(() => ({}));
        if (res.status === 401 && !path.includes('/auth/login') && !path.includes('/auth/guest')) {
          localStorage.removeItem('token');
          localStorage.removeItem('ff_token');
          throw new Error('Session expired');
        }
        if (!res.ok || payload.success === false) {
          throw new Error(payload.message || payload.error?.message || `HTTP ${res.status}`);
        }
        return payload.data || payload;
      } catch (err) {
        clearTimeout(timeout);
        if (err.name === 'AbortError') throw new Error('Request timeout');
        if (retries > 0 && method === 'GET') return this.request(method, path, body, retries - 1);
        throw err;
      }
    }

    get(path) { return this.request('GET', path); }
    post(path, data) { return this.request('POST', path, data); }
    put(path, data) { return this.request('PUT', path, data); }
    delete(path) { return this.request('DELETE', path); }
  }

  const api = new ApiClient(window.APP_CONFIG?.apiBaseUrl || '/api/v1');

  const CART_KEY = 'app_cart';
  const RESTAURANT_KEY = 'app_restaurant_id';

  const Store = {
    user: null,
    token: localStorage.getItem('token') || localStorage.getItem('ff_token') || null,
    addresses: [],
    restaurants: [],
    categories: [],
    currentRestaurant: localStorage.getItem(RESTAURANT_KEY) || null,
    menu: [],
    cart: JSON.parse(localStorage.getItem(CART_KEY) || '[]'),
    currentOrder: null,
    orders: [],
    wallet: null,
    walletTx: [],
    notifications: [],
    filters: { category: '', sort: 'rating' },
    map: null,
    ws: null,
    driverMarker: null,
    userMarker: null,
    watchId: null,
    userLocation: null,
    userAddress: null
  };

  function persistCartAndRestaurant() {
    localStorage.setItem(CART_KEY, JSON.stringify(Store.cart));
    if (Store.currentRestaurant) {
      localStorage.setItem(RESTAURANT_KEY, Store.currentRestaurant);
    } else {
      localStorage.removeItem(RESTAURANT_KEY);
    }
  }

  function setRestaurantIfNeeded(restaurantId) {
    if (!Store.currentRestaurant || Store.cart.length === 0) {
      Store.currentRestaurant = restaurantId;
      persistCartAndRestaurant();
    }
  }

  class Router {
    constructor() {
      this.current = 'home';
      this.history = [];
    }

    navigate(screen, params = null) {
      if (this.current !== screen) {
        this.history.push({ screen: this.current, params: null });
      }
      this.current = screen;
      this._updateNav();
      this._renderScreen(screen, params);
    }

    refresh() { this._renderScreen(this.current, null); }

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
        btn.classList.toggle('active', btn.dataset.tab === this.current);
      });
    }

    _renderScreen(screen, params) {
      UI.closeSheet('addressSheet');
      UI.closeSheet('checkoutSheet');
      UI.closeSheet('newAddressSheet');
      if (!Auth._authRequired) UI.closeSheet('authSheet');
      UI.closeSheet('orderDetailSheet');
      UI.closeTracking();

      switch (screen) {
        case 'home': App.screens.home(); break;
        case 'restaurant': App.screens.restaurant(params); break;
        case 'cart': App.screens.cart(); break;
        case 'orders': App.screens.orders(); break;
        case 'tracking': App.screens.tracking(); break;
        case 'wallet': App.screens.wallet(); break;
        case 'profile': App.screens.profile(); break;
        default: App.screens.home();
      }
    }
  }

  const UI = {
    showToast(msg, type = 'success') {
      const container = document.getElementById('toastContainer');
      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      toast.textContent = msg;
      container.appendChild(toast);
      setTimeout(() => toast.remove(), 4000);
    },

    showLoading() {
      document.getElementById('appContent').innerHTML = `<div class="loading-spinner">${I18n.t('loading')}</div>`;
    },

    showError(msg, retryFn) {
      const btn = retryFn ? `<button class="btn-secondary" id="retryBtn">${I18n.t('retry')}</button>` : '';
      document.getElementById('appContent').innerHTML = `<div class="empty-state"><p>${msg}</p>${btn}</div>`;
      if (retryFn) document.getElementById('retryBtn')?.addEventListener('click', retryFn);
    },

    showEmpty(msg) {
      document.getElementById('appContent').innerHTML = `<div class="empty-state"><p>${msg}</p></div>`;
    },

    openSheet(id) {
      const sheet = document.getElementById(id);
      if (sheet) {
        sheet.classList.remove('hidden');
        void sheet.offsetWidth;
        sheet.classList.add('open');
        this._toggleOverlay(true);
      }
    },

    closeSheet(id) {
      const sheet = document.getElementById(id);
      if (sheet) {
        sheet.classList.remove('open');
        setTimeout(() => sheet.classList.add('hidden'), 300);
        this._toggleOverlay(false);
      }
    },

    _toggleOverlay(show) {
      let overlay = document.querySelector('.sheet-overlay');
      if (!overlay && show) {
        overlay = document.createElement('div');
        overlay.className = 'sheet-overlay';
        document.body.appendChild(overlay);
      }
      if (overlay) {
        overlay.classList.toggle('open', show);
        overlay.onclick = () => {
          document.querySelectorAll('.bottom-sheet.open').forEach(s => {
            s.classList.remove('open');
            setTimeout(() => s.classList.add('hidden'), 300);
          });
          this._toggleOverlay(false);
        };
      }
    },

    _closeTimer: null,

    openTracking(order) {
      Store.currentOrder = order;
      if (this._closeTimer) { clearTimeout(this._closeTimer); this._closeTimer = null; }
      const container = document.getElementById('trackingContainer');
      container.classList.remove('hidden');
      void container.offsetWidth;
      container.classList.add('open');
      App.screens._renderTrackingDetail();
    },

    closeTracking() {
      const container = document.getElementById('trackingContainer');
      container.classList.remove('open');
      if (this._closeTimer) clearTimeout(this._closeTimer);
      this._closeTimer = setTimeout(() => {
        container.classList.add('hidden');
        this._closeTimer = null;
      }, 300);
    }
  };

  const Auth = {
    _authRequired: false,

    showRequired() {
      this._authRequired = true;
      const sheet = document.getElementById('authSheet');
      if (sheet) {
        sheet.classList.remove('hidden');
        void sheet.offsetWidth;
        sheet.classList.add('open');
      }
      const cover = document.querySelector('.sheet-overlay');
      if (cover) cover.style.pointerEvents = 'none';
    },

    async login(email, password) {
      try {
        const res = await api.post('/auth/login', { email, password });
        Store.token = res.token;
        localStorage.setItem('token', res.token);
        Store.user = res.user;
        this._authRequired = false;
        UI.closeSheet('authSheet');
        UI.showToast(I18n.t('auth_welcome'), 'success');
        App.router.navigate('home');
      } catch (e) {
        UI.showToast(e.message, 'error');
      }
    },

    async register(name, email, phone, password) {
      try {
        const res = await api.post('/auth/register', { name, email, phone, password, role: 'customer' });
        Store.token = res.token;
        localStorage.setItem('token', res.token);
        Store.user = res.user;
        this._authRequired = false;
        UI.closeSheet('authSheet');
        UI.showToast(I18n.t('register_success'), 'success');
        App.router.navigate('home');
      } catch (e) {
        UI.showToast(e.message, 'error');
      }
    },

    async guest() {
      try {
        const res = await api.post('/auth/guest', {});
        Store.token = res.token;
        localStorage.setItem('token', res.token);
        Store.user = null;
        this._authRequired = false;
        UI.closeSheet('authSheet');
        UI.showToast(I18n.t('guest_welcome'), 'success');
        App.router.navigate('home');
      } catch (e) {
        UI.showToast(e.message, 'error');
      }
    },

    logout() {
      Store.token = null;
      localStorage.removeItem('token');
      Store.user = null;
      if (Store.ws) { Store.ws.close(); Store.ws = null; }
      GPSService.clearWatch();
      this.showRequired();
      UI.showToast(I18n.t('logout'), 'success');
    },

    async fetchUser() {
      if (Store.token) {
        try {
          const res = await api.get('/auth/me');
          Store.user = res.user || res.data || res;
          if (Store.user) return;
        } catch (e) { }
      }
      this.showRequired();
    },

    _setupBindings() {
      document.getElementById('doLoginBtn')?.addEventListener('click', () => {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        if (!email || !password) { UI.showToast(I18n.t('auth_required'), 'error'); return; }
        Auth.login(email, password);
      });

      document.getElementById('registerToggleBtn')?.addEventListener('click', () => {
        document.getElementById('authLoginForm').style.display = 'none';
        document.getElementById('authRegisterForm').style.display = 'block';
        document.getElementById('authSheetTitle').textContent = I18n.t('register_btn');
      });

      document.getElementById('loginToggleBtn')?.addEventListener('click', () => {
        document.getElementById('authRegisterForm').style.display = 'none';
        document.getElementById('authLoginForm').style.display = 'block';
        document.getElementById('authSheetTitle').textContent = I18n.t('auth_title');
      });

      document.getElementById('doRegisterBtn')?.addEventListener('click', () => {
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const phone = document.getElementById('regPhone').value;
        const password = document.getElementById('regPassword').value;
        if (!name || !email || !phone || !password) {
          UI.showToast(I18n.t('auth_required'), 'error');
          return;
        }
        Auth.register(name, email, phone, password);
      });
    }
  };

  const GPSService = {
    getCurrentPosition() {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) { reject(new Error('Geolocation not supported')); return; }
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
          (err) => reject(err),
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
      });
    },

    _lastGpsTime: 0,

    watchPosition(callback) {
      if (Store.watchId) navigator.geolocation.clearWatch(Store.watchId);
      Store.watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          Store.userLocation = coords;
          callback(coords);
        },
        (err) => console.warn('GPS error', err),
        { enableHighAccuracy: false, timeout: 15000, maximumAge: 60000 }
      );
    },

    clearWatch() {
      if (Store.watchId) {
        navigator.geolocation.clearWatch(Store.watchId);
        Store.watchId = null;
      }
    },

    async reverseGeocode(lat, lng) {
      const now = Date.now();
      if (now - this._lastGpsTime < 30000) return;
      this._lastGpsTime = now;
      try {
        const res = await api.get(`/geo/reverse?lat=${lat}&lng=${lng}`);
        return res?.display_name || res?.data?.display_name || I18n.t('address_unavailable');
      } catch (e) {
        return I18n.t('address_unavailable');
      }
    }
  };

  const MapService = {
    init(lat, lng) {
      if (Store.map) return;
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
      const mapEl = document.getElementById('trackingMap');
      if (mapEl && typeof L !== 'undefined') {
        Store.map = L.map(mapEl).setView([lat, lng], 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '©️ OpenStreetMap' }).addTo(Store.map);
        this.updateUserLocation(lat, lng);
      }
    },

    updateUserLocation(lat, lng) {
      if (!Store.map || !Number.isFinite(lat) || !Number.isFinite(lng)) return;
      if (Store.userMarker) {
        Store.userMarker.setLatLng([lat, lng]);
      } else {
        Store.userMarker = L.marker([lat, lng], {
          icon: L.divIcon({ className: 'user-marker', html: '🔵', iconSize: [20, 20] })
        }).addTo(Store.map);
      }
      Store.map.setView([lat, lng], 15);
    },

    updateDriverLocation(lat, lng) {
      if (!Store.map || !Number.isFinite(lat) || !Number.isFinite(lng)) return;
      if (Store.driverMarker) {
        Store.driverMarker.setLatLng([lat, lng]);
      } else {
        Store.driverMarker = L.marker([lat, lng], {
          icon: L.divIcon({ className: 'driver-marker', html: '🛵', iconSize: [30, 30] })
        }).addTo(Store.map);
      }
    }
  };

  const WsService = {
    init(orderId) {
      if (Store.ws) { Store.ws.close(); Store.ws = null; }
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const url = `${protocol}//${window.location.host}/api/realtime`;
      try {
        const ws = new WebSocket(url);
        ws.onopen = () => {
          if (orderId) {
            ws.send(JSON.stringify({ type: 'join:order', orderId }));
          }
        };
        ws.onmessage = (e) => {
          try {
            const msg = JSON.parse(e.data);
            if (msg.event === 'order:status' && Store.currentOrder) {
              Store.currentOrder.status = msg.data?.status || Store.currentOrder.status;
              if (App.router.current === 'tracking') {
                App.screens._renderTrackingDetail();
              }
            }
            if (msg.event === 'driver:location' && Store.currentOrder) {
              MapService.updateDriverLocation(msg.data.lat, msg.data.lng);
            }
          } catch (_) {}
        };
        ws.onclose = () => { Store.ws = null; };
        ws.onerror = () => {};
        Store.ws = ws;
      } catch (_) {}
    }
  };

  const Screens = {
    async home() {
      UI.showLoading();
      try {
        const [restRes, catRes] = await Promise.all([
          api.get('/restaurants'),
          api.get('/categories')
        ]);
        Store.restaurants = Array.isArray(restRes) ? restRes : (restRes.data || restRes || []);
        Store.categories = Array.isArray(catRes) ? catRes : (catRes.data || catRes || []);

        const catSelect = document.getElementById('categorySelect');
        catSelect.innerHTML = `<option value="">${I18n.t('all_categories')}</option>`;
        Store.categories.forEach(cat => {
          const opt = document.createElement('option');
          opt.value = cat.id;
          opt.textContent = cat.name;
          catSelect.appendChild(opt);
        });

        this._renderRestaurantList();
      } catch (e) {
        UI.showError(e.message, () => Screens.home());
      }
    },

    _renderRestaurantList(filter = '') {
      let list = [...Store.restaurants];
      if (Store.filters.category) {
        list = list.filter(r => r.category_id == Store.filters.category || r.cuisine == Store.filters.category);
      }
      if (filter) {
        const q = filter.toLowerCase();
        list = list.filter(r => r.name.toLowerCase().includes(q));
      }
      list.sort((a, b) => {
        if (Store.filters.sort === 'rating') return (b.rating || 0) - (a.rating || 0);
        if (Store.filters.sort === 'deliveryTime') return (a.delivery_time_min || 99) - (b.delivery_time_min || 99);
        if (Store.filters.sort === 'deliveryFee') return (a.delivery_fee_cents || 99) - (b.delivery_fee_cents || 99);
        return 0;
      });

      const container = document.getElementById('appContent');
      if (!list.length) {
        UI.showEmpty(I18n.t('no_results'));
        return;
      }

      const currency = window.APP_CONFIG?.defaultCurrency || 'ر.س';
      let html = '';
      list.forEach(r => {
        const name = SafeHTML.escape(r.name);
        const logo = r.logo_url ? `<img src="${SafeHTML.escape(r.logo_url)}" alt="${name}">` : '<span style="font-size:2.5rem">🍽️</span>';
        const fee = r.delivery_fee_cents ? fmtPrice(r.delivery_fee_cents) + ' ' + currency : I18n.t('free_delivery');
        const time = r.delivery_time_min ? r.delivery_time_min + ' ' + I18n.t('min') : '—';
        html += `
          <div class="restaurant-card" data-id="${r.id}">
            <div class="card-media">${logo}</div>
            <div class="card-body">
              <h3>${name}</h3>
              <div class="meta">
                <span>⭐ ${r.rating || '—'}</span>
                <span>${time}</span>
                <span>${fee}</span>
              </div>
            </div>
          </div>`;
      });
      container.innerHTML = html;

      container.querySelectorAll('.restaurant-card').forEach(card => {
        card.addEventListener('click', () => {
          App.router.navigate('restaurant', card.dataset.id);
        });
      });
    },

    async restaurant(restaurantId) {
      UI.showLoading();
      try {
        const res = await api.get(`/restaurants/${encodeURIComponent(restaurantId)}/menu`);
        Store.currentRestaurant = restaurantId;
        persistCartAndRestaurant();
        Store.menu = Array.isArray(res) ? res : (res.data || res || []);

        const currency = window.APP_CONFIG?.defaultCurrency || 'ر.س';
        const container = document.getElementById('appContent');
        let html = `<button class="btn-small back-btn">← ${I18n.t('back')}</button>`;
        Store.menu.forEach(item => {
          const name = SafeHTML.escape(item.name);
          const desc = SafeHTML.escape(item.description || '');
          const price = fmtPrice(item.price_cents);
          const img = item.image ? `<img src="${SafeHTML.escape(item.image)}" class="item-image" alt="${name}">` : '';
          html += `
            <div class="menu-item">
              ${img}
              <div class="item-info">
                <div class="item-name">${name}</div>
                <div class="item-desc">${desc}</div>
                <div class="item-price">${price} ${currency}</div>
              </div>
              <button class="add-btn" data-item-id="${item.id}">+</button>
            </div>`;
        });
        container.innerHTML = html;

        container.querySelector('.back-btn').addEventListener('click', () => App.router.back());

        container.querySelectorAll('.add-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const itemId = btn.dataset.itemId;
            const item = Store.menu.find(i => i.id == itemId);
            if (item) {
              setRestaurantIfNeeded(restaurantId);
              App.cart.add({ id: item.id, name: item.name, price_cents: item.price_cents });
            }
          });
        });
      } catch (e) {
        UI.showError(e.message, () => Screens.restaurant(restaurantId));
      }
    },

    cart() {
      const container = document.getElementById('appContent');
      if (!Store.cart.length) {
        UI.showEmpty(I18n.t('empty_cart'));
        return;
      }
      const currency = window.APP_CONFIG?.defaultCurrency || 'ر.س';
      let html = '';
      let subtotal = 0;
      Store.cart.forEach((item, idx) => {
        const lineTotal = item.price_cents * item.quantity;
        subtotal += lineTotal;
        html += `
          <div class="cart-item">
            <span>${SafeHTML.escape(item.name)}</span>
            <div class="cart-item-controls">
              <button class="qty-btn" data-idx="${idx}" data-delta="-1">−</button>
              <span>${item.quantity}</span>
              <button class="qty-btn" data-idx="${idx}" data-delta="1">+</button>
            </div>
            <span>${fmtPrice(lineTotal)} ${currency}</span>
          </div>`;
      });
      html += `<div class="cart-total">${I18n.t('total')}: ${fmtPrice(subtotal)} ${currency}</div>
               <button class="btn-primary" id="proceedCheckoutBtn">${I18n.t('place_order')}</button>`;
      container.innerHTML = html;

      container.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.idx);
          const delta = parseInt(btn.dataset.delta);
          App.cart.updateQuantity(idx, delta);
        });
      });

      document.getElementById('proceedCheckoutBtn')?.addEventListener('click', () => {
        if (!Store.currentRestaurant) {
          UI.showToast(I18n.t('restaurant_missing'), 'error');
          return;
        }
        UI.openSheet('checkoutSheet');
        App.checkout.render();
      });
    },

    async orders() {
      UI.showLoading();
      try {
        const res = await api.get('/orders/my');
        Store.orders = Array.isArray(res) ? res : (res.data || res || []);
        const container = document.getElementById('appContent');
        const currency = window.APP_CONFIG?.defaultCurrency || 'ر.س';

        if (!Store.orders.length) {
          UI.showEmpty(I18n.t('orders_empty'));
          return;
        }

        let html = '';
        Store.orders.forEach(o => {
          const statusText = I18n.t('order_status_' + mapStatus(o.status)) || o.status;
          html += `
            <div class="order-card" data-id="${o.id}">
              <div class="order-card-header">
                <strong>${SafeHTML.escape(o.restaurant_name || '')}</strong>
                <span class="order-status status-${mapStatus(o.status)}">${statusText}</span>
              </div>
              <div class="order-card-body">
                <span>${I18n.t('total')}: ${fmtPrice(o.total_cents)} ${currency}</span>
                <span>${I18n.t('order_date')}: ${new Date(o.created_at).toLocaleDateString()}</span>
              </div>
            </div>`;
        });
        container.innerHTML = html;

        container.querySelectorAll('.order-card').forEach(card => {
          card.addEventListener('click', () => {
            const id = card.dataset.id;
            const order = Store.orders.find(o => o.id === id);
            if (order) App.screens._showOrderDetail(order);
          });
        });
      } catch (e) {
        UI.showError(e.message, () => Screens.orders());
      }
    },

    _showOrderDetail(order) {
      const sheet = document.getElementById('orderDetailContent');
      if (!sheet) return;
      const currency = window.APP_CONFIG?.defaultCurrency || 'ر.س';
      const statusText = I18n.t('order_status_' + mapStatus(order.status)) || order.status;
      const items = Store.menu.filter(m => order.id); // approximate

      sheet.innerHTML = `
        <div style="margin-bottom:16px">
          <strong>${SafeHTML.escape(order.restaurant_name || '')}</strong><br>
          <span>${I18n.t('status')}: ${statusText}</span><br>
          <span>${I18n.t('total_paid')}: ${fmtPrice(order.total_cents)} ${currency}</span><br>
          <span>${I18n.t('delivery_fee')}: ${fmtPrice(order.delivery_fee_cents)} ${currency}</span><br>
          <span>${I18n.t('order_date')}: ${new Date(order.created_at).toLocaleString()}</span><br>
          <span>${I18n.t('address_unavailable')}: ${SafeHTML.escape(order.delivery_address || '')}</span>
        </div>
        ${order.status === 'new' || order.status === 'accepted_by_restaurant' ? `<button class="btn-danger" id="cancelOrderBtn">${I18n.t('cancel')}</button>` : ''}
      `;
      document.getElementById('cancelOrderBtn')?.addEventListener('click', async () => {
        if (!confirm(I18n.t('confirm_cancel'))) return;
        try {
          await api.post(`/orders/${order.id}/cancel`, {});
          UI.showToast(I18n.t('order_cancelled'), 'success');
          UI.closeSheet('orderDetailSheet');
          Screens.orders();
        } catch (e) {
          UI.showToast(e.message, 'error');
        }
      });
      UI.openSheet('orderDetailSheet');
    },

    tracking() {
      if (Store.currentOrder) {
        if (Store.userLocation) {
          MapService.init(Store.userLocation.lat, Store.userLocation.lng);
        }
        UI.openTracking(Store.currentOrder);
        this._fetchDriverLocation(Store.currentOrder.id);
      } else {
        UI.showEmpty(I18n.t('no_active_order'));
      }
    },

    async _fetchDriverLocation(orderId) {
      if (!orderId) return;
      try {
        const res = await api.get(`/tracking/order/${orderId}`);
        if (res) {
          const data = res.data || res;
          if (data.lat && data.lng) {
            MapService.init(data.lat, data.lng);
            MapService.updateDriverLocation(data.lat, data.lng);
            if (Store.currentOrder) {
              Store.currentOrder.eta_min = data.eta_min || Store.currentOrder.eta_min;
              this._renderTrackingDetail();
            }
          }
        }
      } catch (_) {}
    },

    _renderTrackingDetail() {
      const statusEl = document.getElementById('trackingOrderStatus');
      const detailsEl = document.getElementById('trackingOrderDetails');
      const confirmBtn = document.getElementById('confirmDeliveryBtn');
      if (!Store.currentOrder) {
        statusEl.textContent = I18n.t('no_active_order');
        detailsEl.textContent = I18n.t('tracking_placeholder');
        if (confirmBtn) confirmBtn.classList.add('hidden');
        return;
      }
      const simpleStatus = mapStatus(Store.currentOrder.status);
      const statusKey = `order_status_${simpleStatus}`;
      const statusText = I18n.t(statusKey) || Store.currentOrder.status;
      statusEl.textContent = `#${Store.currentOrder.id.substring(0, 8)} - ${statusText}`;
      detailsEl.textContent = `${I18n.t('estimated_time')}: ${Store.currentOrder.eta_min || '--'} ${I18n.t('min')}`;
      if (confirmBtn) {
        if (Store.currentOrder.status === 'on_the_way') {
          confirmBtn.classList.remove('hidden');
        } else {
          confirmBtn.classList.add('hidden');
        }
      }
    },

    async wallet() {
      UI.showLoading();
      try {
        const res = await api.get('/wallet');
        Store.wallet = res.wallet || null;
        Store.walletTx = res.transactions || [];
        const container = document.getElementById('appContent');
        const currency = window.APP_CONFIG?.defaultCurrency || 'ر.س';

        let html = '';
        if (Store.wallet) {
          html += `
            <div class="wallet-card">
              <div class="wallet-balance">${fmtPrice(Store.wallet.balance_cents || 0)} ${currency}</div>
              <div class="wallet-label">${I18n.t('wallet_balance')}</div>
              <div class="wallet-pending">${I18n.t('wallet_pending')}: ${fmtPrice(Store.wallet.pending_cents || 0)} ${currency}</div>
            </div>`;
        }

        if (!Store.walletTx.length) {
          html += `<p style="text-align:center;margin-top:40px;color:var(--text-secondary)">${I18n.t('wallet_empty')}</p>`;
        } else {
          const credits = Store.walletTx.filter(tx => tx.type === 'credit').reduce((s, t) => s + (t.amount_cents || 0), 0);
          const debits = Store.walletTx.filter(tx => tx.type === 'debit').reduce((s, t) => s + (t.amount_cents || 0), 0);
          const total = credits + debits;
          const creditPct = total > 0 ? (credits / total * 100).toFixed(1) : 50;
          html += `<div class="wallet-chart">
            <div class="wallet-chart-bar">
              <div style="display:flex;height:24px;border-radius:12px;overflow:hidden;background:var(--border)">
                <div style="width:${creditPct}%;background:var(--success);transition:width 0.5s"></div>
                <div style="width:${(100 - creditPct)}%;background:var(--danger);transition:width 0.5s"></div>
              </div>
              <div style="display:flex;justify-content:space-between;font-size:0.8rem;margin-top:4px;color:var(--text-secondary)">
                <span>${I18n.t('order_income')}: ${fmtPrice(credits)} ${currency}</span>
                <span>${I18n.t('order_spending')}: ${fmtPrice(debits)} ${currency}</span>
              </div>
            </div>
          </div>`;
          html += `<h4 style="margin:24px 0 12px">${I18n.t('transaction_history')}</h4>`;
          Store.walletTx.forEach(tx => {
            html += `
              <div class="tx-item">
                <span>${SafeHTML.escape(tx.note || '')}</span>
                <span style="color:${tx.type === 'credit' ? 'var(--success)' : 'var(--danger)'}">
                  ${tx.type === 'credit' ? '+' : '-'}${fmtPrice(tx.amount_cents)} ${currency}
                </span>
              </div>`;
          });
        }
        container.innerHTML = html;
      } catch (e) {
        UI.showError(e.message, () => Screens.wallet());
      }
    },

    profile() {
      const container = document.getElementById('appContent');
      const currency = window.APP_CONFIG?.defaultCurrency || 'ر.س';
      let html = '';
      if (Store.user) {
        html = `
          <div class="profile-card">
            <div class="profile-avatar">👤</div>
            <h3>${SafeHTML.escape(Store.user.name)}</h3>
            <p>${SafeHTML.escape(Store.user.email || '')}</p>
          </div>
          <button class="btn-secondary" id="ordersHistoryBtn" style="width:100%;margin-bottom:12px">${I18n.t('orders_history')}</button>
          <button class="btn-secondary" id="notificationsBtn" style="width:100%;margin-bottom:12px">${I18n.t('notifications')}</button>
          <button class="btn-danger" id="logoutBtn" style="width:100%">${I18n.t('logout')}</button>`;
      } else {
        html = `
          <div style="text-align:center;padding:40px 0">
            <button class="btn-primary" id="showLoginBtn" style="width:100%;margin-bottom:12px">${I18n.t('auth_title')}</button>
            <button class="btn-secondary" id="guestModeBtn" style="width:100%">${I18n.t('guest_btn')}</button>
          </div>`;
      }
      container.innerHTML = html;

      document.getElementById('logoutBtn')?.addEventListener('click', () => Auth.logout());
      document.getElementById('showLoginBtn')?.addEventListener('click', () => UI.openSheet('authSheet'));
      document.getElementById('guestModeBtn')?.addEventListener('click', () => Auth.guest());
      document.getElementById('ordersHistoryBtn')?.addEventListener('click', () => App.router.navigate('orders'));
      document.getElementById('notificationsBtn')?.addEventListener('click', () => Screens._showNotifications());
    },

    async _showNotifications() {
      try {
        const res = await api.get('/notifications');
        Store.notifications = Array.isArray(res) ? res : (res.data || res.notifications || []);
        const sheet = document.getElementById('orderDetailContent');
        if (!sheet) return;
        if (!Store.notifications.length) {
          sheet.innerHTML = `<p style="text-align:center">${I18n.t('no_notifications')}</p>`;
        } else {
          sheet.innerHTML = Store.notifications.map(n => `
            <div class="tx-item" style="${n.is_read ? '' : 'font-weight:600'}">
              <div>
                <div>${SafeHTML.escape(n.title || '')}</div>
                <small>${SafeHTML.escape(n.body || '')}</small>
              </div>
              <small>${new Date(n.created_at).toLocaleDateString()}</small>
            </div>
          `).join('');
        }
        document.getElementById('orderDetailTitle').textContent = I18n.t('notifications');
        UI.openSheet('orderDetailSheet');
      } catch (e) {
        UI.showToast(e.message, 'error');
      }
    }
  };

  const Cart = {
    add(item) {
      const existing = Store.cart.find(i => i.id === item.id);
      if (existing) {
        existing.quantity++;
      } else {
        Store.cart.push({ ...item, quantity: 1 });
      }
      persistCartAndRestaurant();
      this._updateBadge();
      UI.showToast(`${item.name} ${I18n.t('added')}`, 'success');
    },

    updateQuantity(index, delta) {
      if (!Store.cart[index]) return;
      Store.cart[index].quantity += delta;
      if (Store.cart[index].quantity <= 0) {
        Store.cart.splice(index, 1);
        if (Store.cart.length === 0) {
          Store.currentRestaurant = null;
        }
      }
      persistCartAndRestaurant();
      this._updateBadge();
      App.router.refresh();
    },

    _updateBadge() {
      const badge = document.getElementById('cartBadge');
      const count = Store.cart.reduce((sum, i) => sum + i.quantity, 0);
      if (badge) {
        badge.textContent = count;
        badge.classList.toggle('hidden', count === 0);
      }
    }
  };

  const Checkout = {
    isPlacing: false,
    currentQuote: null,

    async render() {
      try {
        const [addrRes] = await Promise.all([
          api.get('/profile/addresses')
        ]);
        Store.addresses = Array.isArray(addrRes) ? addrRes : (addrRes.data || addrRes || []);
        const select = document.getElementById('checkoutAddressSelect');
        select.innerHTML = Store.addresses.map(a =>
          `<option value="${SafeHTML.escape(a.name)}">${SafeHTML.escape(a.name)}</option>`
        ).join('');

        const quoteRes = await api.post('/orders/quote', {
          restaurant_id: Store.currentRestaurant,
          items: Store.cart.map(i => ({ menu_item_id: i.id, quantity: i.quantity }))
        });
        this.currentQuote = quoteRes.data || quoteRes;
        const currency = window.APP_CONFIG?.defaultCurrency || 'ر.س';
        const sub = this.currentQuote.subtotal || 0;
        const delivery = this.currentQuote.delivery_fee || 0;
        const service = this.currentQuote.service_fee || 0;
        const total = this.currentQuote.total || (sub + delivery + service);

        document.getElementById('checkoutTotal').innerHTML = `
          <div style="display:flex;justify-content:space-between">${I18n.t('total')}: ${fmtPrice(sub)} ${currency}</div>
          <small style="display:flex;justify-content:space-between">${I18n.t('delivery_fee')}: ${fmtPrice(delivery)} ${currency}</small>
          <small style="display:flex;justify-content:space-between">${I18n.t('service_fee')}: ${fmtPrice(service)} ${currency}</small>
          <hr>
          <strong style="display:flex;justify-content:space-between">${I18n.t('total')}: ${fmtPrice(total)} ${currency}</strong>`;
      } catch (e) {
        UI.showToast(e.message, 'error');
      }

      document.getElementById('applyCouponBtn').onclick = () => this._applyCoupon();
      document.getElementById('confirmOrderBtn').onclick = () => this.confirm();
    },

    async _applyCoupon() {
      const code = document.getElementById('couponCode').value.trim();
      if (!code) return;
      try {
        const subtotal = Store.cart.reduce((s, i) => s + i.price_cents * i.quantity, 0);
        const res = await api.post('/coupons/validate', { code, subtotalCents: subtotal });
        this.currentQuote = this.currentQuote || {};
        this.currentQuote.discount = res.discountCents || 0;
        UI.showToast(`${I18n.t('coupon_applied')}: ${fmtPrice(res.discountCents)}`, 'success');
        // re-render totals
        const currency = window.APP_CONFIG?.defaultCurrency || 'ر.س';
        const sub = subtotal;
        const delivery = this.currentQuote.delivery_fee || 0;
        const service = this.currentQuote.service_fee || 0;
        const discount = this.currentQuote.discount || 0;
        const total = sub + delivery + service - discount;
        document.getElementById('checkoutTotal').innerHTML = `
          <div style="display:flex;justify-content:space-between">${I18n.t('total')}: ${fmtPrice(sub)} ${currency}</div>
          <small style="display:flex;justify-content:space-between">${I18n.t('delivery_fee')}: ${fmtPrice(delivery)} ${currency}</small>
          <small style="display:flex;justify-content:space-between">${I18n.t('service_fee')}: ${fmtPrice(service)} ${currency}</small>
          <small style="display:flex;justify-content:space-between;color:var(--success)">${I18n.t('discount')}: -${fmtPrice(discount)} ${currency}</small>
          <hr>
          <strong style="display:flex;justify-content:space-between">${I18n.t('total')}: ${fmtPrice(total)} ${currency}</strong>`;
      } catch (e) {
        UI.showToast(e.message, 'error');
      }
    },

    async confirm() {
      if (this.isPlacing) return;
      if (!Store.cart.length) { UI.showToast(I18n.t('cart_empty_error'), 'error'); return; }
      if (!Store.currentRestaurant) { UI.showToast(I18n.t('restaurant_missing'), 'error'); return; }

      const addressSelect = document.getElementById('checkoutAddressSelect');
      const addressText = addressSelect.value;
      if (!addressText) { UI.showToast(I18n.t('address_required'), 'error'); return; }

      const payment = document.getElementById('paymentMethodSelect').value;
      const notes = document.getElementById('orderNotes').value;
      const coupon = document.getElementById('couponCode').value;

      const orderData = {
        restaurant_id: Store.currentRestaurant,
        delivery_address: addressText,
        payment_method: payment,
        delivery_note: notes || '',
        coupon_code: coupon || null,
        items: Store.cart.map(i => ({ menu_item_id: i.id, quantity: i.quantity }))
      };

      const confirmBtn = document.getElementById('confirmOrderBtn');
      confirmBtn.disabled = true;
      confirmBtn.textContent = I18n.t('order_placing');
      this.isPlacing = true;

      try {
        const res = await api.post('/orders', orderData);
        const order = res.data || res;
        Store.currentOrder = order;
        Store.cart = [];
        Store.currentRestaurant = null;
        persistCartAndRestaurant();
        Cart._updateBadge();
        UI.closeSheet('checkoutSheet');
        UI.showToast(I18n.t('order_success'), 'success');
        App.router.navigate('tracking');
        WsService.init(Store.currentOrder.id);
      } catch (e) {
        UI.showToast(e.message, 'error');
      } finally {
        confirmBtn.disabled = false;
        confirmBtn.textContent = I18n.t('confirm_order');
        this.isPlacing = false;
      }
    }
  };

  const App = {
    router: null,
    screens: Screens,
    cart: Cart,
    checkout: Checkout,
    auth: Auth,

    async init() {
      this.router = new Router();
      I18n.setLang(I18n._lang);
      Auth._setupBindings();
      await Auth.fetchUser();

      let geocodePending = false;
      GPSService.watchPosition(async (coords) => {
        Store.userLocation = coords;
        const addressLine = document.getElementById('userAddressLine');
        if (addressLine && !geocodePending) {
          geocodePending = true;
          addressLine.textContent = I18n.t('locating');
          const readable = await GPSService.reverseGeocode(coords.lat, coords.lng);
          if (readable) Store.userAddress = readable;
          if (readable) addressLine.textContent = readable;
          geocodePending = false;
        }
        MapService.updateUserLocation(coords.lat, coords.lng);
      });

      this._attachEvents();
      this.router.navigate('home');
    },

    _attachEvents() {
      document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.router.navigate(btn.dataset.tab);
        });
      });

      document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          I18n.setLang(btn.dataset.lang);
          document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        });
      });

      document.getElementById('filterToggleBtn')?.addEventListener('click', () => {
        document.getElementById('filterPanel').classList.toggle('hidden');
      });

      document.getElementById('categorySelect')?.addEventListener('change', (e) => {
        Store.filters.category = e.target.value;
        Screens._renderRestaurantList();
      });
      document.getElementById('sortSelect')?.addEventListener('change', (e) => {
        Store.filters.sort = e.target.value;
        Screens._renderRestaurantList();
      });

      document.getElementById('searchInput')?.addEventListener('input', (e) => {
        Screens._renderRestaurantList(e.target.value);
      });

      document.querySelectorAll('.close-sheet').forEach(btn => {
        btn.addEventListener('click', () => {
          UI.closeSheet(btn.dataset.sheet);
        });
      });

      document.getElementById('locationTrigger')?.addEventListener('click', () => UI.openSheet('addressSheet'));

      document.getElementById('doLoginBtn')?.addEventListener('click', () => {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        Auth.login(email, password);
      });

      document.getElementById('guestModeBtn')?.addEventListener('click', () => Auth.guest());

      document.getElementById('addNewAddressBtn')?.addEventListener('click', () => UI.openSheet('newAddressSheet'));
      document.getElementById('saveAddressBtn')?.addEventListener('click', async () => {
        const name = document.getElementById('newAddressName').value;
        const details = document.getElementById('newAddressDetails').value;
        try {
          await api.post('/profile/addresses', { name, details });
          UI.closeSheet('newAddressSheet');
          UI.showToast(I18n.t('address_saved'), 'success');
        } catch (e) {
          UI.showToast(e.message, 'error');
        }
      });

      document.getElementById('useCurrentLocationBtn')?.addEventListener('click', async () => {
        try {
          const pos = await GPSService.getCurrentPosition();
          const address = await GPSService.reverseGeocode(pos.lat, pos.lng);
          document.getElementById('newAddressDetails').value = address;
        } catch (e) {
          UI.showToast(I18n.t('location_denied'), 'error');
        }
      });

      document.getElementById('confirmDeliveryBtn')?.addEventListener('click', async () => {
        if (!Store.currentOrder) return;
        try {
          await api.post(`/orders/${Store.currentOrder.id}/delivered`, {});
          Store.currentOrder.status = 'completed';
          UI.showToast('تم تأكيد الاستلام', 'success');
          Screens._renderTrackingDetail();
        } catch (e) {
          UI.showToast(e.message, 'error');
        }
      });
    }
  };

  document.addEventListener('DOMContentLoaded', () => App.init());

})();
