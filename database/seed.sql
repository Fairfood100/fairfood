-- ============================================================
-- FAIRFOOD بيانات تجريبية
-- ============================================================

-- المستخدمون (كلمة المرور للجميع: Password123!)
INSERT INTO users (id, name, email, password_hash, role, phone, status) VALUES
('admin_1', 'Admin', 'admin@fairfood.local', 'sha256$79ountm4gfvkm3sg$c1838fbab0acb63c21772146fb942b5b7264b552d1eee35b4d069fd83fec45c9', 'admin', '+966500000000', 'active'),
('customer_1', 'أحمد العميل', 'customer@fairfood.local', 'sha256$79ountm4gfvkm3sg$c1838fbab0acb63c21772146fb942b5b7264b552d1eee35b4d069fd83fec45c9', 'customer', '+966500000001', 'active'),
('restaurant_user_1', 'مطعم الركن الشامي', 'restaurant@fairfood.local', 'sha256$79ountm4gfvkm3sg$c1838fbab0acb63c21772146fb942b5b7264b552d1eee35b4d069fd83fec45c9', 'restaurant', '+966500000002', 'active'),
('driver_user_1', 'خالد السائق', 'driver@fairfood.local', 'sha256$79ountm4gfvkm3sg$c1838fbab0acb63c21772146fb942b5b7264b552d1eee35b4d069fd83fec45c9', 'driver', '+966500000003', 'active');

-- المطاعم
INSERT INTO restaurants (id, owner_user_id, name, description, address, cuisine, lat, lng, delivery_fee_cents, min_order_cents, delivery_time_min, delivery_time_max, is_open, status, verification_status, phone, rating) VALUES
('restaurant_1', 'restaurant_user_1', 'مطعم الركن الشامي', 'أشهى المأكولات الشامية', 'الرياض، المملكة العربية السعودية', 'شامي', 24.7136, 46.6753, 1500, 5000, 25, 45, 1, 'open', 'approved', '+966500000010', 4.5),
('restaurant_2', 'restaurant_user_1', 'بيتزا نابولي', 'بيتزا إيطالية أصلية', 'جدة، المملكة العربية السعودية', 'إيطالي', 21.4858, 39.1925, 2000, 3000, 20, 40, 1, 'open', 'approved', '+966500000011', 4.2),
('restaurant_3', 'restaurant_user_1', 'برجر هاوس', 'برجر طازج يومياً', 'الدمام، المملكة العربية السعودية', 'أمريكي', 26.4207, 50.0888, 1500, 4000, 15, 30, 1, 'open', 'approved', '+966500000012', 4.0);

-- تصنيفات المطاعم
INSERT INTO categories (id, name, name_ar, name_en, name_de, icon, sort_order) VALUES
('cat_1', 'شامي', 'شامي', 'Levantine', 'Levantinisch', '🥘', 1),
('cat_2', 'إيطالي', 'إيطالي', 'Italian', 'Italienisch', '🍝', 2),
('cat_3', 'برجر', 'برجر', 'Burger', 'Burger', '🍔', 3),
('cat_4', 'هندي', 'هندي', 'Indian', 'Indisch', '🍛', 4),
('cat_5', 'صيني', 'صيني', 'Chinese', 'Chinesisch', '🥡', 5);

-- أصناف القائمة (باستخدام price_cents)
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
('item_12', 'restaurant_3', 'مشروبات', 'كوكاكولا', 'مشروب غازي', 500, '', 1, 200);

-- السائقون
INSERT INTO drivers (id, user_id, status, vehicle, plate_number, vehicle_model, verification_status, lat, lng, total_deliveries, rating) VALUES
('driver_1', 'driver_user_1', 'online', 'car', 'ABC 1234', 'Toyota Camry 2020', 'approved', 24.7136, 46.6753, 150, 4.8);

-- الكوبونات
INSERT INTO coupons (id, code, amount_off_cents, percent_off, min_order_cents, active) VALUES
('coupon_1', 'WELCOME10', 1000, 0, 5000, 1),
('coupon_2', 'SAVE2', 0, 10, 3000, 1),
('coupon_3', 'FREEDEL', 1500, 0, 8000, 1);
