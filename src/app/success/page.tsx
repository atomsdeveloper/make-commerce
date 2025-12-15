// Next
import { notFound } from "next/navigation";

// Stripe
import Stripe from "stripe";

// Database
import { db } from "../../lib/prisma";

// Actions
import { updateOrderStatusBySession } from "./actions";

// Components
import SuccessClientComponent from "./components";

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const sessionId = params.session_id;

  if (!searchParams) {
    return <p>Session ID não fornecida</p>;
  }

  if (!sessionId) {
    notFound();
  }

  let sessionDetails = null;
  let order = null;

  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
      throw new Error("STRIPE SECRET KEY not set");
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2025-08-27.basil",
      typescript: true,
    });

    sessionDetails = await stripe.checkout.sessions.retrieve(sessionId);

    order = await db.order.findUnique({
      where: {
        stripeSessionId: sessionId,
      },
      include: {
        store: true,
      },
    });

    if (!order) {
      notFound();
    }

    await updateOrderStatusBySession(
      order?.stripeSessionId as string,
      "PAYMENT_CONFIRMED",
    );
  } catch (error) {
    console.error("Erro ao buscar sessão do Stripe:", error);
    notFound();
  }

  if (!sessionDetails) {
    notFound();
  }

  // Passar APENAS DADOS SERIALIZÁVEIS para o Client Component
  // Certifique-se de que sessionDetails seja um objeto JSON-friendly
  return (
    <SuccessClientComponent
      sessionId={sessionId}
      customerEmail={sessionDetails.customer_details?.email || "N/A"}
      amountTotal={
        sessionDetails.amount_total ? sessionDetails.amount_total / 100 : 0
      }
      slug={order?.store.slug as string}
    />
  );
}
