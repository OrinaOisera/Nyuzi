/**
 * Canonical app URL for redirects (Stripe, NextAuth, etc.)
 */
export function getAppUrl(): string {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

export function getAuthSecret(): string {
  const secret = process.env.NEXTAUTH_SECRET;

  if (secret) return secret;

  if (process.env.NODE_ENV === "production") {
    console.warn(
      "[Nyuzi] NEXTAUTH_SECRET is not set. Using fallback — set a secret in production."
    );
  }

  return "nyuzi-dev-secret-change-in-production";
}

export function isProductionConfigured(): {
  ok: boolean;
  warnings: string[];
} {
  const warnings: string[] = [];

  if (process.env.NODE_ENV === "production") {
    if (!process.env.NEXTAUTH_SECRET) {
      warnings.push("NEXTAUTH_SECRET is not set");
    }
    if (!process.env.NEXTAUTH_URL && !process.env.VERCEL_URL) {
      warnings.push("NEXTAUTH_URL or VERCEL_URL is not set");
    }
    if (!process.env.NEXT_PUBLIC_APP_URL && !process.env.VERCEL_URL) {
      warnings.push("NEXT_PUBLIC_APP_URL is not set");
    }
  }

  return { ok: warnings.length === 0, warnings };
}
