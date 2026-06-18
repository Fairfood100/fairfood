// ============================================================
// FAIRFOOD - نقطة الدخول لـ Cloudflare Pages
// يحاول مسارات API أولاً، ثم يرسل الملفات الثابتة
// ============================================================

import worker from "./backend/worker.js";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. نحاول مسار API
    const response = await worker.fetch(request, env, ctx);

    // 2. إذا كان 404 "المسار غير موجود"، نبحث عن ملف ثابت
    try {
      const body = await response.clone().text();
      if (response.status === 404 || body.includes('"ROUTE_NOT_FOUND"')) {
        // محاولة جلب الملف الثابت
        const asset = await env.ASSETS.fetch(request);
        if (asset.status !== 404) {
          return asset;
        }
        // إذا ما لقيناه ونحن في مسار تطبيق، نعود للـ index.html حق التطبيق
        const prefix = url.pathname.split("/")[1];
        if (["customer", "driver", "restaurant", "admin"].includes(prefix)) {
          const index = await env.ASSETS.fetch(new Request(url.origin + "/" + prefix + "/index.html"));
          if (index.status !== 404) return index;
        }
      }
    } catch (_) {
      // تجاهل أخطاء قراءة الرد أو جلب الأصول
    }

    return response;
  }
};
