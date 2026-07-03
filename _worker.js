// ============================================================
// FAIRFOOD - نقطة الدخول لـ Cloudflare Pages
// ============================================================

import worker from "./backend/worker.js";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // 0. الملفات الثابتة تخدم مباشرة من ASSETS بدون الباك إند
    if (/\.(js|css|png|jpg|jpeg|gif|svg|ico|webp|json|woff2?|ttf|eot|mp3|mp4|pdf)$/i.test(path) ||
        path.startsWith('/assets/') || path.startsWith('/shared/')) {
      const asset = await env.ASSETS.fetch(request);
      if (asset.status !== 404) return asset;
    }

    // 1. مسارات API و WebSocket — نمررها للباك إند
    if (path.startsWith('/api/') || path === '/ws' || path === '/api/realtime' || path === '/api/v1/realtime') {
      return worker.fetch(request, env, ctx);
    }

    // 2. باقي المسارات: نحاول الباك إند أولاً، ونرجع ملف ثابت إذا ما لقى
    const response = await worker.fetch(request, env, ctx);
    try {
      const body = await response.clone().text();
      if (response.status === 404 || body.includes('ROUTE_NOT_FOUND')) {
        const asset = await env.ASSETS.fetch(request);
        if (asset.status !== 404) return asset;
        const prefix = path.split("/")[1];
        if (["customer", "driver", "restaurant", "admin"].includes(prefix)) {
          const index = await env.ASSETS.fetch(new Request(url.origin + "/" + prefix + "/index.html"));
          if (index.status !== 404) return index;
        }
      }
    } catch (_) {}

    return response;
  }
};
