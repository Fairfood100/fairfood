-- ============================================================
-- FAIRFOOD قاعدة بيانات - Fairfood
-- جميع الجداول الأساسية لتطبيق توصيل الطعام
-- ============================================================

-- حذف الجداول إن وجدت (ترتيب عكسي للتبعيات)
DROP TABLE IF EXISTS wallet_transactions;
DROP TABLE IF EXISTS wallets;
DROP TABLE IF EXISTS driver_locations;
DROP TABLE IF EXISTS push_tokens;
DROP TABLE IF EXISTS ratings;
DROP TABLE IF EXISTS order_events;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS menu_items;
DROP TABLE IF EXISTS coupons;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS addresses;
DROP TABLE IF EXISTS documents;
DROP TABLE IF EXISTS support_tickets;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS rate_limits;
DROP TABLE IF EXISTS drivers;
DROP TABLE IF EXISTS restaurants;
DROP TABLE IF EXISTS users;

-- ============================================================
-- 1. المستخدمون (عملاء، مطاعم، سائقين، أدمن)
-- ============================================================
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('customer','restaurant','driver','admin')),
  phone TEXT,
  avatar_url TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK(status IN ('active','suspended','banned')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- ============================================================
-- 2. المطاعم
-- ============================================================
CREATE TABLE restaurants (
  id TEXT PRIMARY KEY,
  owner_user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  phone TEXT,
  address TEXT,
  cuisine TEXT,
  lat REAL,
  lng REAL,
  cover_image TEXT,
  logo_url TEXT,
  rating REAL DEFAULT 0,
  delivery_fee_cents INTEGER DEFAULT 0,
  min_order_cents INTEGER DEFAULT 0,
  delivery_time_min INTEGER DEFAULT 20,
  delivery_time_max INTEGER DEFAULT 45,
  is_open INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'closed' CHECK(status IN ('open','closed')),
  verification_status TEXT NOT NULL DEFAULT 'pending' CHECK(verification_status IN ('pending','approved','rejected')),
  opening_time TEXT DEFAULT '09:00',
  closing_time TEXT DEFAULT '23:00',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY(owner_user_id) REFERENCES users(id)
);

CREATE INDEX idx_restaurants_owner ON restaurants(owner_user_id);
CREATE INDEX idx_restaurants_status ON restaurants(status, verification_status);

-- ============================================================
-- 3. أصناف القائمة
-- ============================================================
CREATE TABLE menu_items (
  id TEXT PRIMARY KEY,
  restaurant_id TEXT NOT NULL,
  category TEXT,
  category_id TEXT,
  name TEXT NOT NULL,
  description TEXT,
  price_cents INTEGER NOT NULL DEFAULT 0,
  image TEXT,
  tags TEXT,
  available INTEGER NOT NULL DEFAULT 1,
  inventory_count INTEGER,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY(restaurant_id) REFERENCES restaurants(id)
);

CREATE INDEX idx_menu_restaurant ON menu_items(restaurant_id);
CREATE INDEX idx_menu_category ON menu_items(category_id);

-- ============================================================
-- 4. الطلبات
-- ============================================================
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  customer_user_id TEXT,
  restaurant_id TEXT NOT NULL,
  driver_id TEXT,
  customer_name TEXT,
  customer_phone TEXT,
  delivery_address TEXT,
  delivery_note TEXT,
  subtotal_cents INTEGER NOT NULL DEFAULT 0,
  delivery_fee_cents INTEGER NOT NULL DEFAULT 0,
  discount_cents INTEGER NOT NULL DEFAULT 0,
  total_cents INTEGER NOT NULL DEFAULT 0,
  payment_method TEXT NOT NULL DEFAULT 'cash' CHECK(payment_method IN ('cash','card','wallet','stripe')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK(payment_status IN ('pending','paid','failed','refunded')),
  stripe_payment_intent_id TEXT,
  stripe_customer_id TEXT,
  coupon_code TEXT,
  prep_time_min INTEGER DEFAULT 20,
  eta_min INTEGER,
  restaurant_note TEXT,
  cancel_reason TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK(status IN ('new','accepted_by_restaurant','rejected_by_restaurant','preparing','ready_for_driver','accepted_by_driver','picked_up','on_the_way','completed','cancelled')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY(restaurant_id) REFERENCES restaurants(id)
);

CREATE INDEX idx_orders_restaurant ON orders(restaurant_id);
CREATE INDEX idx_orders_customer ON orders(customer_user_id);
CREATE INDEX idx_orders_driver ON orders(driver_id);
CREATE INDEX idx_orders_status ON orders(status);

-- ============================================================
-- 5. أصناف الطلب
-- ============================================================
CREATE TABLE order_items (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL,
  menu_item_id TEXT,
  name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price_cents INTEGER NOT NULL DEFAULT 0,
  total_cents INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY(order_id) REFERENCES orders(id)
);

CREATE INDEX idx_order_items_order ON order_items(order_id);

-- ============================================================
-- 6. السائقون
-- ============================================================
CREATE TABLE drivers (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'offline' CHECK(status IN ('online','offline','busy')),
  vehicle TEXT DEFAULT 'car',
  plate_number TEXT,
  vehicle_model TEXT,
  verification_status TEXT NOT NULL DEFAULT 'pending' CHECK(verification_status IN ('pending','approved','rejected')),
  lat REAL,
  lng REAL,
  last_location_at TEXT,
  total_deliveries INTEGER DEFAULT 0,
  rating REAL DEFAULT 0,
  today_earnings_cents INTEGER DEFAULT 0,
  weekly_earnings_cents INTEGER DEFAULT 0,
  monthly_earnings_cents INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE INDEX idx_drivers_user ON drivers(user_id);
CREATE INDEX idx_drivers_status ON drivers(status, verification_status);

-- ============================================================
-- 7. مواقع السائقين (سجل التتبع)
-- ============================================================
CREATE TABLE driver_locations (
  id TEXT PRIMARY KEY,
  driver_id TEXT NOT NULL,
  order_id TEXT,
  lat REAL NOT NULL,
  lng REAL NOT NULL,
  accuracy REAL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY(driver_id) REFERENCES drivers(id)
);

CREATE INDEX idx_driver_locations_driver ON driver_locations(driver_id);
CREATE INDEX idx_driver_locations_order ON driver_locations(order_id);

-- ============================================================
-- 8. المستندات (للتحقق من السائقين والمطاعم)
-- ============================================================
CREATE TABLE documents (
  id TEXT PRIMARY KEY,
  owner_type TEXT NOT NULL CHECK(owner_type IN ('driver','restaurant')),
  owner_id TEXT NOT NULL,
  document_type TEXT NOT NULL,
  file_name TEXT,
  file_data TEXT,
  file_size INTEGER,
  mime_type TEXT,
  file_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','approved','rejected')),
  reviewed_by TEXT,
  reviewed_at TEXT,
  review_note TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_documents_owner ON documents(owner_type, owner_id);

-- ============================================================
-- 9. الإشعارات الداخلية
-- ============================================================
CREATE TABLE notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT,
  body TEXT,
  type TEXT DEFAULT 'info',
  data TEXT,
  is_read INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read);

-- ============================================================
-- 10. أحداث الطلب (سجل التتبع)
-- ============================================================
CREATE TABLE order_events (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL,
  actor_user_id TEXT,
  event_type TEXT NOT NULL,
  note TEXT,
  data TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY(order_id) REFERENCES orders(id)
);

CREATE INDEX idx_order_events_order ON order_events(order_id);

-- ============================================================
-- 11. سجل التدقيق (للأدمن)
-- ============================================================
CREATE TABLE audit_logs (
  id TEXT PRIMARY KEY,
  actor_user_id TEXT,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  ip TEXT,
  user_agent TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_audit_logs_actor ON audit_logs(actor_user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);

-- ============================================================
-- 12. الحد من السرعة (Rate Limiting)
-- ============================================================
CREATE TABLE rate_limits (
  key TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 1,
  reset_at INTEGER NOT NULL
);

-- ============================================================
-- 13. المحافظ المالية
-- ============================================================
CREATE TABLE wallets (
  id TEXT PRIMARY KEY,
  owner_type TEXT NOT NULL CHECK(owner_type IN ('customer','restaurant','driver','platform')),
  owner_id TEXT NOT NULL,
  balance_cents INTEGER NOT NULL DEFAULT 0,
  pending_cents INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_wallets_owner ON wallets(owner_type, owner_id);

-- ============================================================
-- 14. حركات المحفظة
-- ============================================================
CREATE TABLE wallet_transactions (
  id TEXT PRIMARY KEY,
  wallet_id TEXT NOT NULL,
  order_id TEXT,
  type TEXT NOT NULL CHECK(type IN ('credit','debit')),
  amount_cents INTEGER NOT NULL,
  fee_cents INTEGER DEFAULT 0,
  note TEXT,
  reference TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY(wallet_id) REFERENCES wallets(id)
);

CREATE INDEX idx_wallet_transactions_wallet ON wallet_transactions(wallet_id);

-- ============================================================
-- 15. كوبونات الخصم
-- ============================================================
CREATE TABLE coupons (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  amount_off_cents INTEGER DEFAULT 0,
  percent_off INTEGER DEFAULT 0,
  min_order_cents INTEGER DEFAULT 0,
  max_uses INTEGER,
  used_count INTEGER DEFAULT 0,
  active INTEGER NOT NULL DEFAULT 1,
  expires_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_coupons_code ON coupons(code);

-- ============================================================
-- 16. تذاكر الدعم الفني
-- ============================================================
CREATE TABLE support_tickets (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  order_id TEXT,
  subject TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'open' CHECK(status IN ('open','in_progress','resolved','closed')),
  priority TEXT DEFAULT 'normal',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE INDEX idx_support_tickets_user ON support_tickets(user_id);

-- ============================================================
-- 17. التقييمات
-- ============================================================
CREATE TABLE ratings (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL,
  from_user_id TEXT NOT NULL,
  target_type TEXT NOT NULL CHECK(target_type IN ('restaurant','driver','item')),
  target_id TEXT NOT NULL,
  stars INTEGER NOT NULL CHECK(stars >= 1 AND stars <= 5),
  comment TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY(order_id) REFERENCES orders(id)
);

CREATE INDEX idx_ratings_target ON ratings(target_type, target_id);
CREATE INDEX idx_ratings_order ON ratings(order_id);

-- ============================================================
-- 18. رموز الإشعارات (Push Notifications)
-- ميزة جديدة: إشعارات الجوال
-- ============================================================
CREATE TABLE push_tokens (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  device_token TEXT NOT NULL,
  platform TEXT NOT NULL CHECK(platform IN ('ios','android','web')),
  device_name TEXT,
  is_active INTEGER NOT NULL DEFAULT 1,
  last_seen_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE INDEX idx_push_tokens_user ON push_tokens(user_id);
CREATE UNIQUE INDEX idx_push_tokens_device ON push_tokens(device_token);

-- ============================================================
-- 19. عناوين العملاء
-- ============================================================
CREATE TABLE addresses (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  details TEXT NOT NULL,
  lat REAL,
  lng REAL,
  is_default INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE INDEX idx_addresses_user ON addresses(user_id);

-- ============================================================
-- 20. تصنيفات المطاعم
-- ============================================================
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_ar TEXT,
  name_en TEXT,
  name_de TEXT,
  icon TEXT,
  image TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ============================================================
-- 21. محادثات الدعم
-- ============================================================
CREATE TABLE support_messages (
  id TEXT PRIMARY KEY,
  ticket_id TEXT NOT NULL,
  sender_id TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY(ticket_id) REFERENCES support_tickets(id),
  FOREIGN KEY(sender_id) REFERENCES users(id)
);

CREATE INDEX idx_support_messages_ticket ON support_messages(ticket_id);
