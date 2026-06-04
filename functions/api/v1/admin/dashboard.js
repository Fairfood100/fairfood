import { ok, error, onOptions } from "../../../../utils/response.js";
import { requireAuth } from "../../../../utils/auth.js";

export const onRequestOptions = onOptions;

export async function onRequestGet({ request, env }) {
  const user = await requireAuth(request, env);
  if (!user || user.role !== "admin") return error("Forbidden", 403);

  const users = await env.DB.prepare("SELECT COUNT(*) as count FROM users").first();
  const restaurants = await env.DB.prepare("SELECT COUNT(*) as count FROM restaurants").first();
  const orders = await env.DB.prepare("SELECT COUNT(*) as count FROM orders").first();

  return ok({
    users: users.count || 0,
    restaurants: restaurants.count || 0,
    orders: orders.count || 0
  });
}