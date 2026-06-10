"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { execute, isDatabaseConfigured } from "@/lib/db";
import { updateMockOrderStatus } from "@/lib/mock-order-store";
import type { OrderStatus } from "@/types/database";

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  const session = await getSession();

  if (!session || session.role !== "artisan" || !session.artisanId) {
    return { success: false, error: "You must be signed in as an artisan." };
  }

  if (!isDatabaseConfigured()) {
    const updated = updateMockOrderStatus(orderId, session.artisanId, status);
    if (!updated) {
      return { success: false, error: "Order not found." };
    }
  } else {
    try {
      await execute(
        `update orders
         set status = $1::order_status
         where id = $2 and artisan_id = $3`,
        [status, orderId, session.artisanId]
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : "Database error";
      return { success: false, error: message };
    }
  }

  revalidatePath("/artisan/dashboard");
  return { success: true };
}
