import { ok, error, onOptions } from "../../../../utils/response.js";
import { requireAuth } from "../../../../utils/auth.js";
import { readJson, readFormData } from "../../../../utils/validation.js";

export const onRequestOptions = onOptions;

export async function onRequestPost({ request, env }) {
  const user = await requireAuth(request, env);
  if (!user) return error("Unauthorized", 401);

  const ct = request.headers.get("content-type") || "";
  const isForm = ct.includes("multipart/form-data");
  const body = isForm ? await readFormData(request) : await readJson(request);

  const restaurant = await env.DB.prepare("SELECT id FROM restaurants WHERE user_id = ?")
    .bind(user.sub)
    .first();

  if (!restaurant) return error("Restaurant not found", 404);

  const id = crypto.randomUUID();

  await env.DB.prepare(
    `
    INSERT INTO menu_items (id, restaurant_id, name, description, price_cents, category, available, image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `
  )
    .bind(
      id,
      restaurant.id,
      body.name,
      body.description || "",
      Number(body.price || 0),
      body.category || "",
      body.available === false ? 0 : 1,
      body.imageUrl || ""
    )
    .run();

  return ok({ id });
}