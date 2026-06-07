(function () {
  'use strict';

  const I18n = {
    _lang: localStorage.getItem('app_lang') || 'ar',
    _data: {
      ar: {
        app_title: 'Fairfood Price',
        loading: 'جاري التحميل…',
        locating: 'تحديد الموقع…',
        nav_home: 'الرئيسية',
        nav_cart: 'السلة',
        nav_tracking: 'التتبع',
        nav_profile: 'حسابي',
        search_placeholder: 'ابحث عن مطعم أو وجبة…',
        all_categories: 'جميع التصنيفات',
        sort_rating: 'الأعلى تقييمًا',
        sort_time: 'أسرع توصيل',
        sort_fee: 'الأقل رسومًا',
        no_results: 'لا توجد نتائج',
        add_to_cart: 'أضف',
        place_order: 'تأكيد الطلب',
        empty_cart: 'السلة فارغة',
        confirm_order: 'تأكيد الطلب',
        delivery_address_label: 'عنوان التوصيل',
        payment_method_label: 'طريقة الدفع',
        order_notes_label: 'ملاحظات للمطعم',
        order_notes_placeholder: 'مثال: بدون بصل، الرجاء الاتصال عند الوصول',
        coupon_label: 'كود الخصم',
        coupon_placeholder: 'أدخل الكود',
        apply_coupon: 'تطبيق',
        add_address: '+ إضافة عنوان جديد',
        address_name_label: 'اسم العنوان',
        address_name_placeholder: 'مثال: المنزل',
        address_details_label: 'العنوان التفصيلي',
        address_details_placeholder: 'الشارع، رقم المبنى، المدينة',
        use_current_location: 'استخدام موقعي الحالي',
        save_address: 'حفظ العنوان',
        auth_title: 'تسجيل الدخول',
        email_label: 'البريد الإلكتروني',
        password_label: 'كلمة المرور',
        login_btn: 'دخول',
        guest_btn: 'متابعة كزائر',
        no_active_order: 'لا يوجد طلب نشط',
        tracking_placeholder: 'سيظهر التتبع هنا بعد تأكيد الطلب.',
        error_network: 'خطأ في الاتصال بالخادم',
        error_general: 'حدث خطأ ما',
        retry: 'إعادة المحاولة',
        logout: 'تسجيل الخروج',
        order_success: 'تم تقديم طلبك بنجاح!',
        free_delivery: 'توصيل مجاني',
        back: 'رجوع',
        total: 'الإجمالي',
        added: 'تمت الإضافة',
        order_status_pending: 'قيد الانتظار',
        order_status_accepted: 'تم القبول',
        order_status_preparing: 'قيد التحضير',
        order_status_ready: 'جاهز',
        order_status_picked_up: 'في الطريق',
        order_status_delivered: 'تم التوصيل',
        delivery_fee: 'رسوم التوصيل',
        service_fee: 'رسوم الخدمة',
        address_required: 'يرجى اختيار عنوان التوصيل',
        cart_empty_error: 'السلة فارغة',
        restaurant_missing: 'الرجاء اختيار مطعم أولاً',
        order_placing: 'جارٍ تأكيد الطلب…',
        location_denied: 'تعذر الوصول للموقع',
        auth_welcome: 'أهلاً بك!',
        guest_welcome: 'وضع الزائر',
        address_saved: 'تم حفظ العنوان',
        estimated_time: 'الوقت المقدر',
        map_unavailable: 'الخريطة غير متاحة حاليًا',
        address_unavailable: 'العنوان غير متاح',
        invalid_quote: 'عرض سعر غير صالح، يرجى إعادة المحاولة'
      },
      en: {
        app_title: 'Fairfood Price',
        loading: 'Loading…',
        locating: 'Locating…',
        nav_home: 'Home',
        nav_cart: 'Cart',
        nav_tracking: 'Tracking',
        nav_profile: 'Profile',
        search_placeholder: 'Search restaurants or dishes…',
        all_categories: 'All Categories',
        sort_rating: 'Top Rated',
        sort_time: 'Fastest Delivery',
        sort_fee: 'Lowest Fee',
        no_results: 'No results',
        add_to_cart: 'Add',
        place_order: 'Place Order',
        empty_cart: 'Cart is empty',
        confirm_order: 'Confirm Order',
        delivery_address_label: 'Delivery Address',
        payment_method_label: 'Payment Method',
        order_notes_label: 'Notes for Restaurant',
        order_notes_placeholder: 'e.g. No onions, please call on arrival',
        coupon_label: 'Promo Code',
        coupon_placeholder: 'Enter code',
        apply_coupon: 'Apply',
        add_address: '+ Add New Address',
        address_name_label: 'Address Name',
        address_name_placeholder: 'e.g. Home',
        address_details_label: 'Full Address',
        address_details_placeholder: 'Street, Building, City',
        use_current_location: 'Use My Current Location',
        save_address: 'Save Address',
        auth_title: 'Sign In',
        email_label: 'Email',
        password_label: 'Password',
        login_btn: 'Sign In',
        guest_btn: 'Continue as Guest',
        no_active_order: 'No Active Order',
        tracking_placeholder: 'Tracking will appear after order confirmation.',
        error_network: 'Network error',
        error_general: 'Something went wrong',
        retry: 'Retry',
        logout: 'Log out',
        order_success: 'Your order has been placed!',
        free_delivery: 'Free delivery',
        back: 'Back',
        total: 'Total',
        added: 'Added',
        order_status_pending: 'Pending',
        order_status_accepted: 'Accepted',
        order_status_preparing: 'Preparing',
        order_status_ready: 'Ready',
        order_status_picked_up: 'On the way',
        order_status_delivered: 'Delivered',
        delivery_fee: 'Delivery fee',
        service_fee: 'Service fee',
        address_required: 'Please select a delivery address',
        cart_empty_error: 'Cart is empty',
        restaurant_missing: 'Please select a restaurant first',
        order_placing: 'Placing order…',
        location_denied: 'Location access denied',
        auth_welcome: 'Welcome!',
        guest_welcome: 'Guest mode',
        address_saved: 'Address saved',
        estimated_time: 'Estimated time',
        map_unavailable: 'Map not available',
        address_unavailable: 'Address unavailable',
        invalid_quote: 'Invalid quote, please try again'
      },
      de: {
        app_title: 'Fairfood Price',
        loading: 'Lädt…',
        locating: 'Standort wird ermittelt…',
        nav_home: 'Startseite',
        nav_cart: 'Warenkorb',
        nav_tracking: 'Sendung',
        nav_profile: 'Konto',
        search_placeholder: 'Restaurants oder Gerichte suchen…',
        all_categories: 'Alle Kategorien',
        sort_rating: 'Bestbewertet',
        sort_time: 'Schnellste Lieferung',
        sort_fee: 'Niedrigste Gebühr',
        no_results: 'Keine Ergebnisse',
        add_to_cart: 'Hinzufügen',
        place_order: 'Bestellung aufgeben',
        empty_cart: 'Warenkorb leer',
        confirm_order: 'Bestellung bestätigen',
        delivery_address_label: 'Lieferadresse',
        payment_method_label: 'Zahlungsmethode',
        order_notes_label: 'Anmerkungen zum Restaurant',
        order_notes_placeholder: 'z. B. Keine Zwiebeln, bitte bei Ankunft anrufen',
        coupon_label: 'Gutscheincode',
        coupon_placeholder: 'Code eingeben',
        apply_coupon: 'Einlösen',
        add_address: '+ Neue Adresse hinzufügen',
        address_name_label: 'Adressname',
        address_name_placeholder: 'z. B. Zuhause',
        address_details_label: 'Vollständige Adresse',
        address_details_placeholder: 'Straße, Gebäude, Stadt',
        use_current_location: 'Meinen Standort verwenden',
        save_address: 'Adresse speichern',
        auth_title: 'Anmelden',
        email_label: 'E‑Mail',
        password_label: 'Passwort',
        login_btn: 'Anmelden',
        guest_btn: 'Als Gast fortfahren',
        no_active_order: 'Keine aktive Bestellung',
        tracking_placeholder: 'Tracking erscheint nach Bestellbestätigung.',
        error_network: 'Netzwerkfehler',
        error_general: 'Ein Fehler ist aufgetreten',
        retry: 'Wiederholen',
        logout: 'Abmelden',
        order_success: 'Ihre Bestellung wurde aufgegeben!',
        free_delivery: 'Kostenlose Lieferung',
        back: 'Zurück',
        total: 'Gesamt',
        added: 'Hinzugefügt',
        order_status_pending: 'Ausstehend',
        order_status_accepted: 'Akzeptiert',
        order_status_preparing: 'Wird zubereitet',
        order_status_ready: 'Bereit',
        order_status_picked_up: 'Unterwegs',
        order_status_delivered: 'Geliefert',
        delivery_fee: 'Liefergebühr',
        service_fee: 'Servicegebühr',
        address_required: 'Bitte wählen Sie eine Lieferadresse',
        cart_empty_error: 'Warenkorb leer',
        restaurant_missing: 'Bitte wählen Sie ein Restaurant',
        order_placing: 'Bestellung wird aufgegeben…',
        location_denied: 'Standortzugriff verweigert',
        auth_welcome: 'Willkommen!',
        guest_welcome: 'Gastmodus',
        address_saved: 'Adresse gespeichert',
        estimated_time: 'Voraussichtliche Zeit',
        map_unavailable: 'Karte nicht verfügbar',
        address_unavailable: 'Adresse nicht verfügbar',
        invalid_quote: 'Ungültiges Angebot, bitte versuche es erneut'
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
        const translation = this.t(key);
        if (translation) el.textContent = translation;
      });
      document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        const translation = this.t(key);
        if (translation) el.placeholder = translation;
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

      const token = localStorage.getItem('token') || localStorage.getItem('ff_token');
      if (token) headers.Authorization = `Bearer ${token}`;

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
    filters: { category: '', sort: 'rating' },
    map: null,
    socket: null,
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
        btn.classList.toggle('active', btn.dataset.tab === this.current);
      });
    }

    _renderScreen(screen, params) {
      UI.closeSheet('addressSheet');
      UI.closeSheet('checkoutSheet');
      UI.closeSheet('newAddressSheet');
      UI.closeSheet('authSheet');
      UI.closeTracking();

      switch (screen) {
        case 'home': App.screens.home(); break;
        case 'restaurant': App.screens.restaurant(params); break;
        case 'cart': App.screens.cart(); break;
        case 'tracking': App.screens.tracking(); break;
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

    openTracking(order) {
      Store.currentOrder = order;
      const container = document.getElementById('trackingContainer');
      container.classList.remove('hidden');
      void container.offsetWidth;
      container.classList.add('open');
      App.screens._renderTrackingDetail();
    },

    closeTracking() {
      const container = document.getElementById('trackingContainer');
      container.classList.remove('open');
      setTimeout(() => container.classList.add('hidden'), 300);
    }
  };

  const Auth = {
    async login(email, password) {
      const res = await api.post('/auth/login', { email, password });
      Store.token = res.token;
      localStorage.setItem('token', res.token);
      Store.user = res.user;
      UI.closeSheet('authSheet');
      UI.showToast(I18n.t('auth_welcome'), 'success');
      App.router.navigate('home');
    },

    async guest() {
      const res = await api.post('/auth/guest', {});
      Store.token = res.token;
      localStorage.setItem('token', res.token);
      Store.user = null;
      UI.closeSheet('authSheet');
      UI.showToast(I18n.t('guest_welcome'), 'success');
      App.router.navigate('home');
    },

    logout() {
      Store.token = null;
      localStorage.removeItem('token');
      Store.user = null;
      GPSService.clearWatch();
      App.router.navigate('home');
      UI.showToast(I18n.t('logout'), 'success');
    },

    async fetchUser() {
      if (Store.token) {
        try {
          const res = await api.get('/customer?action=me');
          Store.user = res.data || res;
        } catch (e) { }
      }
    }
  };

  const GPSService = {
    getCurrentPosition() {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error('Geolocation not supported'));
        }
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
          (err) => reject(err),
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
      });
    },

    watchPosition(callback) {
      if (Store.watchId) navigator.geolocation.clearWatch(Store.watchId);
      Store.watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          Store.userLocation = coords;
          callback(coords);
        },
        (err) => console.warn('GPS error', err),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    },

    clearWatch() {
      if (Store.watchId) {
        navigator.geolocation.clearWatch(Store.watchId);
        Store.watchId = null;
      }
    },

    async reverseGeocode(lat, lng) {
      try {
        const res = await api.get(`/geo/reverse?lat=${lat}&lng=${lng}`);
        return res.data?.display_name || I18n.t('address_unavailable');
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
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '©️ OpenStreetMap'
        }).addTo(Store.map);
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

  const SocketService = {
    init(orderId) {
      if (!window.io) return;
      if (Store.socket) Store.socket.disconnect();
      const socketUrl = window.APP_CONFIG?.socketUrl || window.location.origin;
      Store.socket = io(socketUrl, {
        auth: { token: Store.token }
      });

      Store.socket.on('connect', () => {
        if (orderId) {
          Store.socket.emit('order:join', { order_id: orderId });
        }
      });

      Store.socket.on('order:status', (data) => {
        if (Store.currentOrder && data.order_id === Store.currentOrder.id) {
          Store.currentOrder.status = data.status;
          if (App.router.current === 'tracking') {
            App.screens._renderTrackingDetail();
          }
        }
      });

      Store.socket.on('driver:location', (data) => {
        if (Store.currentOrder && data.order_id === Store.currentOrder.id) {
          MapService.updateDriverLocation(data.lat, data.lng);
        }
      });
    }
  };

  const Screens = {
    async home() {
      UI.showLoading();
      try {
        const [restRes, catRes] = await Promise.all([
          api.get('/catalog?action=restaurants'),
          api.get('/catalog?action=categories')
        ]);
        Store.restaurants = restRes.restaurants || restRes.items || restRes.data || restRes || [];
        Store.categories = catRes.categories || catRes.data || catRes || [];

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
        list = list.filter(r => r.category_id == Store.filters.category);
      }
      if (filter) {
        list = list.filter(r => r.name.toLowerCase().includes(filter.toLowerCase()));
      }
      list.sort((a, b) => {
        if (Store.filters.sort === 'rating') return (b.rating || 0) - (a.rating || 0);
        if (Store.filters.sort === 'deliveryTime') return (a.delivery_time || 99) - (b.delivery_time || 99);
        if (Store.filters.sort === 'deliveryFee') return (a.delivery_fee || 99) - (b.delivery_fee || 99);
        return 0;
      });

      const container = document.getElementById('appContent');
      if (!list.length) {
        UI.showEmpty(I18n.t('no_results'));
        return;
      }

      const currency = window.APP_CONFIG?.defaultCurrency || '€';
      let html = '';
      list.forEach(r => {
        const name = SafeHTML.escape(r.name);
        const logo = r.logo_url ? `<img src="${SafeHTML.escape(r.logo_url)}" alt="${name}">` : '🍽️';
        html += `
          <div class="restaurant-card" data-id="${r.id}">
            <div class="card-media">${logo}</div>
            <div class="card-body">
              <h3>${name}</h3>
              <div class="meta">
                <span>⭐ ${r.rating || '—'}</span>
                <span>${r.delivery_time || '—'} min</span>
                <span>${r.delivery_fee ? r.delivery_fee + ' ' + currency : I18n.t('free_delivery')}</span>
              </div>
            </div>
          </div>`;
      });
      container.innerHTML = html;

      container.querySelectorAll('.restaurant-card').forEach(card => {
        card.addEventListener('click', () => {
          const id = card.dataset.id;
          App.router.navigate('restaurant', id);
        });
      });
    },

    async restaurant(restaurantId) {
      UI.showLoading();
      try {
        const res = await api.get(`/catalog?action=menu&restaurantId=${encodeURIComponent(restaurantId)}`);
        Store.currentRestaurant = restaurantId;
        persistCartAndRestaurant();
        Store.menu = res.items || res.menu || res.data || res || [];

        const currency = window.APP_CONFIG?.defaultCurrency || '€';
        const container = document.getElementById('appContent');
        let html = `<button class="btn-small back-btn">← ${I18n.t('back')}</button>`;
        Store.menu.forEach(item => {
          const name = SafeHTML.escape(item.name);
          const desc = SafeHTML.escape(item.description || '');
          const price = item.price;
          const img = item.image_url ? `<img src="${SafeHTML.escape(item.image_url)}" class="item-image" alt="${name}">` : '';
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
              App.cart.add({ id: item.id, name: item.name, price: item.price });
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
      const currency = window.APP_CONFIG?.defaultCurrency || '€';
      let html = '';
      let subtotal = 0;
      Store.cart.forEach((item, idx) => {
        const lineTotal = item.price * item.quantity;
        subtotal += lineTotal;
        html += `
          <div class="cart-item">
            <span>${SafeHTML.escape(item.name)}</span>
            <div class="cart-item-controls">
              <button class="qty-btn" data-idx="${idx}" data-delta="-1">−</button>
              <span>${item.quantity}</span>
              <button class="qty-btn" data-idx="${idx}" data-delta="1">+</button>
            </div>
            <span>${lineTotal.toFixed(2)} ${currency}</span>
          </div>`;
      });
      html += `<div class="cart-total">${I18n.t('total')}: ${subtotal.toFixed(2)} ${currency}</div>
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

    tracking() {
      if (Store.currentOrder) {
        if (Store.userLocation) {
          MapService.init(Store.userLocation.lat, Store.userLocation.lng);
        } else if (Store.currentOrder.driver_location) {
          MapService.init(
            Store.currentOrder.driver_location.lat,
            Store.currentOrder.driver_location.lng
          );
        }
        UI.openTracking(Store.currentOrder);
      } else {
        UI.showEmpty(I18n.t('no_active_order'));
      }
    },

    _renderTrackingDetail() {
      const statusEl = document.getElementById('trackingOrderStatus');
      const detailsEl = document.getElementById('trackingOrderDetails');
      if (!Store.currentOrder) {
        statusEl.textContent = I18n.t('no_active_order');
        detailsEl.textContent = I18n.t('tracking_placeholder');
        return;
      }
      const statusKey = `order_status_${Store.currentOrder.status}`;
      const statusText = I18n.t(statusKey) || Store.currentOrder.status;
      statusEl.textContent = `#${Store.currentOrder.id} - ${statusText}`;
      detailsEl.textContent = `${I18n.t('estimated_time')}: ${Store.currentOrder.estimated_time || '--'} min`;
    },

    profile() {
      const container = document.getElementById('appContent');
      let html = '';
      if (Store.user) {
        html = `<p>${SafeHTML.escape(Store.user.name)}</p>
                <button class="btn-secondary" id="logoutBtn">${I18n.t('logout')}</button>`;
      } else {
        html = `<button class="btn-primary" id="showLoginBtn">${I18n.t('auth_title')}</button>
                <button class="btn-secondary" id="guestModeBtn">${I18n.t('guest_btn')}</button>`;
      }
      container.innerHTML = html;

      document.getElementById('logoutBtn')?.addEventListener('click', () => Auth.logout());
      document.getElementById('showLoginBtn')?.addEventListener('click', () => UI.openSheet('authSheet'));
      document.getElementById('guestModeBtn')?.addEventListener('click', () => Auth.guest());
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
          api.get('/customer?action=addresses')
        ]);
        Store.addresses = addrRes.data || addrRes || [];
        const select = document.getElementById('checkoutAddressSelect');
        select.innerHTML = Store.addresses.map(a => `<option value="${a.id}">${SafeHTML.escape(a.name)}</option>`).join('');

        const quoteRes = await api.post('/orders/customer', {
          action: 'quote',
          restaurantId: Store.currentRestaurant,
          items: Store.cart.map(i => ({ menuItemId: i.id, quantity: i.quantity }))
        });
        this.currentQuote = quoteRes.data || quoteRes;
        const currency = window.APP_CONFIG?.defaultCurrency || '€';
        const sub = this.currentQuote.subtotal || 0;
        const delivery = this.currentQuote.delivery_fee || 0;
        const service = this.currentQuote.service_fee || 0;
        const total = this.currentQuote.total || (sub + delivery + service);

        document.getElementById('checkoutTotal').innerHTML = `
          <div>${I18n.t('total')}: ${sub.toFixed(2)} ${currency}</div>
          <small>${I18n.t('delivery_fee')}: ${delivery.toFixed(2)} ${currency}</small>
          <small>${I18n.t('service_fee')}: ${service.toFixed(2)} ${currency}</small>
          <strong>${I18n.t('total')}: ${total.toFixed(2)} ${currency}</strong>
        `;
      } catch (e) {
        UI.showToast(e.message, 'error');
      }

      document.getElementById('confirmOrderBtn').onclick = () => this.confirm();
    },

    async confirm() {
      if (this.isPlacing) return;
      if (!Store.cart.length) {
        UI.showToast(I18n.t('cart_empty_error'), 'error');
        return;
      }
      if (!Store.currentRestaurant) {
        UI.showToast(I18n.t('restaurant_missing'), 'error');
        return;
      }
      const addressSelect = document.getElementById('checkoutAddressSelect');
      const addressId = addressSelect.value;
      if (!addressId) {
        UI.showToast(I18n.t('address_required'), 'error');
        return;
      }

      const payment = document.getElementById('paymentMethodSelect').value;
      const notes = document.getElementById('orderNotes').value;
      const coupon = document.getElementById('couponCode').value;

      const orderData = {
        action: 'create',
        restaurantId: Store.currentRestaurant,
        deliveryAddress: Store.userAddress || document.getElementById('newAddressDetails')?.value || '',
        paymentMethod: payment,
        notes,
        couponCode: coupon || null,
        items: Store.cart.map(i => ({ menuItemId: i.id, quantity: i.quantity }))
      };

      const confirmBtn = document.getElementById('confirmOrderBtn');
      confirmBtn.disabled = true;
      confirmBtn.textContent = I18n.t('order_placing');
      this.isPlacing = true;

      try {
        const res = await api.post('/orders/customer', orderData);
        Store.currentOrder = res.data || res;
        Store.cart = [];
        Store.currentRestaurant = null;
        persistCartAndRestaurant();
        Cart._updateBadge();
        UI.closeSheet('checkoutSheet');
        UI.showToast(I18n.t('order_success'), 'success');
        App.router.navigate('tracking');
        SocketService.init(Store.currentOrder.id || Store.currentOrder.orderId || Store.currentOrder.order?.id);
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
      await Auth.fetchUser();

      GPSService.watchPosition(async (coords) => {
        Store.userLocation = coords;
        const addressLine = document.getElementById('userAddressLine');
        if (addressLine) {
          addressLine.textContent = I18n.t('locating');
          const readable = await GPSService.reverseGeocode(coords.lat, coords.lng);
          Store.userAddress = readable;
          addressLine.textContent = readable;
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
          await api.post('/customer', { action: 'address', name, details });
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
    }
  };

  document.addEventListener('DOMContentLoaded', () => App.init());

})();
