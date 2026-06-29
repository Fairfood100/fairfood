# Fairfood

منصة طلب وتوصيل طعام متكاملة.

## المكونات

- Landing / Home Website
- Customer App
- Restaurant Dashboard
- Driver App
- Admin Panel
- Register/Login لكل الأدوار
- JWT Auth + RBAC
- سلسلة الطلبات الكاملة
- Wallet
- Coupons
- Push notifications
- Support tickets
- Admin analytics
- Audit logs

## النشر

```bash
npm install
wrangler secret put JWT_SECRET
wrangler d1 execute fairfood-db --file=./database/schema.sql
npm run deploy
```
