import { NextResponse } from "next/server";
import { execute, isDatabaseConfigured } from "@/lib/db";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing webhook config" }, { status: 400 });
  }

  const stripe = getStripe();
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook error";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed" && isDatabaseConfigured()) {
    const session = event.data.object;

    await execute(
      `update orders
       set status = 'paid',
           stripe_payment_intent_id = $1
       where stripe_session_id = $2`,
      [
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : null,
        session.id,
      ]
    );
  }

  return NextResponse.json({ received: true });
}
