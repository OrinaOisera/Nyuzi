/**
 * Run schema + seed against DATABASE_URL (no psql required).
 *
 * Usage:
 *   export DATABASE_URL="postgresql://..."
 *   export DATABASE_SSL=true
 *   npm run db:setup
 *
 * Or put DATABASE_URL in .env.local and run npm run db:setup
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function loadEnvLocal() {
  const envPath = path.join(root, ".env.local");
  if (!fs.existsSync(envPath)) return;

  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

async function runSqlFile(client, relativePath) {
  const fullPath = path.join(root, relativePath);
  const sql = fs.readFileSync(fullPath, "utf8");
  process.stdout.write(`Running ${relativePath}... `);
  await client.query(sql);
  process.stdout.write("done\n");
}

async function main() {
  loadEnvLocal();

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error(
      "DATABASE_URL is not set.\n" +
        "  export DATABASE_URL=\"postgresql://user:pass@host:5432/nyuzi\"\n" +
        "  export DATABASE_SSL=true\n" +
        "Or add DATABASE_URL to .env.local"
    );
    process.exit(1);
  }

  const client = new pg.Client({
    connectionString,
    ssl:
      process.env.DATABASE_SSL === "true"
        ? { rejectUnauthorized: false }
        : undefined,
  });

  await client.connect();
  console.log("Connected.\n");

  try {
    await runSqlFile(client, "database/schema.sql");
    await runSqlFile(client, "database/seed.sql");

    const products = await client.query(
      "SELECT count(*)::int AS count FROM products"
    );
    const artisans = await client.query(
      "SELECT count(*)::int AS count FROM artisans"
    );
    console.log(`\n✓ ${products.rows[0].count} products, ${artisans.rows[0].count} artisans`);
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error("\nDatabase setup failed:", err.message);
  process.exit(1);
});
