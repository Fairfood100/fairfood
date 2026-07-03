(function () {
  'use strict';

  const TILE_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
  const TILE_ATTR = '&copy; <a href="https://carto.com/">CARTO</a>';
  const CENTER_RIYADH = [24.7136, 46.6753];
  const GPS_TIMEOUT = 5000;
  const GPS_MAX_AGE = 60000;

  const CDNS = [
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet',
    'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet'
  ];

  let _L = null;
  let _loadPromise = null;
  const _maps = new Map();
  const _markers = new Map();
  let _watchId = null;
  let _geoCallbacks = [];
  const _markerQueue = [];

  function _flushMarkerQueue() {
    const keys = Object.keys(MapService._appMaps);
    if (!keys.length) return;
    const map = MapService._appMaps[keys[0]];
    const L = _L;
    if (!L || !map) return;
    while (_markerQueue.length) {
      const item = _markerQueue.shift();
      try {
        const marker = L.marker([item.lat, item.lng], {
          icon: L.divIcon({ className: '', html: item.html, iconSize: item.iconSize, iconAnchor: [item.iconSize[0] / 2, item.iconSize[1]] })
        }).addTo(map);
        if (item.label) marker.bindTooltip(item.label, { direction: 'top', offset: [0, -36] });
        _markers.set(item.id, marker);
      } catch (e) { console.warn('Marker queue flush error:', e); }
    }
  }

  function loadLeaflet() {
    if (_L) return Promise.resolve(_L);
    if (_loadPromise) return _loadPromise;

    _loadPromise = new Promise((resolve) => {
      let tried = 0;
      function tryNext() {
        if (tried >= CDNS.length) { resolve(null); return; }
        const base = CDNS[tried];
        tried++;

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = base + '.css';
        document.head.appendChild(link);

        const script = document.createElement('script');
        script.src = base + '.js';
        script.onload = () => {
          _L = window.L;
          resolve(_L);
        };
        script.onerror = () => {
          link.remove();
          setTimeout(tryNext, 500);
        };
        document.body.appendChild(script);
      }
      tryNext();
    });

    return _loadPromise;
  }

  const MapService = {
    _appMaps: {},

    async init(mapId, opts = {}) {
      if (this._appMaps[mapId]) return this._appMaps[mapId];

      const el = document.getElementById(mapId);
      if (!el) return null;

      const L = await loadLeaflet();
      if (!L) {
        el.innerHTML = '<div class="map-fallback">الخريطة غير متاحة</div>';
        return null;
      }

      const lat = Number.isFinite(opts.lat) ? opts.lat : CENTER_RIYADH[0];
      const lng = Number.isFinite(opts.lng) ? opts.lng : CENTER_RIYADH[1];
      const zoom = opts.zoom || (opts.lat ? 15 : 12);

      const map = L.map(el, {
        attributionControl: false,
        center: [lat, lng],
        zoom: zoom,
        zoomControl: !opts.hideZoomControl
      });
      L.tileLayer(TILE_URL, { maxZoom: 19, attribution: TILE_ATTR }).addTo(map);

      clearTimeout(this._resizeTimer);
      this._resizeTimer = setTimeout(() => map.invalidateSize(), 400);

      this._appMaps[mapId] = map;
      _flushMarkerQueue();

      if (!opts.hideLocateBtn) {
        this._addLocateControl(map, L);
      }

      return map;
    },

    destroy(mapId) {
      const map = this._appMaps[mapId];
      if (map) {
        map.remove();
        delete this._appMaps[mapId];
      }
    },

    _addLocateControl(map, L) {
      const LocateControl = L.Control.extend({
        onAdd: function () {
          const btn = L.DomUtil.create('button', 'leaflet-bar leaflet-control leaflet-control-zoom');
          btn.innerHTML = '📍';
          btn.title = 'موقعي الحالي';
          btn.style.cssText = 'width:36px;height:36px;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;background:#fff;border:2px solid rgba(0,0,0,0.2);border-radius:4px;margin-top:4px';
          btn.onclick = () => {
            MapService.getCurrentPosition().then(pos => {
              map.setView([pos.lat, pos.lng], 15);
              MapService.addMarker('_locate', pos.lat, pos.lng, '', 'blue');
            }).catch(() => {});
          };
          return btn;
        }
      });
      map.addControl(new LocateControl());
    },

    addMarker(id, lat, lng, label, type) {
      const L = _L;
      if (!L) return;

      if (_markers.has(id)) {
        _markers.get(id).setLatLng([lat, lng]);
        return _markers.get(id);
      }

      let html, iconSize;
      if (type === 'driver') {
        html = '<div style="background:#2563eb;color:#fff;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3)">🛵</div>';
        iconSize = [36, 36];
      } else if (type === 'user') {
        html = '<div style="background:#059669;color:#fff;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3)">📍</div>';
        iconSize = [28, 28];
      } else if (type === 'restaurant') {
        html = '<div style="background:#d97706;color:#fff;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3)">🍽</div>';
        iconSize = [32, 32];
      } else {
        html = '<div style="background:#6b7280;color:#fff;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.3)">📍</div>';
        iconSize = [24, 24];
      }

      const keys = Object.keys(this._appMaps);
      if (keys.length) {
        const marker = L.marker([lat, lng], {
          icon: L.divIcon({ className: '', html, iconSize, iconAnchor: [iconSize[0] / 2, iconSize[1]] })
        }).addTo(this._appMaps[keys[0]]);
        if (label) marker.bindTooltip(label, { direction: 'top', offset: [0, -36] });
        _markers.set(id, marker);
        return marker;
      }

      const existing = _markerQueue.findIndex(item => item.id === id);
      if (existing >= 0) {
        _markerQueue[existing] = { id, lat, lng, label, html, iconSize };
      } else {
        _markerQueue.push({ id, lat, lng, label, html, iconSize });
      }
    },

    removeMarker(id) {
      if (_markers.has(id)) {
        const m = _markers.get(id);
        m.remove();
        _markers.delete(id);
      }
    },

    addRadiusCircle(mapId, lat, lng, radiusKm, color) {
      const L = _L;
      if (!L) return null;
      const map = this._appMaps[mapId];
      if (!map) return null;

      const circle = L.circle([lat, lng], {
        radius: radiusKm * 1000,
        color: color || '#2563eb',
        fillColor: color || '#2563eb',
        fillOpacity: 0.1,
        weight: 2,
        dashArray: '5, 5'
      }).addTo(map);

      return circle;
    },

    panTo(mapId, lat, lng, zoom) {
      const map = this._appMaps[mapId];
      if (!map) return;
      map.setView([lat, lng], zoom || map.getZoom());
    },

    // ===== GPS =====

    getCurrentPosition() {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          resolve({ lat: CENTER_RIYADH[0], lng: CENTER_RIYADH[1] });
          return;
        }
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy }),
          () => resolve({ lat: CENTER_RIYADH[0], lng: CENTER_RIYADH[1] }),
          { enableHighAccuracy: true, timeout: GPS_TIMEOUT, maximumAge: 0 }
        );
      });
    },

    startWatching(callback) {
      this.stopWatching();
      if (!navigator.geolocation) { return; }
      _geoCallbacks.push(callback);
      if (_watchId) return;

      _watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy };
          _geoCallbacks.forEach(cb => { try { Promise.resolve(cb(coords)).catch(e => console.warn('GPS callback error:', e)); } catch (e) { console.warn('GPS callback error:', e); } });
        },
        (err) => { console.warn('GPS watch error:', err.message); },
        { enableHighAccuracy: false, timeout: GPS_TIMEOUT, maximumAge: GPS_MAX_AGE }
      );
    },

    stopWatching() {
      _geoCallbacks = [];
      if (_watchId !== null) {
        navigator.geolocation.clearWatch(_watchId);
        _watchId = null;
      }
    },

    async reverseGeocode(lat, lng, apiBase) {
      try {
        const res = await fetch((apiBase || '/api/v1') + `/geo/reverse?lat=${lat}&lng=${lng}`);
        const data = await res.json();
        return data?.data?.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      } catch {
        return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      }
    },

    // ===== Settings Map (Restaurant) =====

    _settingsMaps: {},
    _settingsMarkers: {},

    initSettingsMap(mapId, opts = {}) {
      if (this._settingsMaps[mapId]) {
        this._settingsMaps[mapId].remove();
      }

      const el = document.getElementById(mapId);
      if (!el) return null;

      loadLeaflet().then(L => {
        if (!L) return;
        const lat = Number.isFinite(opts.lat) ? opts.lat : CENTER_RIYADH[0];
        const lng = Number.isFinite(opts.lng) ? opts.lng : CENTER_RIYADH[1];

        const map = L.map(el, { zoomControl: false }).setView([lat, lng], opts.lat ? 15 : 12);
        L.tileLayer(TILE_URL, { maxZoom: 19, attribution: TILE_ATTR }).addTo(map);

        const marker = L.marker([lat, lng], { draggable: true }).addTo(map);
        marker.on('dragend', () => {
          const pos = marker.getLatLng();
          opts.onMove && opts.onMove(pos.lat, pos.lng);
        });
        map.on('click', (e) => {
          marker.setLatLng(e.latlng);
          opts.onMove && opts.onMove(e.latlng.lat, e.latlng.lng);
        });

        this._settingsMaps[mapId] = map;
        this._settingsMarkers[mapId] = marker;
        _flushMarkerQueue();
        setTimeout(() => map.invalidateSize(), 300);

        opts.onReady && opts.onReady(map, marker);
      });

      return true;
    },

    destroySettingsMap(mapId) {
      if (this._settingsMaps[mapId]) {
        this._settingsMaps[mapId].remove();
        delete this._settingsMaps[mapId];
        delete this._settingsMarkers[mapId];
      }
    },

    // ===== General =====

    fitBounds(mapId, bounds) {
      const map = this._appMaps[mapId];
      if (!map || !bounds) return;
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  };

  window.FairfoodMap = MapService;
  window.FairfoodMap._loadLeaflet = loadLeaflet;

})();
