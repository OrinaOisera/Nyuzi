"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { updateOrderStatus } from "@/lib/actions/orders";
import type { OrderStatus } from "@/types/database";

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pending",
  paid: "Paid",
  fulfilled: "Fulfilled",
  cancelled: "Cancelled",
};

const STATUSES: OrderStatus[] = ["pending", "paid", "fulfilled", "cancelled"];

interface OrderStatusSelectProps {
  orderId: string;
  status: OrderStatus;
}

export function OrderStatusSelect({ orderId, status }: OrderStatusSelectProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleChange(next: OrderStatus) {
    if (next === status) return;

    startTransition(async () => {
      const result = await updateOrderStatus(orderId, next);
      if (result.success) {
        router.refresh();
      }
    });
  }

  return (
    <select
      value={status}
      disabled={pending}
      onChange={(e) => handleChange(e.target.value as OrderStatus)}
      className="rounded-lg border border-stone-200 bg-white px-2 py-1.5 text-xs font-medium text-stone-700 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 disabled:opacity-50"
      aria-label="Update order status"
    >
      {STATUSES.map((value) => (
        <option key={value} value={value}>
          {pending && value === status ? "Saving…" : STATUS_LABELS[value]}
        </option>
      ))}
    </select>
  );
}
