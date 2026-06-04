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

  const summary = await env.DB.prepare(
    `
    SELECT 
      COUNT(*) as orders,
      COALESCE(SUM(total), 0) as total
    FROM orders
    WHERE restaurant_id = ? AND status = 'completed'
    `
  )
    .bind(restaurant.id)
    .first();

  return ok({
    summary: {
      today: 0,
      week: Number(summary.total || 0),
      commission: 0,
      orders: Number(summary.orders || 0)
    },
    history: []
  });
}