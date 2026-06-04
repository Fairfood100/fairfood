import { ok, error, onOptions } from "../../../../utils/response.js";
import { readJson, required } from "../../../../utils/validation.js";
import { hashPassword } from "../../../../utils/auth.js";
import { signJwt } from "../../../../utils/jwt.js";

export const onRequestOptions = onOptions;

export async function onRequestPost({ request, env }) {
  const body = await readJson(request);

  if (!required(body.name) || !required(body.email) || !required(body.password) || !required(body.role)) {
    return error("Missing required fields", 422);
  }

  const role = String(body.role).toLowerCase();

  if (!["customer", "restaurant", "driver", "admin"].includes(role)) {
    return error("Invalid role", 422);
  }

  const exists = await env.DB.prepare("SELECT id FROM users WHERE email = ?")
    .bind(body.email)
    .first();

  if (exists) return error("Email already registered", 409);

  const userId = crypto.randomUUID();
  const passwordHash = await hashPassword(body.password);

  await env.DB.prepare(
    "INSERT INTO users (id, name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)"
  )
    .bind(userId, body.name, body.email, passwordHash, role)
    .run();

  if (role === "restaurant") {
    const restaurantId = crypto.randomUUID();

    await env.DB.prepare(
      "INSERT INTO restaurants (id, user_id, name, phone, address, is_open) VALUES (?, ?, ?, ?, ?, 0)"
    )
      .bind(
        restaurantId,
        userId,
        body.restaurantName || body.name,
        body.phone || "",
        body.address || ""
      )
      .run();
  }

  const token = await signJwt(
    { sub: userId, role, email: body.email },
    env.JWT_SECRET || "dev_secret"
  );

  return ok({
    token,
    user: {
      id: userId,
      name: body.name,
      email: body.email,
      role
    }
  });
}