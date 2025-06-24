// Next
import { NextRequest, NextResponse } from "next/server";

// Stripe
import stripe from "../../../config/stripe";

type CheckoutItem = {
  name: string;
  price: number;
  price_cents: number;
  quantity: number;
};

export async function POST(req: NextRequest) {
  const { items, sellerAccountId } = await req.json();

  const amount = calculateTotal(items);
  const applicationFee = Math.round(amount * 0.1);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: (items as CheckoutItem[]).map((item: CheckoutItem) => ({
      price_data: {
        currency: "brl",
        product_data: { name: item.name },
        unit_amount: item.price_cents,
      },
      quantity: item.quantity,
    })),
    mode: "payment",
    payment_intent_data: {
      application_fee_amount: applicationFee,
      ...(sellerAccountId && {
        transfer_data: { destination: sellerAccountId },
      }),
    },
    success_url: `${req.headers.get("origin")}/checkout-return?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.get("origin")}/software-company/orders?cancel=true`,
  });
  return NextResponse.json({ url: session.url });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function calculateTotal(items: any) {
  if (!Array.isArray(items)) return 0;
  return items.reduce((total: number, item: CheckoutItem) => {
    const price = typeof item.price === "number" ? item.price : 0;
    const quantity = typeof item.quantity === "number" ? item.quantity : 1;
    return total + price * quantity;
  }, 0);
}
