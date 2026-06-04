# Fairfood Launch Ready Lite

نسخة خفيفة وقريبة من الإطلاق، مربوطة مباشرة بـ:

- API: https://fairfood.fairfood100.workers.dev
- D1 Database ID: d6950e98-4c6b-4247-bb28-67438d08b806

## موجود داخل النسخة

- Landing / Home Website
- Customer App
- Restaurant Dashboard
- Driver App
- Admin Panel
- Register/Login حقيقي لكل الأدوار
- JWT Auth + RBAC
- Restaurant registration
- Driver registration
- Customer registration
- Menu management
- Orders lifecycle
- Restaurant prep time
- Restaurant small receipt print
- Driver order accept
- Driver navigation links
- Tracking Lite by status + ETA text
- Dispatch Lite: أقرب/أفضل سائق متاح حسب آخر موقع إذا موجود
- Wallet Lite
- Cash payments + payment provider placeholders
- Coupons
- Ratings
- Notifications داخل التطبيق
- Support tickets
- Documents management Lite
- Admin analytics
- Audit logs
- Basic rate limit
- Security headers
- Provider placeholders

## ما يحتاج تدخلك الخارجي فقط

- Stripe Account
- Google Maps Billing
- Apple Pay Merchant
- Google Pay Merchant
- Cloudflare R2 Bucket
- Domain DNS
- Email Provider
- SMS Provider
- Push Certificates

## نشر Backend

```bash
npm install
wrangler secret put JWT_SECRET
npm run d1:schema:remote
npm run d1:seed:remote
npm run deploy
```

## اختبار API

```bash
curl https://fairfood.fairfood100.workers.dev/api/health
```

## نشر Frontend على Cloudflare Pages

ارفع هذه المجلدات:

```text
landing/
customer/
restaurant/
driver/
admin/
assets/
```

الصفحات مربوطة مسبقًا بـ:
https://fairfood.fairfood100.workers.dev

## Demo Accounts

كلمة المرور للجميع:

```text
Password123!
```

```text
customer@fairfood.local
restaurant@fairfood.local
driver@fairfood.local
admin@fairfood.local
```
