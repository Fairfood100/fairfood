import { ok, error, onOptions } from "../../utils/response.js";
import { verifyAuth } from "../../utils/auth.js";

export const onRequestOptions = onOptions;

export async function onRequestPost(context) {
  const { request, env } = context;

  const user = await verifyAuth(request, env);
  if (!user) return error("Unauthorized", 401);

  const body = await request.json();

  const action = body.action;
  const orderId = body.orderId;

  if (!orderId) {
    return error("Missing orderId", 422);
  }

  /* ACCEPT */

  if (action === "accept") {

    await env.DB.prepare(`
      UPDATE orders
      SET
        driver_id = ?,
        status = 'accepted'
      WHERE id = ?
    `)
      .bind(user.id, orderId)
      .run();

    return ok({
      success: true,
      status: "accepted"
    });
  }

  /* REJECT */

  if (action === "reject") {

    return ok({
      success: true,
      status: "rejected"
    });
  }

  /* READY */

  if (action === "ready") {

    await env.DB.prepare(`
      UPDATE orders
      SET status='ready'
      WHERE id=?
    `)
      .bind(orderId)
      .run();

    return ok({
      success: true,
      status: "ready"
    });
  }

  /* PICKUP */

  if (action === "pickup") {

    await env.DB.prepare(`
      UPDATE orders
      SET status='picked_up'
      WHERE id=?
    `)
      .bind(orderId)
      .run();

    return ok({
      success: true,
      status: "picked_up"
    });
  }

  /* DELIVERED */

  if (action === "delivered") {

    await env.DB.prepare(`
      UPDATE orders
      SET
        status='delivered',
        delivered_at=?
      WHERE id=?
    `)
      .bind(Date.now(), orderId)
      .run();

    return ok({
      success: true,
      status: "delivered"
    });
  }

  return error("Unknown action", 404);
}
