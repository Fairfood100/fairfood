import { ok, error, onOptions } from "../../../utils/response.js";
import { verifyAuth } from "../../../utils/auth.js";

export const onRequestOptions = onOptions;

export async function onRequestGet(context) {
  const { request, env } = context;

  const user = await verifyAuth(request, env);
  if (!user) return error("Unauthorized", 401);

  const url = new URL(request.url);
  const action = url.searchParams.get("action") || "my";
  const orderId = url.searchParams.get("orderId");

  if (action === "my") {
    const rows = await env.DB.prepare(`
      SELECT *
      FROM orders
      WHERE customer_id = ?
      ORDER BY created_at DESC
    `)
      .bind(user.id)
      .all();

    return ok({
      orders: rows.results || []
    });
  }

  if (action === "details") {
    if (!orderId) return error("Missing orderId", 422);

    const row = await env.DB.prepare(`
      SELECT *
      FROM orders
      WHERE id = ?
    `)
      .bind(orderId)
      .first();

    return ok({
      order: row || null
    });
  }

  return error("Unknown action", 404);
}

export async function onRequestPost(context) {
  const { request, env } = context;

  const user = await verifyAuth(request, env);
  if (!user) return error("Unauthorized", 401);

  const body = await request.json();
  const action = body.action;

  if (action === "quote") {
    const subtotal = Number(body.subtotal || 0);

    const deliveryFee = subtotal >= 2500 ? 0 : 299;
    const serviceFee = Math.round(subtotal * 0.05);

    return ok({
      quoteId: crypto.randomUUID(),
      subtotal,
      deliveryFee,
      serviceFee,
      total: subtotal + deliveryFee + serviceFee
    });
  }

  if (action === "create") {
    const orderId = crypto.randomUUID();

    await env.DB.prepare(`
      INSERT INTO orders (
        id,
        customer_id,
        restaurant_id,
        status,
        total_amount,
        created_at
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `)
      .bind(
        orderId,
        user.id,
        body.restaurantId,
        "pending",
        body.totalAmount || 0,
        Date.now()
      )
      .run();

    return ok({
      orderId,
      status: "pending"
    });
  }

  if (action === "cancel") {
    await env.DB.prepare(`
      UPDATE orders
      SET status='cancelled'
      WHERE id=?
    `)
      .bind(body.orderId)
      .run();

    return ok({
      success: true
    });
  }

  return error("Unknown action", 404);
}
