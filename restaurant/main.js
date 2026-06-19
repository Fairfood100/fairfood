(function () {
  'use strict';

  const CONFIG = window.APP_CONFIG || {
    apiBaseUrl: '/api/v1',
    socketUrl: window.location.origin,
    defaultLanguage: 'ar',
    defaultCurrency: '€'
  };

  const STORAGE = {
    token: 'fairfood_restaurant_token',
    lang: 'fairfood_restaurant_lang',
    theme: 'fairfood_restaurant_theme',
    restaurantId: 'fairfood_restaurant_id'
  };

  const state = {
    token: localStorage.getItem(STORAGE.token) || '',
    restaurantId: localStorage.getItem(STORAGE.restaurantId) || '',
    lang: localStorage.getItem(STORAGE.lang) || CONFIG.defaultLanguage || 'ar',
    theme: localStorage.getItem(STORAGE.theme) || 'light',
    currency: CONFIG.defaultCurrency || '€',
    activeTab: 'dashboard',
    socket: null,
    socketReady: false,
    restaurant: null,
    orders: [],
    newOrders: [],
    activeOrders: [],
    menuItems: [],
    categories: [],
    earnings: null,
    notifications: [],
    currentEditingItemId: null,
    installPrompt: null
  };

  const i18n = {
    ar: {
      app_title: 'Fairfood Price – مطعم',
      loading: 'جاري التحميل…',
      restaurant_name: 'اسم المطعم',
      status_open: 'مفتوح',
      status_closed: 'مغلق',
      tab_dashboard: 'الطلبات',
      tab_menu: 'المنيو',
      tab_earnings: 'الأرباح',
      tab_settings: 'الإعدادات',
      metric_new_orders: 'طلبات جديدة',
      metric_active_orders: 'قيد التحضير',
      metric_avg_prep_time: 'متوسط التحضير',
      minutes: 'دقيقة',
      new_orders_title: 'طلبات جديدة',
      active_orders_title: 'الطلبات الجارية',
      no_new_orders: 'لا توجد طلبات جديدة',
      no_active_orders: 'لا توجد طلبات جارية',
      menu_management_title: 'إدارة المنيو',
      add_menu_item: '+ إضافة صنف',
      all_categories: 'جميع التصنيفات',
      no_menu_items: 'المنيو فارغ',
      earnings_history: 'سجل الأرباح',
      no_earnings: 'لا توجد بيانات أرباح',
      working_hours: 'ساعات العمل',
      from: 'من',
      to: 'إلى',
      restaurant_open_toggle: 'المطعم مفتوح حالياً',
      notifications: 'الإشعارات',
      notify_new_orders: 'إشعارات الطلبات الجديدة',
      notify_status_change: 'إشعارات تغيير حالة الطلب',
      notify_driver_arrived: 'إشعار وصول السائق',
      restaurant_info: 'معلومات المطعم',
      restaurant_name_placeholder: 'اسم المطعم',
      phone_placeholder: 'رقم الهاتف',
      address_placeholder: 'العنوان',
      save_changes: 'حفظ التغييرات',
      driver_arriving: 'السائق في الطريق',
      add_menu_item_title: 'إضافة صنف',
      edit_menu_item_title: 'تعديل صنف',
      item_name: 'اسم الصنف',
      item_description: 'الوصف',
      item_price: 'السعر',
      item_available: 'متوفر',
      item_image: 'صورة الصنف',
      save_item: 'حفظ',
      cancel: 'إلغاء',
      order_details: 'تفاصيل الطلب',
      driver_handoff: 'تسليم للسائق',
      confirm_handoff: 'تأكيد التسليم',
      offline_warning: 'أنت غير متصل بالإنترنت',
      reconnecting: 'جارٍ إعادة الاتصال…',
      install_app: 'ثبّت التطبيق لتجربة أفضل',
      install: 'تثبيت',
      skip_to_content: 'تخطي إلى المحتوى',
      noscript_warning: 'يتطلب التطبيق تفعيل JavaScript.',
      accept: 'قبول',
      reject: 'رفض',
      ready: 'جاهز للتسليم',
      handoff: 'تسليم للسائق',
      view: 'عرض',
      edit: 'تعديل',
      delete: 'حذف',
      order: 'طلب',
      customer: 'العميل',
      total: 'الإجمالي',
      status: 'الحالة',
      prep_time: 'وقت التحضير',
      order_items: 'الأصناف',
      network_error: 'خطأ في الاتصال بالخادم',
      saved_successfully: 'تم الحفظ بنجاح',
      item_saved: 'تم حفظ الصنف',
      item_deleted: 'تم حذف الصنف',
      order_accepted: 'تم قبول الطلب',
      order_rejected: 'تم رفض الطلب',
      order_ready: 'تم تجهيز الطلب',
      handoff_confirmed: 'تم تأكيد التسليم',
      no_notifications: 'لا توجد إشعارات'
    },
    en: {
      app_title: 'Fairfood Price – Restaurant',
      loading: 'Loading…',
      restaurant_name: 'Restaurant name',
      status_open: 'Open',
      status_closed: 'Closed',
      tab_dashboard: 'Orders',
      tab_menu: 'Menu',
      tab_earnings: 'Earnings',
      tab_settings: 'Settings',
      metric_new_orders: 'New orders',
      metric_active_orders: 'Preparing',
      metric_avg_prep_time: 'Avg prep time',
      minutes: 'min',
      new_orders_title: 'New orders',
      active_orders_title: 'Active orders',
      no_new_orders: 'No new orders',
      no_active_orders: 'No active orders',
      menu_management_title: 'Menu management',
      add_menu_item: '+ Add item',
      all_categories: 'All categories',
      no_menu_items: 'Menu is empty',
      earnings_history: 'Earnings history',
      no_earnings: 'No earnings data',
      working_hours: 'Working hours',
      from: 'From',
      to: 'To',
      restaurant_open_toggle: 'Restaurant is currently open',
      notifications: 'Notifications',
      notify_new_orders: 'New order sound notifications',
      notify_status_change: 'Order status notifications',
      notify_driver_arrived: 'Driver arrived notification',
      restaurant_info: 'Restaurant information',
      restaurant_name_placeholder: 'Restaurant name',
      phone_placeholder: 'Phone number',
      address_placeholder: 'Address',
      save_changes: 'Save changes',
      driver_arriving: 'Driver is arriving',
      add_menu_item_title: 'Add item',
      edit_menu_item_title: 'Edit item',
      item_name: 'Item name',
      item_description: 'Description',
      item_price: 'Price',
      item_available: 'Available',
      item_image: 'Item image',
      save_item: 'Save',
      cancel: 'Cancel',
      order_details: 'Order details',
      driver_handoff: 'Driver handoff',
      confirm_handoff: 'Confirm handoff',
      offline_warning: 'You are offline',
      reconnecting: 'Reconnecting…',
      install_app: 'Install app for a better experience',
      install: 'Install',
      skip_to_content: 'Skip to content',
      noscript_warning: 'JavaScript is required.',
      accept: 'Accept',
      reject: 'Reject',
      ready: 'Ready',
      handoff: 'Handoff',
      view: 'View',
      edit: 'Edit',
      delete: 'Delete',
      order: 'Order',
      customer: 'Customer',
      total: 'Total',
      status: 'Status',
      prep_time: 'Prep time',
      order_items: 'Items',
      network_error: 'Network error',
      saved_successfully: 'Saved successfully',
      item_saved: 'Item saved',
      item_deleted: 'Item deleted',
      order_accepted: 'Order accepted',
      order_rejected: 'Order rejected',
      order_ready: 'Order ready',
      handoff_confirmed: 'Handoff confirmed',
      no_notifications: 'No notifications'
    },
    de: {
      app_title: 'Fairfood Price – Restaurant',
      loading: 'Lädt…',
      restaurant_name: 'Restaurantname',
      status_open: 'Geöffnet',
      status_closed: 'Geschlossen',
      tab_dashboard: 'Bestellungen',
      tab_menu: 'Speisekarte',
      tab_earnings: 'Einnahmen',
      tab_settings: 'Einstellungen',
      metric_new_orders: 'Neue Bestellungen',
      metric_active_orders: 'In Zubereitung',
      metric_avg_prep_time: 'Ø Zubereitung',
      minutes: 'Min.',
      new_orders_title: 'Neue Bestellungen',
      active_orders_title: 'Aktive Bestellungen',
      no_new_orders: 'Keine neuen Bestellungen',
      no_active_orders: 'Keine aktiven Bestellungen',
      menu_management_title: 'Speisekarte verwalten',
      add_menu_item: '+ Artikel hinzufügen',
      all_categories: 'Alle Kategorien',
      no_menu_items: 'Speisekarte ist leer',
      earnings_history: 'Einnahmenverlauf',
      no_earnings: 'Keine Einnahmendaten',
      working_hours: 'Öffnungszeiten',
      from: 'Von',
      to: 'Bis',
      restaurant_open_toggle: 'Restaurant ist geöffnet',
      notifications: 'Benachrichtigungen',
      notify_new_orders: 'Neue Bestellungen mit Ton',
      notify_status_change: 'Statusänderungen',
      notify_driver_arrived: 'Fahrer angekommen',
      restaurant_info: 'Restaurantinformationen',
      restaurant_name_placeholder: 'Restaurantname',
      phone_placeholder: 'Telefonnummer',
      address_placeholder: 'Adresse',
      save_changes: 'Änderungen speichern',
      driver_arriving: 'Fahrer ist unterwegs',
      add_menu_item_title: 'Artikel hinzufügen',
      edit_menu_item_title: 'Artikel bearbeiten',
      item_name: 'Artikelname',
      item_description: 'Beschreibung',
      item_price: 'Preis',
      item_available: 'Verfügbar',
      item_image: 'Artikelbild',
      save_item: 'Speichern',
      cancel: 'Abbrechen',
      order_details: 'Bestelldetails',
      driver_handoff: 'Übergabe an Fahrer',
      confirm_handoff: 'Übergabe bestätigen',
      offline_warning: 'Sie sind offline',
      reconnecting: 'Verbindung wird wiederhergestellt…',
      install_app: 'App für bessere Nutzung installieren',
      install: 'Installieren',
      skip_to_content: 'Zum Inhalt springen',
      noscript_warning: 'JavaScript ist erforderlich.',
      accept: 'Annehmen',
      reject: 'Ablehnen',
      ready: 'Bereit',
      handoff: 'Übergeben',
      view: 'Ansehen',
      edit: 'Bearbeiten',
      delete: 'Löschen',
      order: 'Bestellung',
      customer: 'Kunde',
      total: 'Gesamt',
      status: 'Status',
      prep_time: 'Zubereitungszeit',
      order_items: 'Artikel',
      network_error: 'Netzwerkfehler',
      saved_successfully: 'Erfolgreich gespeichert',
      item_saved: 'Artikel gespeichert',
      item_deleted: 'Artikel gelöscht',
      order_accepted: 'Bestellung angenommen',
      order_rejected: 'Bestellung abgelehnt',
      order_ready: 'Bestellung bereit',
      handoff_confirmed: 'Übergabe bestätigt',
      no_notifications: 'Keine Benachrichtigungen'
    }
  };

  const $ = (id) => document.getElementById(id);

  const dom = {
    loader: $('appLoader'),
    app: $('app'),
    restaurantName: $('restaurantName'),
    statusLabel: $('statusLabel'),
    onlineStatus: $('onlineStatus'),
    notificationsBtn: $('notificationsBtn'),
    notificationBadge: $('notificationBadge'),
    notificationDropdown: $('notificationDropdown'),
    notificationList: $('notificationList'),
    tabButtons: document.querySelectorAll('.tab-btn'),
    tabPanels: document.querySelectorAll('.tab-panel'),
    metricNewOrders: $('metricNewOrders'),
    metricActiveOrders: $('metricActiveOrders'),
    metricAvgPrepTime: $('metricAvgPrepTime'),
    newOrdersList: $('newOrdersList'),
    activeOrdersList: $('activeOrdersList'),
    emptyNewOrdersState: $('emptyNewOrdersState'),
    emptyActiveOrdersState: $('emptyActiveOrdersState'),
    menuItemsList: $('menuItemsList'),
    emptyMenuState: $('emptyMenuState'),
    menuCategoryFilter: $('menuCategoryFilter'),
    addMenuItemBtn: $('addMenuItemBtn'),
    earningsSummary: $('earningsSummary'),
    earningsCharts: $('earningsCharts'),
    earningsTableContainer: $('earningsTableContainer'),
    emptyEarningsState: $('emptyEarningsState'),
    branchSelectorGroup: $('branchSelectorGroup'),
    branchSelect: $('branchSelect'),
    openingTime: $('openingTime'),
    closingTime: $('closingTime'),
    restaurantOpenToggle: $('restaurantOpenToggle'),
    notifyNewOrders: $('notifyNewOrders'),
    notifyStatusChange: $('notifyStatusChange'),
    notifyDriverArrived: $('notifyDriverArrived'),
    restaurantNameInput: $('restaurantNameInput'),
    restaurantPhone: $('restaurantPhone'),
    restaurantAddress: $('restaurantAddress'),
    saveSettingsBtn: $('saveSettingsBtn'),
    driverInfoBar: $('driverInfoBar'),
    driverETA: $('driverETA'),
    menuItemModal: $('menuItemModal'),
    menuItemModalTitle: $('menuItemModalTitle'),
    itemName: $('itemName'),
    itemDescription: $('itemDescription'),
    itemPrice: $('itemPrice'),
    itemCategory: $('itemCategory'),
    itemAvailable: $('itemAvailable'),
    itemImage: $('itemImage'),
    saveMenuItemBtn: $('saveMenuItemBtn'),
    cancelMenuItemBtn: $('cancelMenuItemBtn'),
    modifiersContainer: $('modifiersContainer'),
    orderDetailsModal: $('orderDetailsModal'),
    orderDetailsContent: $('orderDetailsContent'),
    driverHandoffModal: $('driverHandoffModal'),
    driverHandoffContent: $('driverHandoffContent'),
    confirmHandoffBtn: $('confirmHandoffBtn'),
    overlay: $('overlay'),
    offlineBanner: $('offlineBanner'),
    reconnectBanner: $('reconnectBanner'),
    installAppBanner: $('installAppBanner'),
    installAppBtn: $('installAppBtn'),
    toastContainer: $('toastContainer'),
    ariaLiveRegion: $('ariaLiveRegion'),
    soundNewOrder: $('soundNewOrder'),
    soundUrgentOrder: $('soundUrgentOrder'),
    soundCancelledOrder: $('soundCancelledOrder'),
    soundDriverArrived: $('soundDriverArrived'),
    soundPickupConfirmed: $('soundPickupConfirmed')
  };

  function t(key) {
    return i18n[state.lang]?.[key] || i18n.en[key] || key;
  }

  function escapeHTML(value) {
    const div = document.createElement('div');
    div.textContent = value == null ? '' : String(value);
    return div.innerHTML;
  }

  function money(value) {
    const amount = Number(value || 0);
    return `${amount.toFixed(2)} ${state.currency || ''}`.trim();
  }

  function apiUrl(path) {
    return `${CONFIG.apiBaseUrl}${path}`;
  }

  async function apiRequest(path, options = {}) {
    const headers = {
      'Accept': 'application/json',
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...(options.headers || {})
    };

    if (state.token) {
      headers.Authorization = `Bearer ${state.token}`;
    }

    const response = await fetch(apiUrl(path), {
      ...options,
      headers
    });

    if (response.status === 401) {
      showToast(t('network_error'), 'error');
      throw new Error('Unauthorized');
    }

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(payload.message || `HTTP ${response.status}`);
    }

    return payload.data || payload;
  }

  function setHidden(el, hidden) {
    if (!el) return;
    el.classList.toggle('hidden', !!hidden);
    el.classList.toggle('is-hidden', !!hidden);
  }

  function showToast(message, type = 'info') {
    if (!dom.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    dom.toastContainer.appendChild(toast);

    if (dom.ariaLiveRegion) dom.ariaLiveRegion.textContent = message;

    setTimeout(() => {
      toast.remove();
    }, 4200);
  }

  function playSound(el) {
    if (!el) return;
    try {
      el.currentTime = 0;
      el.play().catch(() => {});
    } catch (_) {}
  }

  function applyLanguage(lang) {
    state.lang = i18n[lang] ? lang : 'ar';
    localStorage.setItem(STORAGE.lang, state.lang);

    document.documentElement.lang = state.lang;
    document.documentElement.dir = state.lang === 'ar' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      el.placeholder = t(el.dataset.i18nPlaceholder);
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
      el.setAttribute('aria-label', t(el.dataset.i18nAriaLabel));
    });

    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lang === state.lang);
    });
  }

  function applyTheme(theme) {
    state.theme = theme === 'dark' ? 'dark' : 'light';
    localStorage.setItem(STORAGE.theme, state.theme);
    document.body.classList.toggle('theme-dark', state.theme === 'dark');
    document.body.classList.toggle('theme-light', state.theme !== 'dark');
  }

  function openModal(modal) {
    if (!modal) return;
    modal.classList.remove('hidden', 'is-hidden');
    if (dom.overlay) dom.overlay.classList.remove('hidden', 'is-hidden');
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.add('hidden', 'is-hidden');
    if (dom.overlay) dom.overlay.classList.add('hidden', 'is-hidden');
  }

  function closeAllModals() {
    document.querySelectorAll('.modal').forEach((m) => {
      m.classList.add('hidden', 'is-hidden');
    });
    if (dom.overlay) dom.overlay.classList.add('hidden', 'is-hidden');
  }

  function switchTab(tab) {
    state.activeTab = tab;

    dom.tabButtons.forEach((btn) => {
      const active = btn.dataset.tab === tab;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    dom.tabPanels.forEach((panel) => {
      const active = panel.id === `${tab}Panel`;
      panel.classList.toggle('active', active);
      panel.classList.toggle('hidden', !active);
    });

    if (state.token && state.restaurantId) {
      if (tab === 'dashboard') loadDashboard();
      if (tab === 'menu') loadMenu();
      if (tab === 'earnings') loadEarnings();
    }

    if (tab === 'settings') renderSettings();
  }

  function setLoading(active) {
    if (dom.loader) {
      dom.loader.classList.toggle('hidden', !active);
      dom.loader.classList.toggle('is-hidden', !active);
    }
    document.body.classList.toggle('app-loading', !!active);
  }

  function bindEvents() {
    dom.tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        applyLanguage(btn.dataset.lang);
        renderAll();
      });
    });

    dom.settingsBtn?.addEventListener('click', () => switchTab('settings'));

    dom.notificationsBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      dom.notificationDropdown?.classList.toggle('hidden');
      dom.notificationDropdown?.classList.toggle('is-hidden');
      renderNotifications();
    });

    document.addEventListener('click', (e) => {
      if (
        dom.notificationDropdown &&
        !dom.notificationDropdown.contains(e.target) &&
        !dom.notificationsBtn?.contains(e.target)
      ) {
        dom.notificationDropdown.classList.add('hidden', 'is-hidden');
      }
    });

    dom.addMenuItemBtn?.addEventListener('click', () => openMenuItemModal());
    dom.cancelMenuItemBtn?.addEventListener('click', () => closeModal(dom.menuItemModal));
    dom.saveMenuItemBtn?.addEventListener('click', saveMenuItem);
    dom.saveSettingsBtn?.addEventListener('click', saveSettings);
    dom.overlay?.addEventListener('click', closeAllModals);
    dom.menuCategoryFilter?.addEventListener('change', renderMenuItems);
    dom.confirmHandoffBtn?.addEventListener('click', confirmDriverHandoff);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAllModals();
    });
  }

  function bindNetworkEvents() {
    window.addEventListener('offline', () => {
      dom.offlineBanner?.classList.remove('hidden', 'is-hidden');
    });

    window.addEventListener('online', () => {
      dom.offlineBanner?.classList.add('hidden', 'is-hidden');
      dom.reconnectBanner?.classList.remove('hidden', 'is-hidden');
      setTimeout(() => dom.reconnectBanner?.classList.add('hidden', 'is-hidden'), 2000);

      if (state.token && state.restaurantId) {
        connectSocket();
        loadDashboard();
      }
    });

    if (!navigator.onLine) {
      dom.offlineBanner?.classList.remove('hidden', 'is-hidden');
    }
  }

  function setupPwaInstall() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      state.installPrompt = e;
      dom.installAppBanner?.classList.remove('hidden', 'is-hidden');
    });

    dom.installAppBtn?.addEventListener('click', async () => {
      if (!state.installPrompt) return;
      state.installPrompt.prompt();
      await state.installPrompt.userChoice.catch(() => null);
      state.installPrompt = null;
      dom.installAppBanner?.classList.add('hidden', 'is-hidden');
    });
  }

  async function loadBootstrap() {
    const data = await apiRequest('/restaurants/me');
    state.restaurant = data.restaurant || data;
    state.restaurantId = state.restaurant.id || state.restaurant._id || state.restaurantId;
    state.currency = state.restaurant.currency || CONFIG.defaultCurrency || '€';
    if (state.restaurantId) {
      localStorage.setItem(STORAGE.restaurantId, state.restaurantId);
    }
    renderRestaurantHeader();
    renderSettings();
  }

  async function loadDashboard() {
    if (!state.restaurantId) return;
    const data = await apiRequest(`/orders/list?restaurantId=${encodeURIComponent(state.restaurantId)}`);
    const orders = data.orders || data || [];
    state.orders = Array.isArray(orders) ? orders : [];
    state.newOrders = state.orders.filter((o) =>
      ['new', 'pending', 'requested'].includes(String(o.status || '').toLowerCase())
    );
    state.activeOrders = state.orders.filter((o) =>
      ['accepted', 'preparing', 'ready', 'driver_assigned'].includes(String(o.status || '').toLowerCase())
    );
    renderMetrics();
    renderOrders();
    updateBadges();
  }

  async function loadMenu() {
    if (!state.restaurantId) return;
    const data = await apiRequest(`/menus/list?restaurantId=${encodeURIComponent(state.restaurantId)}`);
    state.menuItems = data.items || data.menu || data || [];
    state.categories = data.categories || buildCategoriesFromMenu(state.menuItems);
    renderMenuCategories();
    renderMenuItems();
  }

  async function loadEarnings() {
    if (!state.restaurantId) return;
    const data = await apiRequest(`/restaurants/earnings?restaurantId=${encodeURIComponent(state.restaurantId)}`);
    state.earnings = data || null;
    renderEarnings();
  }

  function buildCategoriesFromMenu(items) {
    const map = new Map();
    (items || []).forEach((item) => {
      const id = item.categoryId || item.category_id || item.category || 'default';
      const name = item.categoryName || item.category_name || item.category || t('all_categories');
      map.set(id, { id, name });
    });
    return Array.from(map.values());
  }

  function renderAll() {
    renderRestaurantHeader();
    renderMetrics();
    renderOrders();
    renderMenuCategories();
    renderMenuItems();
    renderEarnings();
    renderSettings();
    renderNotifications();
  }

  function renderRestaurantHeader() {
    const r = state.restaurant || {};
    if (dom.restaurantName) {
      dom.restaurantName.textContent = r.name || t('restaurant_name');
    }
    const isOpen = Boolean(r.isOpen || r.open || r.status === 'open');
    if (dom.statusLabel) {
      dom.statusLabel.textContent = isOpen ? t('status_open') : t('status_closed');
    }
    dom.onlineStatus?.classList.toggle('is-open', isOpen);
    dom.onlineStatus?.classList.toggle('is-closed', !isOpen);
  }

  function renderMetrics() {
    const avgPrep = calculateAveragePrepTime(state.activeOrders);
    if (dom.metricNewOrders) dom.metricNewOrders.textContent = state.newOrders.length;
    if (dom.metricActiveOrders) dom.metricActiveOrders.textContent = state.activeOrders.length;
    if (dom.metricAvgPrepTime) {
      dom.metricAvgPrepTime.innerHTML = `${avgPrep} <small>${t('minutes')}</small>`;
    }
  }

  function calculateAveragePrepTime(orders) {
    if (!orders.length) return 0;
    const total = orders.reduce((sum, order) => {
      return sum + Number(order.prepTime || order.preparationTime || order.estimatedPrepTime || 0);
    }, 0);
    return Math.round(total / orders.length) || 0;
  }

  function renderOrders() {
    renderOrderList(dom.newOrdersList, dom.emptyNewOrdersState, state.newOrders, 'new');
    renderOrderList(dom.activeOrdersList, dom.emptyActiveOrdersState, state.activeOrders, 'active');
  }

  function renderOrderList(container, emptyEl, orders, type) {
    if (!container) return;
    if (!orders.length) {
      container.innerHTML = '';
      setHidden(emptyEl, false);
      return;
    }
    setHidden(emptyEl, true);
    container.innerHTML = orders.map((order) => orderCardHTML(order, type)).join('');
    container.querySelectorAll('[data-action]').forEach((btn) => {
      btn.addEventListener('click', () => handleOrderAction(btn.dataset.action, btn.dataset.orderId));
    });
  }

  function orderCardHTML(order, type) {
    const id = order.id || order._id;
    const number = order.orderNumber || order.number || String(id || '').slice(-6);
    const items = order.items || [];
    const total = order.total || order.totalAmount || order.amount || 0;
    const status = order.status || 'new';
    const itemsText = items.map((item) => {
      const name = item.name || item.menuItemName || item.item?.name || '';
      const qty = item.quantity || item.qty || 1;
      return `${escapeHTML(name)} ×${qty}`;
    }).join('، ');

    const actionButtons = type === 'new'
      ? `<input class="prep-time" type="number" min="5" max="120" value="${order.prepTime || 20}" data-prep-for="${id}">
         <button class="btn-primary btn-sm" data-action="accept" data-order-id="${id}">${t('accept')}</button>
         <button class="btn-secondary btn-sm" data-action="reject" data-order-id="${id}">${t('reject')}</button>`
      : `<button class="btn-primary btn-sm" data-action="ready" data-order-id="${id}">${t('ready')}</button>
         <button class="btn-secondary btn-sm" data-action="view" data-order-id="${id}">${t('view')}</button>
         <button class="btn-secondary btn-sm" data-action="handoff" data-order-id="${id}">${t('handoff')}</button>`;

    return `
      <article class="order-card" data-order-id="${id}">
        <div class="order-main">
          <div class="order-header">
            <strong>${t('order')} #${escapeHTML(number)}</strong>
            <span class="order-status">${escapeHTML(status)}</span>
          </div>
          <div class="order-items">${itemsText || '—'}</div>
          <div class="order-total">${t('total')}: ${money(total)}</div>
        </div>
        <div class="order-actions">${actionButtons}</div>
      </article>
    `;
  }

  async function handleOrderAction(action, orderId) {
    if (!orderId) return;
    try {
      if (action === 'view') return openOrderDetails(orderId);
      if (action === 'handoff') return openDriverHandoff(orderId);
      const prepInput = document.querySelector(`[data-prep-for="${CSS.escape(orderId)}"]`);
      const prepTime = prepInput ? Number(prepInput.value || 20) : undefined;
      const endpointMap = {
        accept: '/orders/accept',
        reject: '/orders/reject',
        ready: '/orders/ready'
      };

      await apiRequest(endpointMap[action], {
        method: 'POST',
        body: JSON.stringify({ orderId, prepTime })
      });
      const msgMap = { accept: t('order_accepted'), reject: t('order_rejected'), ready: t('order_ready') };
      showToast(msgMap[action] || t('saved_successfully'), 'success');
      await loadDashboard();
    } catch (err) {
      showToast(err.message || t('network_error'), 'error');
    }
  }

  function openOrderDetails(orderId) {
    const order = state.orders.find((o) => String(o.id || o._id) === String(orderId));
    if (!order || !dom.orderDetailsContent) return;
    const items = (order.items || []).map((item) => {
      const name = item.name || item.menuItemName || item.item?.name || '';
      const qty = item.quantity || item.qty || 1;
      return `<li>${escapeHTML(name)} ×${qty}</li>`;
    }).join('');
    dom.orderDetailsContent.innerHTML = `
      <p><strong>${t('order')} #${escapeHTML(order.orderNumber || String(orderId).slice(-6))}</strong></p>
      <p>${t('customer')}: ${escapeHTML(order.customer?.name || order.customerName || '—')}</p>
      <p>${t('status')}: ${escapeHTML(order.status || '—')}</p>
      <p>${t('total')}: ${money(order.total || order.totalAmount)}</p>
      <h4>${t('order_items')}</h4>
      <ul>${items}</ul>
    `;
    openModal(dom.orderDetailsModal);
  }

  function openDriverHandoff(orderId) {
    const order = state.orders.find((o) => String(o.id || o._id) === String(orderId));
    if (!order || !dom.driverHandoffContent) return;
    dom.driverHandoffContent.dataset.orderId = orderId;
    dom.driverHandoffContent.innerHTML = `
      <p><strong>${t('order')} #${escapeHTML(order.orderNumber || String(orderId).slice(-6))}</strong></p>
      <p>${escapeHTML(order.driver?.name || order.driverName || '—')}</p>
    `;
    openModal(dom.driverHandoffModal);
  }

  async function confirmDriverHandoff() {
    const orderId = dom.driverHandoffContent?.dataset.orderId;
    if (!orderId) return;
    try {
      await apiRequest('/orders/handoff', {
        method: 'POST',
        body: JSON.stringify({ orderId })
      });
      closeModal(dom.driverHandoffModal);
      playSound(dom.soundPickupConfirmed);
      showToast(t('handoff_confirmed'), 'success');
      await loadDashboard();
    } catch (err) {
      showToast(err.message || t('network_error'), 'error');
    }
  }

  function renderMenuCategories() {
    if (!dom.menuCategoryFilter || !dom.itemCategory) return;
    const options = [`<option value="">${t('all_categories')}</option>`]
      .concat((state.categories || []).map((cat) => {
        const id = cat.id || cat._id || cat.slug || cat.name;
        const name = cat.name || cat.title || id;
        return `<option value="${escapeHTML(id)}">${escapeHTML(name)}</option>`;
      }))
      .join('');
    dom.menuCategoryFilter.innerHTML = options;
    dom.itemCategory.innerHTML = options;
  }

  function renderMenuItems() {
    if (!dom.menuItemsList) return;
    const category = dom.menuCategoryFilter?.value || '';
    let items = [...state.menuItems];
    if (category) {
      items = items.filter((item) =>
        String(item.categoryId || item.category_id || item.category || '') === String(category)
      );
    }
    if (!items.length) {
      dom.menuItemsList.innerHTML = '';
      setHidden(dom.emptyMenuState, false);
      return;
    }
    setHidden(dom.emptyMenuState, true);
    dom.menuItemsList.innerHTML = items.map(menuItemHTML).join('');
    dom.menuItemsList.querySelectorAll('[data-menu-action]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.menuAction;
        const id = btn.dataset.itemId;
        if (action === 'edit') openMenuItemModal(id);
        if (action === 'delete') deleteMenuItem(id);
        if (action === 'toggle') toggleMenuItem(id, btn.checked);
      });
    });
  }

  function menuItemHTML(item) {
    const id = item.id || item._id;
    const img = item.imageUrl || item.image || '/assets/images/food-placeholder.png';
    const available = item.available !== false && item.isAvailable !== false;
    return `
      <article class="menu-item-card" data-item-id="${id}">
        <img src="${escapeHTML(img)}" alt="${escapeHTML(item.name || '')}">
        <div class="item-details">
          <div class="item-name">${escapeHTML(item.name || '')}</div>
          <div class="item-price">${money(item.price)}</div>
          <label class="switch-label">
            <input type="checkbox" ${available ? 'checked' : ''} data-menu-action="toggle" data-item-id="${id}">
            <span>${t('item_available')}</span>
          </label>
          <div class="menu-actions">
            <button class="btn-secondary btn-sm" data-menu-action="edit" data-item-id="${id}">${t('edit')}</button>
            <button class="btn-secondary btn-sm" data-menu-action="delete" data-item-id="${id}">${t('delete')}</button>
          </div>
        </div>
      </article>
    `;
  }

  function openMenuItemModal(itemId = null) {
    state.currentEditingItemId = itemId;
    const item = itemId
      ? state.menuItems.find((x) => String(x.id || x._id) === String(itemId))
      : null;
    dom.menuItemModalTitle.textContent = item ? t('edit_menu_item_title') : t('add_menu_item_title');
    dom.itemName.value = item?.name || '';
    dom.itemDescription.value = item?.description || '';
    dom.itemPrice.value = item?.price || '';
    dom.itemCategory.value = item?.categoryId || item?.category_id || item?.category || '';
    dom.itemAvailable.checked = item ? item.available !== false && item.isAvailable !== false : true;
    openModal(dom.menuItemModal);
  }

  async function saveMenuItem() {
    try {
      const formData = new FormData();
      const id = state.currentEditingItemId;
      const path = id ? '/menus/update' : '/menus/create';
      const payload = {
        name: dom.itemName.value.trim(),
        description: dom.itemDescription.value.trim(),
        price: dom.itemPrice.value,
        category: dom.itemCategory.value,
        available: dom.itemAvailable.checked,
        restaurantId: state.restaurantId
      };
      if (id) payload.itemId = id;

      await apiRequest(path, {
        method: id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      closeModal(dom.menuItemModal);
      showToast(t('item_saved'), 'success');
      await loadMenu();
    } catch (err) {
      showToast(err.message || t('network_error'), 'error');
    }
  }

  async function deleteMenuItem(itemId) {
    if (!itemId) return;
    try {
      await apiRequest('/menus/delete', {
        method: 'POST',
        body: JSON.stringify({ itemId, restaurantId: state.restaurantId })
      });
      showToast(t('item_deleted'), 'success');
      await loadMenu();
    } catch (err) {
      showToast(err.message || t('network_error'), 'error');
    }
  }

  async function toggleMenuItem(itemId, available) {
    try {
      await apiRequest('/menus/update', {
        method: 'PUT',
        body: JSON.stringify({
          itemId,
          restaurantId: state.restaurantId,
          available
        })
      });
    } catch (err) {
      showToast(err.message || t('network_error'), 'error');
      await loadMenu();
    }
  }

  function renderEarnings() {
    if (!dom.earningsSummary || !dom.earningsTableContainer) return;
    const data = state.earnings || {};
    const summary = data.summary || data;
    dom.earningsSummary.innerHTML = `
      <div class="metric-card">
        <span>${t('total')}</span>
        <strong>${money(summary.today || summary.todayEarnings || 0)}</strong>
      </div>
      <div class="metric-card">
        <span>Week</span>
        <strong>${money(summary.week || summary.weekEarnings || 0)}</strong>
      </div>
      <div class="metric-card">
        <span>Commission</span>
        <strong>${money(summary.commission || 0)}</strong>
      </div>
    `;
    const rows = data.history || [];
    if (!rows.length) {
      dom.earningsTableContainer.innerHTML = '';
      setHidden(dom.emptyEarningsState, false);
      return;
    }
    setHidden(dom.emptyEarningsState, true);
    dom.earningsTableContainer.innerHTML = `
      <table class="earnings-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Orders</th>
            <th>${t('total')}</th>
            <th>Commission</th>
            <th>Net</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((r) => `
            <tr>
              <td>${escapeHTML(r.date || '')}</td>
              <td>${Number(r.orders || r.orderCount || 0)}</td>
              <td>${money(r.total || 0)}</td>
              <td>${money(r.commission || 0)}</td>
              <td>${money(r.net || 0)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  function renderSettings() {
    const r = state.restaurant || {};
    if (dom.openingTime) dom.openingTime.value = r.openingTime || r.hours?.from || '10:00';
    if (dom.closingTime) dom.closingTime.value = r.closingTime || r.hours?.to || '23:00';
    if (dom.restaurantOpenToggle) dom.restaurantOpenToggle.checked = Boolean(r.isOpen || r.open);
    if (dom.restaurantNameInput) dom.restaurantNameInput.value = r.name || '';
    if (dom.restaurantPhone) dom.restaurantPhone.value = r.phone || '';
    if (dom.restaurantAddress) dom.restaurantAddress.value = r.address || '';
  }

  async function saveSettings() {
    try {
      const payload = {
        name: dom.restaurantNameInput.value.trim(),
        phone: dom.restaurantPhone.value.trim(),
        address: dom.restaurantAddress.value.trim(),
        openingTime: dom.openingTime.value,
        closingTime: dom.closingTime.value,
        isOpen: dom.restaurantOpenToggle.checked,
        notifications: {
          newOrders: dom.notifyNewOrders.checked,
          statusChange: dom.notifyStatusChange.checked,
          driverArrived: dom.notifyDriverArrived.checked
        }
      };
      const data = await apiRequest('/restaurants/update', {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
      state.restaurant = data.restaurant || data;
      renderRestaurantHeader();
      showToast(t('saved_successfully'), 'success');
    } catch (err) {
      showToast(err.message || t('network_error'), 'error');
    }
  }

  function updateBadges() {
    if (dom.notificationBadge) {
      dom.notificationBadge.textContent = String(state.notifications.length);
      setHidden(dom.notificationBadge, state.notifications.length === 0);
    }
    const tabBadge = $('newOrdersCountBadge');
    if (tabBadge) {
      tabBadge.textContent = String(state.newOrders.length);
      setHidden(tabBadge, state.newOrders.length === 0);
    }
  }

  function addNotification(message, type = 'info') {
    state.notifications.unshift({
      message,
      type,
      createdAt: new Date().toISOString()
    });
    updateBadges();
    renderNotifications();
  }

  function renderNotifications() {
    if (!dom.notificationList) return;
    if (!state.notifications.length) {
      dom.notificationList.innerHTML = `<div class="empty-state">${t('no_notifications')}</div>`;
      return;
    }
    dom.notificationList.innerHTML = state.notifications.map((n) => `
      <div class="notification-item">
        <p>${escapeHTML(n.message)}</p>
        <small>${new Date(n.createdAt).toLocaleString()}</small>
      </div>
    `).join('');
  }

  function connectSocket() {
    if (!window.io || !state.token) return;
    if (state.socket) {
      state.socket.disconnect();
    }
    state.socket = window.io(CONFIG.socketUrl || window.location.origin, {
      auth: { token: state.token },
      transports: ['websocket', 'polling']
    });
    state.socket.on('connect', () => {
      dom.reconnectBanner?.classList.add('hidden', 'is-hidden');
      if (state.restaurantId) {
        state.socket.emit('restaurant:join', { restaurantId: state.restaurantId });
      }
    });
    state.socket.on('disconnect', () => {
      dom.reconnectBanner?.classList.remove('hidden', 'is-hidden');
    });
    state.socket.on('order:new', (order) => {
      playSound(dom.soundNewOrder);
      addNotification(`${t('order')} #${order.orderNumber || ''}`, 'success');
      showToast(`${t('new_orders_title')}`, 'success');
      loadDashboard();
    });
    state.socket.on('order:cancelled', () => {
      playSound(dom.soundCancelledOrder);
      loadDashboard();
    });
    state.socket.on('driver:arrived', (data) => {
      playSound(dom.soundDriverArrived);
      if (dom.driverETA) dom.driverETA.textContent = data?.eta || '';
      dom.driverInfoBar?.classList.remove('hidden', 'is-hidden');
    });
    state.socket.on('earnings:update', () => {
      loadEarnings();
    });
  }

  async function init() {
    applyTheme(state.theme);
    applyLanguage(state.lang);
    bindEvents();
    bindNetworkEvents();
    setupPwaInstall();

    try {
      setLoading(true);

      if (state.token) {
        await loadBootstrap();
        await Promise.all([loadDashboard(), loadMenu(), loadEarnings()]);
        connectSocket();
      } else {
        state.restaurant = { name: t('restaurant_name'), isOpen: false };
        state.orders = [];
        state.newOrders = [];
        state.activeOrders = [];
        state.menuItems = [];
        state.categories = [];
        state.earnings = null;
        renderAll();
      }
    } catch (err) {
      state.restaurant = { name: t('restaurant_name'), isOpen: false };
      state.orders = [];
      state.newOrders = [];
      state.activeOrders = [];
      state.menuItems = [];
      state.categories = [];
      state.earnings = null;
      renderAll();
      showToast(t('network_error') + ' (offline mode)', 'info');
    } finally {
      setLoading(false);
      closeAllModals();
    }

    updateBadges();
  }

  document.addEventListener('DOMContentLoaded', init);

  window.FairfoodRestaurant = {
    reload: () => Promise.all([loadDashboard(), loadMenu(), loadEarnings()]),
    switchTab,
    state
  };
})();
