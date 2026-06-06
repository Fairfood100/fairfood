import { ok, error, onOptions } from "../../utils/response.js";
import { verifyAuth } from "../../utils/auth.js";

export const onRequestOptions = onOptions;

export async function onRequestGet(context) {
  const { request, env } = context;

  const user = await verifyAuth(request, env);
  if (!user) return error("Unauthorized", 401);

  const url = new URL(request.url);
  const action = url.searchParams.get("action") || "wallet";

  if (action === "wallet") {
    const wallet = await env.DB.prepare(`
      SELECT *
      FROM wallets
      WHERE owner_id = ?
      LIMIT 1
    `)
      .bind(user.id)
      .first();

    return ok({
      wallet: wallet || {
        balance_cents: 0,
        pending_cents: 0
      }
    });
  }

  if (action === "transactions") {
    const tx = await env.DB.prepare(`
      SELECT *
      FROM wallet_transactions
      WHERE owner_id = ?
      ORDER BY created_at DESC
      LIMIT 100
    `)
      .bind(user.id)
      .all();

    return ok({
      transactions: tx.results || []
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

  if (action === "payment") {
    const paymentId = crypto.randomUUID();

    await env.DB.prepare(`
      INSERT INTO payments (
        id,
        user_id,
        amount_cents,
        status,
        created_at
      )
      VALUES (?, ?, ?, ?, ?)
    `)
      .bind(
        paymentId,
        user.id,
        body.amount_cents || 0,
        "pending",
        Date.now()
      )
      .run();

    return ok({
      paymentId,
      status: "pending"
    });
  }

  return error("Unknown action", 404);
}
