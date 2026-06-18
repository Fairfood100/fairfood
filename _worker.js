// ============================================================
// FAIRFOOD - Cloudflare Pages _worker.js
// هذا الملف يربط التطبيقات (Pages) مع الـ Worker الرئيسي
// يستورد الـ Worker من backend/worker.js
// ============================================================

// استيراد وتصدير الـ Worker الرئيسي من مجلد backend
export { default } from "./backend/worker.js";
