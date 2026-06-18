import { ok, error, onOptions } from "../../../utils/response.js";

export const onRequestOptions = onOptions;

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const action = url.searchParams.get("action") || "restaurants";
  const restaurantId = url.searchParams.get("restaurantId") || url.searchParams.get("id");
  const q = (url.searchParams.get("q") || "").trim();

  if (action === "restaurants") {
    const rows = await env.DB.prepare(
      `SELECT * FROM restaurants
       WHERE COALESCE(status,'active') != 'deleted'
       ORDER BY created_at DESC`
    ).all();

    return ok({
      restaurants: (rows.results || []).map(formatRestaurant)
    });
  }

  if (action === "menu") {
    if (!restaurantId) return error("Missing restaurantId", 422);

    const rows = await env.DB.prepare(
      `SELECT * FROM menu_items
       WHERE restaurant_id = ?
       ORDER BY created_at DESC`
    ).bind(restaurantId).all();

    return ok({
      items: (rows.results || []).map(formatMenuItem),
      categories: buildCategories(rows.results || [])
    });
  }

  if (action === "categories") {
    const rows = await env.DB.prepare(
      `SELECT DISTINCT category FROM menu_items
       WHERE category IS NOT NULL AND category != ''
       ORDER BY category ASC`
    ).all();

    return ok({
      categories: (rows.results || []).map((x) => ({
        id: x.category,
        name: x.category
      }))
    });
  }

  if (action === "search") {
    const like = `%${q}%`;

    const restaurants = await env.DB.prepare(
      `SELECT * FROM restaurants
       WHERE name LIKE ? OR cuisine LIKE ? OR address LIKE ?
       ORDER BY created_at DESC
       LIMIT 50`
    ).bind(like, like, like).all();

    const items = await env.DB.prepare(
      `SELECT * FROM menu_items
       WHERE name LIKE ? OR description LIKE ? OR category LIKE ?
       ORDER BY created_at DESC
       LIMIT 50`
    ).bind(like, like, like).all();

    return ok({
      restaurants: (restaurants.results || []).map(formatRestaurant),
      items: (items.results || []).map(formatMenuItem)
    });
  }

  return error("Unknown catalog action", 404);
}

function formatRestaurant(r) {
  return {
    id: r.id,
    name: r.name,
    cuisine: r.cuisine || "",
    address: r.address || "",
    rating: Number(r.rating || 0),
    cover_image: r.cover_image || r.cover_image_url || r.image_url || "",
    logo_url: r.logo_url || "",
    delivery_fee_cents: Number(r.delivery_fee_cents || 0),
    min_order_cents: Number(r.min_order_cents || 0),
    delivery_time_min: Number(r.delivery_time_min || 20),
    delivery_time_max: Number(r.delivery_time_max || 45),
    status: r.status || "active",
    is_open: Boolean(r.is_open ?? r.open ?? 1)
  };
}

function formatMenuItem(i) {
  return {
    id: i.id,
    restaurant_id: i.restaurant_id,
    name: i.name,
    description: i.description || "",
    price_cents: Number(i.price_cents ?? i.price ?? 0),
    price: Number(i.price_cents ?? i.price ?? 0),
    category: i.category || "Menu",
    available: Boolean(i.available ?? 1),
    image: i.image || i.image_url || "",
    imageUrl: i.image_url || i.image || "",
    tags: i.tags || ""
  };
}

function buildCategories(items) {
  const set = new Set();
  for (const item of items) {
    if (item.category) set.add(item.category);
  }
  return Array.from(set).map((name) => ({ id: name, name }));
}
