import { ok, error, onOptions } from "../../../../utils/response.js";
import { requireAuth } from "../../../../utils/auth.js";
import { readJson } from "../../../../utils/validation.js";

export const onRequestOptions = onOptions;

export async function onRequestPost({ request, env }) {
  const user = await requireAuth(request, env);
  if (!user) return error("Unauthorized", 401);

  const body = await readJson(request);
  if (!body.orderId) return error("Missing orderId", 422);

  await env.DB.prepare(
    "UPDATE orders SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP WHERE id = ?"
  )
    .bind(body.orderId)
    .run();

  return ok({ rejected: true });
}