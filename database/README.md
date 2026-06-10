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

5. Seed demo data:

```bash
psql "$DATABASE_URL" -f database/seed.sql
```

## Media storage

Garment overlay PNGs and product images can be stored in **AWS S3**. Set `AWS_S3_BUCKET` in `.env.local` and use public S3 URLs in the `overlay_png_url` and `image_url` columns.

For local development without S3, the app serves overlays from `public/overlays/`.

## Auth note

Aurora provides the database only — not authentication. For the hackathon demo, checkout and measurements use the seeded demo buyer (`DEMO_BUYER_ID`). Add AWS Cognito or NextAuth later for real user sessions.
