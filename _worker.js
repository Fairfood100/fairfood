import worker from "./backend/worker.js";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // API + WebSocket → backend
    if (path.startsWith('/api/') || path === '/ws') {
      return worker.fetch(request, env, ctx);
    }

    // Static files → ASSETS (مباشر)
    return env.ASSETS.fetch(request);
  }
};
