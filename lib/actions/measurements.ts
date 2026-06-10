"use server";

import { isDatabaseConfigured, queryOne } from "@/lib/db";
import { getBuyerId } from "@/lib/session-user";
import type { MeasurementInput } from "@/types/database";

export async function saveMeasurements(input: MeasurementInput) {
  const buyerId = await getBuyerId();

  if (!isDatabaseConfigured()) {
    return {
      success: true,
      measurementId: "mock-measurement-id",
      snapshot: input,
    };
  }

  try {
    const row = await queryOne<{ id: string }>(
      `insert into measurements (user_id, bust_cm, waist_cm, hips_cm, height_cm)
       values ($1, $2, $3, $4, $5)
       returning id`,
      [buyerId, input.bust_cm, input.waist_cm, input.hips_cm, input.height_cm]
    );

    if (!row) {
      return { success: false, error: "Failed to save measurements." };
    }

    return {
      success: true,
      measurementId: row.id,
      snapshot: input,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Database error";
    return { success: false, error: message };
  }
}
