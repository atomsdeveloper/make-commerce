// app/success/actions.ts
"use server"; // Indica que este é um arquivo de Server Actions

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-05-28.basil", // Use a sua versão de API, se for diferente
});

/**
 * Busca os detalhes de uma sessão de checkout do Stripe.
 * @param sessionId O ID da sessão de checkout do Stripe.
 * @returns Um objeto Session do Stripe ou null em caso de erro.
 */
export async function getStripeCheckoutSession(
  sessionId: string
): Promise<Stripe.Checkout.Session | null> {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session;
  } catch (error) {
    console.error("Erro ao buscar sessão de checkout do Stripe:", error);
    return null;
  }
}
/**
 * Atualiza o status de um pedido no banco de dados.
 * @param sessionId O ID da sessão de checkout do Stripe.
 * @param status O novo status do pedido.
 */
export async function updateOrderStatus(sessionId: string, status: string) {
  try {
    // Lógica para atualizar o status do pedido no banco de dados
    console.log(sessionId, status);
    // Exemplo: await prisma.order.update({ where: { sessionId }, data: { status } });
  } catch (error) {
    console.error("Erro ao atualizar status do pedido:", error);
  }
}
/**
 * Exemplo de uma função que pode ser usada para lidar com o webhook do Stripe.
 * @param event O evento recebido do Stripe.
 */
export async function handleStripeWebhook(event: Stripe.Event) {
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      return session;
      break;
    // Adicione outros casos conforme necessário
    default:
      console.warn(`Webhook não tratado: ${event.type}`);
  }
}
