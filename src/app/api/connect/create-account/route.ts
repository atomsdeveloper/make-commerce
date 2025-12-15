// Next
import { NextRequest, NextResponse } from "next/server";

// Stripe
import Stripe from "stripe";

// Database
import { db } from "../../../../lib/prisma";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("STRIPE SECRET KEY not set");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-08-27.basil", // use uma versão oficial
});

export async function POST(req: NextRequest) {
  const { email, storeId } = await req.json();
  const account = await stripe.accounts.create({ type: "express", email });
  const origin = req.headers.get("origin");

  if (!origin) {
    throw new Error("ORIGIN not defined");
  }

  await db.store.update({
    where: { id: storeId },
    data: { stripeAccountId: account.id },
  });

  const link = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: `${origin}/onboard/refresh`,
    return_url: `${origin}/onboard/success`,
    type: "account_onboarding",
  });

  return NextResponse.json({ url: link.url, accountId: account.id });
}
