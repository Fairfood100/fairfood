function base64url(input) {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function base64urlJson(obj) {
  return btoa(JSON.stringify(obj))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

async function hmac(message, secret) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  return crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
}

export async function signJwt(payload, secret, expiresInSeconds = 604800) {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);

  const body = {
    ...payload,
    iat: now,
    exp: now + expiresInSeconds
  };

  const encodedHeader = base64urlJson(header);
  const encodedBody = base64urlJson(body);
  const message = `${encodedHeader}.${encodedBody}`;
  const signature = base64url(await hmac(message, secret));

  return `${message}.${signature}`;
}

export async function verifyJwt(token, secret) {
  if (!token || !token.includes(".")) return null;

  const [header, body, signature] = token.split(".");
  const message = `${header}.${body}`;
  const expected = base64url(await hmac(message, secret));

  if (signature !== expected) return null;

  const payload = JSON.parse(atob(body.replaceAll("-", "+").replaceAll("_", "/")));

  if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null;

  return payload;
}