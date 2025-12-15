/* eslint-disable @typescript-eslint/no-unused-vars */
// Next
import { NextResponse } from "next/server";
import { Buffer } from "buffer";

// Stripe
import Stripe from "stripe";

export async function POST(req: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    throw new Error("STRIPE SECRET KEY not set");
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2025-08-27.basil",
    typescript: true,
  });

  const buf = await req.arrayBuffer();
  const body = Buffer.from(buf);
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    throw new Error("SIG not defined");
  }

  const event = stripe.webhooks.constructEvent(body, sig, stripeSecretKey);

  if (event.type === "checkout.session.completed") {
    const sess = event.data.object;
    // salve no DB: sess.id, sess.amount_total, sess.application_fee_amount, etc.
  }

  return NextResponse.json({ received: true });
}
