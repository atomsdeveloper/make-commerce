// Next
import { NextApiRequest, NextApiResponse } from "next";

// Stripe
import Stripe from "stripe";

// Database
import { db } from "../../../../lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
  typescript: true,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, storeId } = req.body;
  const account = await stripe.accounts.create({ type: "express", email });
  const origin = req.headers.origin!;

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
  res.status(200).json({ url: link.url, accountId: account.id });
}
