import { ok, error, onOptions } from "../../../../utils/response.js";
import { requireAuth } from "../../../../utils/auth.js";
import { readJson } from "../../../../utils/validation.js";

export const onRequestOptions = onOptions;

export async function onRequestDelete({ request, env }) {
  const user = await requireAuth(request, env);
  if (!user) return error("Unauthorized", 401);

  const body = await readJson(request);

  if (!body.id) return error("Missing item id", 422);

  await env.DB.prepare("DELETE FROM menu_items WHERE id = ?")
    .bind(body.id)
    .run();

  return ok({ deleted: true });
}