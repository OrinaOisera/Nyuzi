import { NextResponse } from "next/server";
import { isDatabaseConfigured } from "@/lib/db";
import { getAppUrl, isProductionConfigured } from "@/lib/env";
import { isStripeConfigured } from "@/lib/stripe";

export async function GET() {
  const config = isProductionConfigured();

  return NextResponse.json({
    status: "ok",
    app: "nyuzi",
    timestamp: new Date().toISOString(),
    appUrl: getAppUrl(),
    features: {
      database: isDatabaseConfigured(),
      stripe: isStripeConfigured(),
      mockData: !isDatabaseConfigured(),
    },
    config: {
      productionReady: config.ok,
      warnings: config.warnings,
    },
  });
}
