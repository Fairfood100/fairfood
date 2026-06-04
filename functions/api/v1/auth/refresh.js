import { ok, error, onOptions } from "../../../../utils/response.js";
import { requireAuth } from "../../../../utils/auth.js";
import { signJwt } from "../../../../utils/jwt.js";

export const onRequestOptions = onOptions;

export async function onRequestPost({ request, env }) {
  const user = await requireAuth(request, env);

  if (!user) return error("Unauthorized", 401);

  const token = await signJwt(
    { sub: user.sub, role: user.role, email: user.email },
    env.JWT_SECRET || "dev_secret"
  );

  return ok({ token });
}