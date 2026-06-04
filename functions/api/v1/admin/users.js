import { ok, error, onOptions } from "../../../../utils/response.js";
import { requireAuth } from "../../../../utils/auth.js";

export const onRequestOptions = onOptions;

export async function onRequestGet({ request, env }) {
  const user = await requireAuth(request, env);
  if (!user || user.role !== "admin") return error("Forbidden", 403);

  const result = await env.DB.prepare(
    "SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC"
  ).all();

  return ok({ users: result.results || [] });
}