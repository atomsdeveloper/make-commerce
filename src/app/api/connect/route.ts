// Server
import { NextRequest, NextResponse } from "next/server";

// Stripe
import Stripe from "stripe";

// Database
import { db } from "../../../lib/prisma";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("STRIPE SECRET KEY not set");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-08-27.basil",
  typescript: true,
});

export async function POST(req: NextRequest) {
  const { storeId, email } = await req.json();

  const account = await stripe.accounts.create({
    type: "express",
    country: "BR",
    email,
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
  });

  await db.store.update({
    where: { id: storeId },
    data: { stripeAccountId: account.id },
  });

  return NextResponse.json({ accountId: account.id });
}
