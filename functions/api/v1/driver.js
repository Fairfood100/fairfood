import { ok, error, onOptions } from "../../utils/response.js";
import { verifyAuth } from "../../utils/auth.js";

export const onRequestOptions = onOptions;

/* ===========================
   GET
=========================== */
export async function onRequestGet(context) {
  const { request, env } = context;

  const user = await verifyAuth(request, env);
  if (!user) return error("Unauthorized", 401);

  const url = new URL(request.url);
  const action = url.searchParams.get("action") || "me";

  if (action === "me") {
    const driver = await env.DB.prepare(`
      SELECT *
      FROM drivers
      WHERE user_id = ?
      LIMIT 1
    `)
      .bind(user.id)
      .first();

    return ok({
      driver: driver || null
    });
  }

  if (action === "current") {
    const order = await env.DB.prepare(`
      SELECT *
      FROM orders
      WHERE driver_id = ?
      AND status IN (
        'accepted',
        'ready',
        'picked_up',
        'on_way'
      )
      ORDER BY created_at DESC
      LIMIT 1
    `)
      .bind(user.id)
      .first();

    return ok({
      currentOrder: order || null
    });
  }

  return error("Unknown action", 404);
}

/* ===========================
   POST
=========================== */
export async function onRequestPost(context) {
  const { request, env } = context;

  const user = await verifyAuth(request, env);
  if (!user) return error("Unauthorized", 401);

  const body = await request.json();
  const action = body.action;

  if (action === "online") {
    await env.DB.prepare(`
      UPDATE drivers
      SET online = 1
      WHERE user_id = ?
    `)
      .bind(user.id)
      .run();

    return ok({
      online: true
    });
  }

  if (action === "offline") {
    await env.DB.prepare(`
      UPDATE drivers
      SET online = 0
      WHERE user_id = ?
    `)
      .bind(user.id)
      .run();

    return ok({
      online: false
    });
  }

  if (action === "location") {
    await env.DB.prepare(`
      UPDATE drivers
      SET
        lat = ?,
        lng = ?,
        last_location_at = ?
      WHERE user_id = ?
    `)
      .bind(
        body.lat,
        body.lng,
        Date.now(),
        user.id
      )
      .run();

    return ok({
      success: true
    });
  }

  if (action === "available") {
    await env.DB.prepare(`
      UPDATE drivers
      SET available = ?
      WHERE user_id = ?
    `)
      .bind(
        body.available ? 1 : 0,
        user.id
      )
      .run();

    return ok({
      available: !!body.available
    });
  }

  return error("Unknown action", 404);
}
