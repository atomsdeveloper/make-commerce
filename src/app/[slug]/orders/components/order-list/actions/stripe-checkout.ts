"use server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-05-28.basil",
});

interface CheckoutItem {
  name: string;
  price_cents: number;
  quantity: number;
}

export async function createStripeCheckoutSession(
  items: CheckoutItem[],
  sellerAccountId: string,
  cpf: string,
  slug: string
): Promise<string | null> {
  try {
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "brl",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price_cents, // Preço em centavos
      },
      quantity: item.quantity,
    }));

    // Criando a sessão de checkout do Stripe
    const session = await stripe.checkout.sessions.create(
      {
        payment_method_types: ["card"], // ou outros métodos de pagamento
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${slug}/orders?cpf=${cpf}`,
        // Adicionar outras configurações como metadata, customer_email, etc.
      },
      {
        stripeAccount: sellerAccountId, // Conecta a sessão ao Stripe Connect Account do vendedor
      }
    );

    return session.url;
  } catch (error) {
    console.error("Erro ao criar sessão de checkout do Stripe:", error);
    // Em um ambiente de produção, pode ser registrados erros em um sistema de logs
    // e retornar uma mensagem mais amigável ou um código de erro para o cliente.
    return null;
  }
}
