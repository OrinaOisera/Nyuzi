# Deploying Nyuzi to Vercel

Nyuzi runs on Vercel with **no database required** for the demo — mock data is used automatically when `DATABASE_URL` is unset.

## 1. Push to GitHub

Ensure your latest code is on GitHub (branch `main`).

## 2. Import in Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Nyuzi repository
3. Framework preset: **Next.js** (auto-detected)
4. Root directory: `.` (project root)

## 3. Environment variables

Set these in **Project → Settings → Environment Variables**:

| Variable | Required | Example |
|----------|----------|---------|
| `NEXTAUTH_SECRET` | **Yes** | Run `openssl rand -base64 32` |
| `NEXTAUTH_URL` | **Yes** | `https://your-app.vercel.app` |
| `NEXT_PUBLIC_APP_URL` | **Yes** | Same as `NEXTAUTH_URL` |

Optional (for real payments / database):

| Variable | Purpose |
|----------|---------|
| `STRIPE_SECRET_KEY` | Real Stripe checkout |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe client |
| `STRIPE_WEBHOOK_SECRET` | Webhook verification |
| `DATABASE_URL` | Aurora PostgreSQL |
| `DATABASE_SSL` | `true` for Aurora |

## 4. Deploy

Click **Deploy**. First build takes ~1–2 minutes.

## 5. Verify

After deploy, check:

- Homepage: `https://your-app.vercel.app`
- Health: `https://your-app.vercel.app/api/health`

The health endpoint reports whether Stripe and the database are configured.

## 6. Stripe webhooks (optional)

If using real Stripe:

1. Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-app.vercel.app/api/webhooks/stripe`
3. Event: `checkout.session.completed`
4. Copy signing secret → `STRIPE_WEBHOOK_SECRET` in Vercel
5. Redeploy

## Demo without env vars

For a minimal Devpost demo, only set the three **Required** auth variables. Everything else works in demo mode:

- Mock product catalog
- Demo checkout (no Stripe)
- NextAuth demo sign-in

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Sign-in fails on Vercel | Set `NEXTAUTH_URL` and `NEXTAUTH_SECRET` |
| Stripe redirect wrong URL | Set `NEXT_PUBLIC_APP_URL` to your Vercel domain |
| Images not loading | Unsplash is allowed in `next.config.ts` — redeploy if changed |
