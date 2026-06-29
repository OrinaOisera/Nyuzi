# Nyuzi Database (AWS Aurora PostgreSQL)

## Setup

1. Create an **Aurora PostgreSQL** cluster in AWS RDS.
2. Note the cluster endpoint, database name, username, and password.
3. Set your connection string in `.env.local`:

```
DATABASE_URL=postgresql://user:pass@your-cluster.cluster-xxxxx.region.rds.amazonaws.com:5432/nyuzi
DATABASE_SSL=true
```

4. Run the schema:

```bash
psql "$DATABASE_URL" -f database/schema.sql
```

**No `psql` installed?** Use the Node script (reads `.env.local` or exported env):

```bash
npm run db:test    # test connection
npm run db:setup   # schema + seed
```

Or install the client:

```bash
sudo apt install postgresql-client
```

5. Seed demo data:

```bash
psql "$DATABASE_URL" -f database/seed.sql
```

## Upgrading an existing database

If you created the database before palette colors, social impact, and `customization_snapshot` were added:

```bash
psql "$DATABASE_URL" -f database/migrations/002_palette_social_impact_customization.sql
```

This migration:

- Adds `palette_color` enum + column on `products`
- Adds `social_impact` on `artisans`
- Adds `customization_snapshot` on `orders` (copies from legacy `measurement_snapshot` if present)

See **[ARCHITECTURE.md](../ARCHITECTURE.md)** §6 for the full ER model and JSON snapshot shapes.

## Media storage

Garment overlay PNGs and product images can be stored in **AWS S3**. Set `AWS_S3_BUCKET` in `.env.local` and use public S3 URLs in the `overlay_png_url` and `image_url` columns.

For local development without S3, the app serves overlays from `public/overlays/`.

## Auth note

Aurora provides the database only — not authentication. For the hackathon demo, checkout uses NextAuth demo users when signed in. Add AWS Cognito or OAuth for production user sessions.
