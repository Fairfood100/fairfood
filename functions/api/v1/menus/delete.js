import { ok, error, onOptions } from "../../../../utils/response.js";
import { requireAuth } from "../../../../utils/auth.js";
import { readJson } from "../../../../utils/validation.js";

export const onRequestOptions = onOptions;

export async function onRequestDelete({ request, env }) {
  const user = await requireAuth(request, env);
  if (!user) return error("Unauthorized", 401);

  const body = await readJson(request);

  const itemId = body.itemId || body.id;
  if (!itemId) return error("Missing item id", 422);

  await env.DB.prepare("DELETE FROM menu_items WHERE id = ?")
    .bind(itemId)
    .run();

  return ok({ deleted: true });
}