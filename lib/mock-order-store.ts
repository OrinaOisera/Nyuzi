import type {
  BuyerOrderWithDetails,
  MeasurementInput,
  OrderStatus,
  OrderWithDetails,
} from "@/types/database";
import { MOCK_ORDERS, MOCK_ARTISANS } from "@/lib/mock-data";

let orders: OrderWithDetails[] = MOCK_ORDERS.map((o) => ({ ...o }));

const artisanNames = new Map(MOCK_ARTISANS.map((a) => [a.id, a.display_name]));

function toBuyerOrder(order: OrderWithDetails): BuyerOrderWithDetails {
  return {
    id: order.id,
    buyer_id: order.buyer_id,
    artisan_id: order.artisan_id,
    product_id: order.product_id,
    stripe_session_id: order.stripe_session_id,
    stripe_payment_intent_id: order.stripe_payment_intent_id,
    amount_cents: order.amount_cents,
    status: order.status,
    measurement_snapshot: order.measurement_snapshot,
    created_at: order.created_at,
    product_name: order.product_name,
    artisan_name: artisanNames.get(order.artisan_id) ?? "Artisan",
  };
}

export function getMockArtisanOrders(artisanId: string): OrderWithDetails[] {
  return orders
    .filter((o) => o.artisan_id === artisanId)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export function getMockBuyerOrders(buyerId: string): BuyerOrderWithDetails[] {
  return orders
    .filter((o) => o.buyer_id === buyerId)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .map(toBuyerOrder);
}

export function addMockOrder(input: {
  buyer_id: string;
  artisan_id: string;
  product_id: string;
  amount_cents: number;
  status: OrderStatus;
  measurement_snapshot: MeasurementInput;
  product_name: string;
  buyer_name: string;
  artisan_name: string;
}): BuyerOrderWithDetails {
  const order: OrderWithDetails = {
    id: `o${Date.now()}`,
    buyer_id: input.buyer_id,
    artisan_id: input.artisan_id,
    product_id: input.product_id,
    stripe_session_id: null,
    stripe_payment_intent_id: null,
    amount_cents: input.amount_cents,
    status: input.status,
    measurement_snapshot: input.measurement_snapshot,
    created_at: new Date().toISOString(),
    product_name: input.product_name,
    buyer_name: input.buyer_name,
  };

  orders.unshift(order);
  return toBuyerOrder(order);
}

export function updateMockOrderStatus(
  orderId: string,
  artisanId: string,
  status: OrderStatus
): boolean {
  const index = orders.findIndex(
    (o) => o.id === orderId && o.artisan_id === artisanId
  );
  if (index === -1) return false;
  orders[index] = { ...orders[index], status };
  return true;
}
