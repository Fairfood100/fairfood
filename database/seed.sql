-- ============================================================
-- FAIRFOOD بيانات تجريبية كاملة (v2)
-- ============================================================

-- المستخدمون (كلمة المرور للجميع: Password123!)
INSERT INTO users (id, name, email, password_hash, role, phone, status) VALUES
('admin_1', 'Admin', 'admin@fairfood.local', 'sha256$79ountm4gfvkm3sg$c1838fbab0acb63c21772146fb942b5b7264b552d1eee35b4d069fd83fec45c9', 'admin', '+966500000000', 'active'),
('customer_1', 'أحمد العميل', 'customer@fairfood.local', 'sha256$79ountm4gfvkm3sg$c1838fbab0acb63c21772146fb942b5b7264b552d1eee35b4d069fd83fec45c9', 'customer', '+966500000001', 'active'),
('customer_2', 'سارة الزبونة', 'customer2@fairfood.local', 'sha256$79ountm4gfvkm3sg$c1838fbab0acb63c21772146fb942b5b7264b552d1eee35b4d069fd83fec45c9', 'customer', '+966500000004', 'active'),
('restaurant_user_1', 'مطعم الركن الشامي', 'restaurant@fairfood.local', 'sha256$79ountm4gfvkm3sg$c1838fbab0acb63c21772146fb942b5b7264b552d1eee35b4d069fd83fec45c9', 'restaurant', '+966500000002', 'active'),
('restaurant_user_2', 'شاورما العربي', 'restaurant2@fairfood.local', 'sha256$79ountm4gfvkm3sg$c1838fbab0acb63c21772146fb942b5b7264b552d1eee35b4d069fd83fec45c9', 'restaurant', '+966500000005', 'active'),
('driver_user_1', 'خالد السائق', 'driver@fairfood.local', 'sha256$79ountm4gfvkm3sg$c1838fbab0acb63c21772146fb942b5b7264b552d1eee35b4d069fd83fec45c9', 'driver', '+966500000003', 'active'),
('driver_user_2', 'فيصل السائق', 'driver2@fairfood.local', 'sha256$79ountm4gfvkm3sg$c1838fbab0acb63c21772146fb942b5b7264b552d1eee35b4d069fd83fec45c9', 'driver', '+966500000006', 'active');

-- المطاعم
INSERT INTO restaurants (id, owner_user_id, name, description, address, cuisine, lat, lng, delivery_fee_cents, min_order_cents, delivery_time_min, delivery_time_max, is_open, status, verification_status, phone, rating) VALUES
('restaurant_1', 'restaurant_user_1', 'مطعم الركن الشامي', 'أشهى المأكولات الشامية', 'الرياض، المملكة العربية السعودية', 'شامي', 24.7136, 46.6753, 1500, 5000, 25, 45, 1, 'open', 'approved', '+966500000010', 4.5),
('restaurant_2', 'restaurant_user_1', 'بيتزا نابولي', 'بيتزا إيطالية أصلية', 'جدة، المملكة العربية السعودية', 'إيطالي', 21.4858, 39.1925, 2000, 3000, 20, 40, 1, 'open', 'approved', '+966500000011', 4.2),
('restaurant_3', 'restaurant_user_1', 'برجر هاوس', 'برجر طازج يومياً', 'الدمام، المملكة العربية السعودية', 'أمريكي', 26.4207, 50.0888, 1500, 4000, 15, 30, 1, 'open', 'approved', '+966500000012', 4.0),
('restaurant_4', 'restaurant_user_2', 'شاورما العربي', 'شاورما لحم ودجاج على أصوله', 'الرياض، طريق الملك فهد', 'عربي', 24.7236, 46.6653, 1000, 3000, 10, 20, 1, 'open', 'approved', '+966500000013', 4.7),
('restaurant_5', 'restaurant_user_2', 'مطعم كشمير', 'مأكولات هندية وباكستانية', 'الرياض، حي السليمانية', 'هندي', 24.6936, 46.6853, 2000, 5000, 30, 50, 1, 'open', 'approved', '+966500000014', 4.3);

-- أصناف القائمة
INSERT INTO menu_items (id, restaurant_id, category, name, description, price_cents, image, available, inventory_count) VALUES
('item_1', 'restaurant_1', 'مقبلات', 'حمص', 'حمص بالطحينة', 1200, '', 1, 50),
('item_2', 'restaurant_1', 'مقبلات', 'متبل', 'باذنجان مع الطحينة', 1000, '', 1, 40),
('item_3', 'restaurant_1', 'رئيسي', 'شاورما دجاج', 'شاورما دجاج مع الخبز', 2500, '', 1, 30),
('item_4', 'restaurant_1', 'رئيسي', 'كبسة لحم', 'كبسة لحم مع الأرز', 3500, '', 1, 25),
('item_5', 'restaurant_1', 'مشروبات', 'عصير برتقال', 'عصير برتقال طبيعي', 800, '', 1, 100),
('item_6', 'restaurant_2', 'بيتزا', 'بيتزا مارغريتا', 'صوص طماطم، جبن موزاريلا', 3000, '', 1, 20),
('item_7', 'restaurant_2', 'بيتزا', 'بيتزا بيبروني', 'بيبروني، جبن، صوص', 3500, '', 1, 15),
('item_8', 'restaurant_2', 'مقبلات', 'ثومية', 'صلصة ثوم لبنانية', 500, '', 1, 200),
('item_9', 'restaurant_3', 'برجر', 'برجر لحم', 'لحم بقري 200 جرام', 2500, '', 1, 40),
('item_10', 'restaurant_3', 'برجر', 'برجر دجاج', 'فيليه دجاج مقرمش', 2200, '', 1, 35),
('item_11', 'restaurant_3', 'بطاطس', 'بطاطس مقلية', 'بطاطس طازجة', 800, '', 1, 100),
('item_12', 'restaurant_3', 'مشروبات', 'كوكاكولا', 'مشروب غازي', 500, '', 1, 200),
('item_13', 'restaurant_4', 'شاورما', 'شاورما لحم', 'شاورما لحم بالخبز العربي', 1800, '', 1, 40),
('item_14', 'restaurant_4', 'شاورما', 'شاورما دجاج', 'شاورما دجاج بالخبز العربي', 1500, '', 1, 50),
('item_15', 'restaurant_4', 'مقبلات', 'حمص', 'حمص بالطحينة', 800, '', 1, 60),
('item_16', 'restaurant_4', 'مشروبات', 'عرق سوس', 'مشروب عرق سوس', 500, '', 1, 100),
('item_17', 'restaurant_5', 'رئيسي', 'برياني دجاج', 'أرز بسمتي مع دجاج متبل', 3000, '', 1, 30),
('item_18', 'restaurant_5', 'رئيسي', 'كاري لحم', 'لحم بالكاري مع الأرز', 3500, '', 1, 25),
('item_19', 'restaurant_5', 'مقبلات', 'سمبوسة', 'سمبوسة محشية باللحم', 600, '', 1, 80),
('item_20', 'restaurant_5', 'خبز', 'نان', 'خبز نان طازج', 300, '', 1, 200);

-- السائقون
INSERT INTO drivers (id, user_id, status, vehicle, plate_number, vehicle_model, verification_status, lat, lng, total_deliveries, rating) VALUES
('driver_1', 'driver_user_1', 'online', 'car', 'ABC 1234', 'Toyota Camry 2020', 'approved', 24.7136, 46.6753, 150, 4.8),
('driver_2', 'driver_user_2', 'online', 'motorcycle', 'DEF 5678', 'Yamaha 2022', 'approved', 24.7236, 46.6853, 80, 4.5);

-- طلبات سابقة (مكتملة)
INSERT INTO orders (id, customer_user_id, restaurant_id, driver_id, customer_name, delivery_address, subtotal_cents, delivery_fee_cents, total_cents, status, created_at, updated_at) VALUES
('order_1', 'customer_1', 'restaurant_1', 'driver_1', 'أحمد العميل', 'الرياض، حي النزهة، شارع 15', 3700, 1500, 5200, 'completed', '2026-06-18 10:00:00', '2026-06-18 11:00:00'),
('order_2', 'customer_1', 'restaurant_2', 'driver_1', 'أحمد العميل', 'الرياض، حي العليا، شارع 30', 3500, 2000, 5500, 'completed', '2026-06-18 12:00:00', '2026-06-18 12:45:00'),
('order_3', 'customer_2', 'restaurant_3', 'driver_2', 'سارة الزبونة', 'الرياض، حي السفارات', 3300, 1500, 4800, 'completed', '2026-06-17 18:00:00', '2026-06-17 18:35:00'),
('order_4', 'customer_1', 'restaurant_1', NULL, 'أحمد العميل', 'الرياض، حي النزهة، شارع 15', 2500, 1500, 4000, 'accepted_by_restaurant', '2026-06-19 09:00:00', '2026-06-19 09:10:00'),
('order_5', 'customer_2', 'restaurant_4', NULL, 'سارة الزبونة', 'الرياض، حي السفارات', 2300, 1000, 3300, 'ready_for_driver', '2026-06-19 09:30:00', '2026-06-19 09:45:00');

-- أصناف الطلبات
INSERT INTO order_items (id, order_id, menu_item_id, name, quantity, unit_price_cents, total_cents) VALUES
('oi_1', 'order_1', 'item_3', 'شاورما دجاج', 1, 2500, 2500),
('oi_2', 'order_1', 'item_1', 'حمص', 1, 1200, 1200),
('oi_3', 'order_2', 'item_6', 'بيتزا مارغريتا', 1, 3000, 3000),
('oi_4', 'order_2', 'item_8', 'ثومية', 1, 500, 500),
('oi_5', 'order_3', 'item_9', 'برجر لحم', 1, 2500, 2500),
('oi_6', 'order_3', 'item_11', 'بطاطس مقلية', 1, 800, 800),
('oi_7', 'order_4', 'item_4', 'كبسة لحم', 1, 2500, 2500),
('oi_8', 'order_5', 'item_13', 'شاورما لحم', 1, 1800, 1800),
('oi_9', 'order_5', 'item_15', 'حمص', 1, 500, 500);

-- أحداث الطلبات
INSERT INTO order_events (id, order_id, actor_user_id, event_type, note, created_at) VALUES
('oe_1', 'order_1', 'customer_1', 'order.created', 'New order placed', '2026-06-18 10:05:00'),
('oe_2', 'order_1', 'restaurant_user_1', 'restaurant.accepted', 'Order accepted by restaurant', '2026-06-18 10:10:00'),
('oe_3', 'order_1', 'driver_1', 'driver.accepted', 'Driver assigned', '2026-06-18 10:20:00'),
('oe_4', 'order_1', 'driver_1', 'driver.delivered', 'Delivered successfully', '2026-06-18 11:00:00');

-- المحافظ
INSERT INTO wallets (id, owner_type, owner_id, balance_cents, pending_cents) VALUES
('wallet_1', 'driver', 'driver_1', 15000, 2000),
('wallet_2', 'driver', 'driver_2', 8000, 500),
('wallet_3', 'restaurant', 'restaurant_1', 50000, 10000);

-- حركات المحفظة
INSERT INTO wallet_transactions (id, wallet_id, type, amount_cents, note, created_at) VALUES
('wt_1', 'wallet_1', 'credit', 1500, 'توصيل طلب order_1', '2026-06-18 11:00:00'),
('wt_2', 'wallet_1', 'credit', 2000, 'توصيل طلب order_2', '2026-06-18 12:45:00'),
('wt_3', 'wallet_1', 'debit', 5000, 'سحب نقدي', '2026-06-18 13:00:00'),
('wt_4', 'wallet_2', 'credit', 1500, 'توصيل طلب order_3', '2026-06-17 18:35:00'),
('wt_5', 'wallet_3', 'credit', 5200, 'قيمة طلب order_1', '2026-06-18 11:00:00');

-- الإشعارات
INSERT INTO notifications (id, user_id, title, body, type, is_read, created_at) VALUES
('notif_1', 'driver_1', 'طلب جديد', 'يوجد طلب جديد بالقرب منك', 'info', 0, '2026-06-19 09:00:00'),
('notif_2', 'driver_1', 'تم التوصيل', 'تم توصيل الطلب بنجاح', 'success', 1, '2026-06-18 11:00:00'),
('notif_3', 'driver_2', 'طلب جديد', 'يوجد طلب شاورما بالقرب منك', 'info', 0, '2026-06-19 09:30:00'),
('notif_4', 'customer_1', 'طلب قيد التجهيز', 'المطعم بدأ بتجهيز طلبك', 'info', 0, '2026-06-19 09:10:00'),
('notif_5', 'customer_2', 'طلب جاهز', 'طلبك جاهز، السائق في الطريق', 'success', 0, '2026-06-19 09:45:00');

-- العناوين
INSERT INTO addresses (id, user_id, name, details, lat, lng, is_default) VALUES
('addr_1', 'customer_1', 'المنزل', 'الرياض، حي النزهة، شارع 15، فيلا 7', 24.7136, 46.6753, 1),
('addr_2', 'customer_1', 'العمل', 'الرياض، حي العليا، شارع التخصصي، مبنى 22', 24.7236, 46.6853, 0),
('addr_3', 'customer_2', 'المنزل', 'الرياض، حي السفارات، شارع 5', 24.6936, 46.6653, 1);

-- الكوبونات
INSERT INTO coupons (id, code, amount_off_cents, percent_off, min_order_cents, active) VALUES
('coupon_1', 'WELCOME10', 1000, 0, 5000, 1),
('coupon_2', 'SAVE2', 0, 10, 3000, 1),
('coupon_3', 'FREEDEL', 1500, 0, 8000, 1);

-- تصنيفات المطاعم
INSERT INTO categories (id, name, name_ar, name_en, name_de, icon, sort_order) VALUES
('cat_1', 'شامي', 'شامي', 'Levantine', 'Levantinisch', '🥘', 1),
('cat_2', 'إيطالي', 'إيطالي', 'Italian', 'Italienisch', '🍝', 2),
('cat_3', 'برجر', 'برجر', 'Burger', 'Burger', '🍔', 3),
('cat_4', 'هندي', 'هندي', 'Indian', 'Indisch', '🍛', 4),
('cat_5', 'صيني', 'صيني', 'Chinese', 'Chinesisch', '🥡', 5),
('cat_6', 'شاورما', 'شاورما', 'Shawarma', 'Shawarma', '🌯', 6),
('cat_7', 'عصائر', 'عصائر', 'Juice', 'Säfte', '🧃', 7);

-- مواقع سابقة للسائقين
INSERT INTO driver_locations (id, driver_id, order_id, lat, lng, created_at) VALUES
('dl_1', 'driver_1', 'order_1', 24.7136, 46.6753, '2026-06-18 10:30:00'),
('dl_2', 'driver_1', 'order_1', 24.7236, 46.6853, '2026-06-18 10:40:00'),
('dl_3', 'driver_1', 'order_1', 24.7336, 46.6953, '2026-06-18 10:50:00'),
('dl_4', 'driver_2', 'order_3', 24.7036, 46.6653, '2026-06-17 18:10:00'),
('dl_5', 'driver_2', 'order_3', 24.6936, 46.6553, '2026-06-17 18:20:00');
