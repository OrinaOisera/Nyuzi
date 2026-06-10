"use server";

import { execute, isDatabaseConfigured } from "@/lib/db";
import { getProduct } from "@/lib/data";
import { getSession } from "@/lib/auth";
import { addMockOrder } from "@/lib/mock-order-store";
import { getBuyerId } from "@/lib/session-user";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import type { MeasurementInput } from "@/types/database";

interface CheckoutInput {
  productId: string;
  measurements: MeasurementInput;
}

export async function createCheckoutSession(input: CheckoutInput) {
  const product = await getProduct(input.productId);

  if (!product) {
    return { success: false, error: "Product not found." };
  }

  if (!isStripeConfigured()) {
    const buyerId = await getBuyerId();
    const session = await getSession();

    if (!isDatabaseConfigured()) {
      addMockOrder({
        buyer_id: buyerId,
        artisan_id: product.artisan_id,
        product_id: product.id,
        amount_cents: product.price_cents,
        status: "paid",
        measurement_snapshot: input.measurements,
        product_name: product.name,
        buyer_name: session?.fullName ?? "Demo Buyer",
        artisan_name: product.artisan.display_name,
      });
    }

    return {
      success: true,
      demo: true,
      message: `Demo checkout: ${product.name} — $${(product.price_cents / 100).toFixed(2)}. Add Stripe keys to enable real payments.`,
      metadata: {
        product_id: product.id,
        artisan_id: product.artisan_id,
        ...input.measurements,
      },
    };
  }

  const stripe = getStripe();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const buyerId = await getBuyerId();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            description: `Custom-fit by ${product.artisan.display_name}`,
            images: [product.image_url],
          },
          unit_amount: product.price_cents,
        },
        quantity: 1,
      },
    ],
    metadata: {
      buyer_id: buyerId,
      artisan_id: product.artisan_id,
      product_id: product.id,
      bust_cm: String(input.measurements.bust_cm),
      waist_cm: String(input.measurements.waist_cm),
      hips_cm: String(input.measurements.hips_cm),
      height_cm: String(input.measurements.height_cm),
    },
    success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&productId=${product.id}`,
    cancel_url: `${appUrl}/try-on/${product.id}`,
  });

  if (isDatabaseConfigured()) {
    await execute(
      `insert into orders (
         buyer_id, artisan_id, product_id, stripe_session_id,
         amount_cents, status, measurement_snapshot
       ) values ($1, $2, $3, $4, $5, 'pending', $6::jsonb)`,
      [
        buyerId,
        product.artisan_id,
        product.id,
        session.id,
        product.price_cents,
        JSON.stringify(input.measurements),
      ]
    );
  }

  return { success: true, url: session.url };
}
