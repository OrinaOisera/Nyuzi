# Nyuzi

Custom African fashion marketplace — browse artisan garments, virtual try-on with your measurements, and checkout via Stripe.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

No `.env.local` is required for local development. The app uses mock data from `lib/mock-data.ts` when `DATABASE_URL` is not set.

## Demo script (for judges)

1. **Homepage** — scroll through “How Nyuzi works” and featured artisans.
2. **Shop** — filter by occasion, open any product → **Virtual try-on**.
3. **Try-on** — upload a photo, adjust measurements, preview the garment overlay.
4. **Checkout** — click **Order custom fit** (demo mode works without Stripe keys).
5. **Buyer account** — `/login` → **Demo Buyer** → **My orders** to see the order.
6. **Artisan account** — sign in as **Amara Okafor** → **Dashboard** → update order status to Fulfilled.
7. **Sign back in as buyer** — confirm status updated in **My orders**.

## Optional setup

Copy the example env file:

```bash
cp .env.local.example .env.local
```

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | AWS Aurora PostgreSQL connection |
| `STRIPE_*` | Real Stripe checkout (without keys, demo checkout works) |
| `NEXT_PUBLIC_APP_URL` | App URL for Stripe redirects |
| `NEXTAUTH_URL` / `NEXTAUTH_SECRET` | Sign-in sessions (NextAuth) |

### Database

See [database/README.md](database/README.md) for Aurora setup, schema, and seed instructions.

### Deploy (Vercel)

1. Push to GitHub and import the repo in Vercel.
2. Set environment variables from `.env.local.example`.
3. Deploy — Next.js 16 App Router is supported out of the box.
4. For Stripe webhooks, point to `https://your-domain.com/api/webhooks/stripe`.

## Routes

| Path | Description |
|------|-------------|
| `/` | Product catalog with occasion filters |
| `/artisan/[slug]` | Artisan profile and collection |
| `/try-on/[productId]` | Virtual try-on + measurements + checkout |
| `/checkout/success` | Order confirmation |
| `/account/orders` | Buyer order history (requires buyer sign-in) |
| `/login` | Demo sign-in via NextAuth (buyer or artisan) |
| `/artisan/dashboard` | Artisan orders + status updates (requires sign-in) |

## Stack

Next.js 16 · React 19 · Tailwind CSS 4 · PostgreSQL · Stripe · NextAuth
