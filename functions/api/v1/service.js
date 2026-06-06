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
  const action = url.searchParams.get("action") || "notifications";

  if (action === "notifications") {

    const rows = await env.DB.prepare(`
      SELECT *
      FROM notifications
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT 100
    `)
      .bind(user.id)
      .all();

    return ok({
      notifications: rows.results || []
    });
  }

  if (action === "ratings") {

    const rows = await env.DB.prepare(`
      SELECT *
      FROM ratings
      WHERE target_id = ?
      ORDER BY created_at DESC
    `)
      .bind(url.searchParams.get("targetId") || "")
      .all();

    return ok({
      ratings: rows.results || []
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

  /* SUPPORT */

  if (action === "support") {

    const ticketId = crypto.randomUUID();

    await env.DB.prepare(`
      INSERT INTO support_tickets (
        id,
        user_id,
        subject,
        message,
        status,
        created_at
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `)
      .bind(
        ticketId,
        user.id,
        body.subject || "Support",
        body.message || "",
        "open",
        Date.now()
      )
      .run();

    return ok({
      ticketId,
      status: "open"
    });
  }

  /* RATING */

  if (action === "rating") {

    const ratingId = crypto.randomUUID();

    await env.DB.prepare(`
      INSERT INTO ratings (
        id,
        user_id,
        target_type,
        target_id,
        stars,
        comment,
        created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)
      .bind(
        ratingId,
        user.id,
        body.targetType,
        body.targetId,
        body.stars || 5,
        body.comment || "",
        Date.now()
      )
      .run();

    return ok({
      ratingId
    });
  }

  /* CONTACT */

  if (action === "contact") {

    const contactId = crypto.randomUUID();

    await env.DB.prepare(`
      INSERT INTO contact_messages (
        id,
        user_id,
        name,
        email,
        message,
        created_at
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `)
      .bind(
        contactId,
        user.id,
        body.name || "",
        body.email || "",
        body.message || "",
        Date.now()
      )
      .run();

    return ok({
      contactId
    });
  }

  return error("Unknown action", 404);
}
