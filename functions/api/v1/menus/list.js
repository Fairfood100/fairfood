import { ok, error, onOptions } from "../../../../utils/response.js";
import { requireAuth } from "../../../../utils/auth.js";

export const onRequestOptions = onOptions;

export async function onRequestGet({ request, env }) {
  const user = await requireAuth(request, env);
  if (!user) return error("Unauthorized", 401);

  const url = new URL(request.url);
  let restaurantId = url.searchParams.get("restaurantId");

  if (!restaurantId && user.role === "restaurant") {
    const restaurant = await env.DB.prepare("SELECT id FROM restaurants WHERE owner_user_id = ?")
      .bind(user.sub)
      .first();

    restaurantId = restaurant?.id;
  }

  if (!restaurantId) return error("Missing restaurantId", 422);

  const items = await env.DB.prepare(
    "SELECT * FROM menu_items WHERE restaurant_id = ? ORDER BY created_at DESC"
  )
    .bind(restaurantId)
    .all();

  return ok({
    items: (items.results || []).map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price_cents / 100,
      price_cents: item.price_cents,
      category: item.category,
      available: Boolean(item.available),
      imageUrl: item.image
    })),
    categories: []
  });
}