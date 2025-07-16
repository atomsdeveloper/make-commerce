// Next
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";

// Stripe
import Stripe from "stripe";

// Importe sua Server Action ou crie uma função aqui para buscar a sessão do Stripe
// import { getStripeCheckoutSession } from "./actions"; // A função que busca a sessão do Stripe

// Components
import SuccessClientComponent from "./components"; // Componente que será renderizado no cliente

interface SuccessPageProps {
  searchParams: {
    session_id?: string;
  };
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const sessionId = params.session_id;

  if (!sessionId) {
    // Se não houver session_id, redirecione para uma página de erro ou home
    notFound();
  }

  let sessionDetails = null;
  try {
    // 1. Chamar a API do Stripe para buscar detalhes da sessão (no servidor)
    // Crie uma função similar à sua createStripeCheckoutSession, mas para buscar a sessão
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: "2025-05-28.basil",
    });
    sessionDetails = await stripe.checkout.sessions.retrieve(sessionId);

    // 2. Lógica para atualizar seu banco de dados (também no servidor)
    // Exemplo: await updateOrderStatus(sessionId, 'PAYMENT_CONFIRMED');
  } catch (error) {
    console.error("Erro ao buscar sessão do Stripe:", error);
    // Redirecionar para uma página de erro ou mostrar mensagem genérica
    redirect("/error-payment");
  }

  if (!sessionDetails) {
    redirect("/error-payment");
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
      // Passe outros dados relevantes e serializáveis
    />
  );
}
