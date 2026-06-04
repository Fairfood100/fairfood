INSERT INTO users (id, name, email, password_hash, role)
VALUES
('admin_1', 'Admin', 'admin@fairfood.local', 'CHANGE_AFTER_REGISTER', 'admin');

INSERT INTO users (id, name, email, password_hash, role)
VALUES
('restaurant_user_1', 'Demo Restaurant Owner', 'restaurant@fairfood.local', 'CHANGE_AFTER_REGISTER', 'restaurant');

INSERT INTO restaurants (id, user_id, name, phone, address, is_open)
VALUES
('restaurant_1', 'restaurant_user_1', 'Demo Restaurant', '+491700000000', 'Frankfurt am Main', 0);