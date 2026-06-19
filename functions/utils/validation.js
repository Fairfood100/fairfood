export async function readJson(request) {
  const ct = request.headers.get("content-type") || "";
  if (!ct.includes("application/json")) {
    const text = await request.text();
    try { return JSON.parse(text); } catch { return {}; }
  }
  return request.json().catch(() => ({}));
}

export async function readFormData(request) {
  const formData = await request.formData().catch(() => new FormData());
  const obj = {};
  for (const [key, val] of formData.entries()) {
    obj[key] = val;
  }
  return obj;
}

export function required(body, fields) {
  for (const f of fields) {
    if (body[f] === undefined || body[f] === null || body[f] === "") {
      return { missing: f };
    }
  }
  return null;
}
