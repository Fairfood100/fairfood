# Deploy

```bash
npm install
wrangler secret put JWT_SECRET
npm run d1:schema:remote
npm run d1:seed:remote
npm run deploy
curl https://fairfood.fairfood100.workers.dev/api/health
```

Upload to Cloudflare Pages:

```text
landing/
customer/
restaurant/
driver/
admin/
assets/
```

All frontend apps are connected to:
https://fairfood.fairfood100.workers.dev
