import { ok, error, onOptions } from "../../../../utils/response.js";
import { readJson } from "../../../../utils/validation.js";
import { verifyPassword } from "../../../../utils/auth.js";
import { signJwt } from "../../../../utils/jwt.js";

export const onRequestOptions = onOptions;

export async function onRequestPost({ request, env }) {
  const body = await readJson(request);

  const user = await env.DB.prepare("SELECT * FROM users WHERE email = ?")
    .bind(body.email || "")
    .first();

  if (!user) return error("Invalid email or password", 401);

  const valid = await verifyPassword(body.password || "", user.password_hash);

  if (!valid) return error("Invalid email or password", 401);

  const token = await signJwt(
    { sub: user.id, role: user.role, email: user.email },
    env.JWT_SECRET || "dev_secret"
  );

  return ok({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
}