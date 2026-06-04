import { ok, error, onOptions } from "../../../../utils/response.js";
import { requireAuth } from "../../../../utils/auth.js";
import { readJson } from "../../../../utils/validation.js";

export const onRequestOptions = onOptions;

export async function onRequestPut({ request, env }) {
  const user = await requireAuth(request, env);
  if (!user) return error("Unauthorized", 401);

  const body = await readJson(request);

  const restaurant = await env.DB.prepare(
    "SELECT * FROM restaurants WHERE user_id = ?"
  )
    .bind(user.sub)
    .first();

  if (!restaurant) return error("Restaurant not found", 404);

  await env.DB.prepare(
    "UPDATE restaurants SET name = ?, phone = ?, address = ?, is_open = ? WHERE id = ?"
  )
    .bind(
      body.name || restaurant.name,
      body.phone || restaurant.phone || "",
      body.address || restaurant.address || "",
      body.isOpen ? 1 : 0,
      restaurant.id
    )
    .run();

  return ok({ updated: true });
}