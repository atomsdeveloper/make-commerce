import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;

if (!key) {
  throw new Error("STRIPE_SECRET_KEY is not defined in environment variables.");
}
const stripe = new Stripe(key, { apiVersion: "2025-08-27.basil" });

export default stripe;
