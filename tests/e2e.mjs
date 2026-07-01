/**
 * Integration (E2E) test for Fairfood backend API
 *
 * Usage:
 *   1. Start dev server:  npm run dev
 *   2. Run tests:         node tests/e2e.mjs
 *
 * Requires a local dev server running on http://localhost:8788.
 * Set BASE_URL env var to override (e.g., production URL).
 */

const BASE = process.env.BASE_URL || 'http://localhost:8788';
const API = `${BASE}/api/v1`;

let passed = 0;
let failed = 0;

async function test(name, fn) {
  try {
    await fn();
    passed++;
    console.log(`  ✅ ${name}`);
  } catch (e) {
    failed++;
    console.log(`  ❌ ${name}: ${e.message}`);
  }
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg || 'Assertion failed');
}

async function api(method, path, body, token) {
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' }
  };
  if (body) opts.body = JSON.stringify(body);
  if (token) opts.headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API}${path}`, opts);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || data.error?.message || `HTTP ${res.status}`);
  return data.data || data;
}

// ---------------------------------------------------------------------------
// Main test suite
// ---------------------------------------------------------------------------
async function main() {
  console.log(`\n🧪 Fairfood Integration Tests (BASE=${BASE})\n`);

  // Generate unique test IDs to avoid collisions
  const ts = Date.now();

  // ── Health check ──
  await test('GET /health returns ok', async () => {
    const res = await fetch(`${BASE}/api/health`);
    assert(res.ok, `Expected 200 got ${res.status}`);
  });

  // ── Restaurant registration ──
  let restaurantToken;
  let restaurantId;

  await test('POST /auth/register (restaurant)', async () => {
    const res = await api('POST', '/auth/register', {
      role: 'restaurant',
      name: `Test Restaurant ${ts}`,
      email: `rest${ts}@test.com`,
      phone: `+9665${String(ts).slice(-8)}`,
      password: 'testpass123',
      restaurantName: `Test Restaurant ${ts}`,
      address: 'Test Address, Riyadh',
      cuisine: 'سعودي'
    });
    restaurantToken = res.token;
    restaurantId = res.user?.id || res.data?.user?.id;
    assert(restaurantToken, 'No token returned');
  });

  // ── Restaurant login ──
  await test('POST /auth/login (restaurant)', async () => {
    const res = await api('POST', '/auth/login', {
      email: `rest${ts}@test.com`,
      password: 'testpass123',
      role: 'restaurant'
    });
    assert(res.token, 'No token returned');
    restaurantToken = res.token;
  });

  // ── Get restaurant profile ──
  await test('GET /restaurant/profile (restaurant)', async () => {
    const res = await api('GET', '/restaurant/profile', null, restaurantToken);
    assert(res.name, 'Missing restaurant name');
  });

  // ── Update restaurant settings ──
  await test('PUT /restaurant/:id (restaurant)', async () => {
    const res = await api('PUT', `/restaurant/${restaurantId}`, {
      name: `Updated Restaurant ${ts}`,
      phone: `+9665${String(ts + 1).slice(-8)}`,
      address: 'Updated Address, Jeddah',
      lat: 21.4858,
      lng: 39.1925,
      openingTime: '08:00',
      closingTime: '23:00',
      isOpen: true
    }, restaurantToken);
    assert(res.restaurant || res.name, 'Update failed');
  });

  // ── Create menu category ──
  let categoryId;
  await test('POST /menus/categories (restaurant)', async () => {
    const res = await api('POST', '/menus/categories', {
      name: 'مشروبات'
    }, restaurantToken);
    categoryId = res.id || res.category?.id;
    assert(categoryId, 'No category id');
  });

  // ── Create menu item ──
  let itemId;
  await test('POST /menus/create (restaurant)', async () => {
    const res = await api('POST', '/menus/create', {
      name: 'عصير برتقال',
      description: 'عصير طازج',
      price: 15.00,
      category_id: categoryId,
      available: true
    }, restaurantToken);
    itemId = res.id || res.item?.id;
    assert(itemId, 'No item id');
  });

  // ── List menu items ──
  await test('GET /menus/list', async () => {
    const items = await api('GET', `/menus/list?restaurant_id=${restaurantId}`, null, restaurantToken);
    assert(Array.isArray(items), 'Expected array');
    assert(items.length > 0, 'Expected at least one item');
  });

  // ── Update menu item ──
  await test('PUT /menus/update/:id (restaurant)', async () => {
    const res = await api('PUT', `/menus/update/${itemId}`, {
      name: 'عصير مانجو',
      price: 20.00
    }, restaurantToken);
    assert(res.id || res.item, 'Update failed');
  });

  // ── Customer registration ──
  let customerToken;
  await test('POST /auth/register (customer)', async () => {
    const res = await api('POST', '/auth/register', {
      role: 'customer',
      name: `Test Customer ${ts}`,
      email: `cust${ts}@test.com`,
      password: 'testpass123'
    });
    customerToken = res.token;
    assert(customerToken, 'No token returned');
  });

  // ── Add address ──
  await test('POST /profile/addresses (customer)', async () => {
    const res = await api('POST', '/profile/addresses', {
      name: 'المنزل',
      address: 'Riyadh, Olaya Street',
      lat: 24.7136,
      lng: 46.6753
    }, customerToken);
    assert(res.id || res.address, 'No address id');
  });

  // ── Get addresses ──
  await test('GET /profile/addresses (customer)', async () => {
    const addrs = await api('GET', '/profile/addresses', null, customerToken);
    assert(Array.isArray(addrs), 'Expected array');
    assert(addrs.length > 0, 'Expected at least one address');
  });

  // ── Get nearby restaurants ──
  await test('GET /restaurants/nearby (customer)', async () => {
    const restaurants = await api('GET', `/restaurants/nearby?lat=24.7136&lng=46.6753&radius=50`, null, customerToken);
    assert(Array.isArray(restaurants), 'Expected array');
  });

  // ── Get quote ──
  await test('POST /orders/quote (customer)', async () => {
    const quote = await api('POST', '/orders/quote', {
      restaurant_id: restaurantId,
      items: [{ menu_item_id: itemId, quantity: 2 }]
    }, customerToken);
    assert(quote.total || quote.subtotal, 'No quote data');
  });

  // ── Place order ──
  let orderId;
  await test('POST /orders (customer)', async () => {
    const order = await api('POST', '/orders', {
      restaurant_id: restaurantId,
      delivery_address: 'Riyadh, Olaya Street',
      payment_method: 'cash',
      delivery_note: '',
      items: [{ menu_item_id: itemId, quantity: 2 }]
    }, customerToken);
    orderId = order.id;
    assert(orderId, 'No order id');
  });

  // ── Get my orders ──
  await test('GET /orders/my (customer)', async () => {
    const orders = await api('GET', '/orders/my', null, customerToken);
    assert(Array.isArray(orders), 'Expected array');
  });

  // ── Summary ──
  console.log(`\n📊 Results: ${passed} passed, ${failed} failed, ${passed + failed} total\n`);

  // Exit with proper code
  process.exit(failed > 0 ? 1 : 0);
}

main().catch(e => {
  console.error('Fatal:', e.message);
  process.exit(1);
});
