import { ok, error, onOptions } from "../../../../utils/response.js";
import { requireAuth } from "../../../../utils/auth.js";
import { readJson } from "../../../../utils/validation.js";

export const onRequestOptions = onOptions;

export async function onRequestPut({ request, env }) {
  const user = await requireAuth(request, env);
  if (!user) return error("Unauthorized", 401);

  const body = await readJson(request);

  if (!body.id) return error("Missing item id", 422);

  await env.DB.prepare(
    `
    UPDATE menu_items
    SET name = ?, description = ?, price = ?, category = ?, available = ?, image_url = ?
    WHERE id = ?
    `
  )
    .bind(
      body.name,
      body.description || "",
      Number(body.price || 0),
      body.category || "",
      body.available === false ? 0 : 1,
      body.imageUrl || "",
      body.id
    )
    .run();

  return ok({ updated: true });
}