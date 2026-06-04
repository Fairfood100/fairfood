export async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

export function required(value) {
  return value !== undefined && value !== null && String(value).trim() !== "";
}