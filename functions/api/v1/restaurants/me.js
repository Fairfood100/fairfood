import { ok, error, onOptions } from "../../../../utils/response.js";
import { requireAuth } from "../../../../utils/auth.js";

export const onRequestOptions = onOptions;

export async function onRequestGet({ request, env }) {
  const user = await requireAuth(request, env);

  if (!user) return error("Unauthorized", 401);

  const restaurant = await env.DB.prepare(
    "SELECT * FROM restaurants WHERE user_id = ?"
  )
    .bind(user.sub)
    .first();

  if (!restaurant) return error("Restaurant not found", 404);

  return ok({
    restaurant: {
      id: restaurant.id,
      name: restaurant.name,
      phone: restaurant.phone,
      address: restaurant.address,
      isOpen: Boolean(restaurant.is_open)
    }
  });
}