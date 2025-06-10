/* eslint-disable @typescript-eslint/no-unused-vars */
// Next
import { NextResponse } from "next/server";

import { buffer } from "micro";

// Stripe
import stripe from "../../../config/stripe";

export const config = { api: { bodyParser: false } };

export async function POST(req: Request) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body = await buffer(req as any);
  const sig = req.headers.get("stripe-signature")!;

  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  if (event.type === "checkout.session.completed") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sess = event.data.object as any;
    // salve no DB: sess.id, sess.amount_total, sess.application_fee_amount, etc.
  }

  return NextResponse.json({ received: true });
}
