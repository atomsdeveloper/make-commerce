"use server";

// Next
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Database
import { db } from "../../../../lib/prisma";
import { Method } from "@prisma/client";

// Helpers
import { removeCpfPunctuation } from "../../../../helpers/cpf";

// Stripe
import Stripe from "stripe";

// Contants
import { NEXT_PUBLIC_BASE_URL_VARIABLE } from "@/src/utils/constants";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

interface CreateOrderInputProps {
  customerName: string;
  customerCpf: string;
  products: Array<{ id: string; quantity: number }>;
  consumptionMethod: Method;
  slug: string;
  street?: string;
  number?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
}

export const createOrder = async (input: CreateOrderInputProps) => {
  const store = await db.store.findUnique({
    where: {
      slug: input.slug,
    },
  });

  if (!store) {
    throw new Error("Loja não encontrada.");
  }

  const productsWithPrice = await db.products.findMany({
    where: {
      id: {
        in: input.products.map((product) => product.id),
      },
    },
  });

  const productsWithPriceAndQuantities = input.products.map((product) => {
    const matchedProduct = productsWithPrice.find(
      (productWithPrice) => productWithPrice.id === product.id,
    );

    if (!matchedProduct) {
      throw new Error(
        `Produto com ID ${product.id} não encontrado no banco de dados.`,
      );
    }

    return {
      productId: product.id,
      quantity: product.quantity,
      price: matchedProduct.price,
    };
  });

  if (productsWithPriceAndQuantities.length === 0) {
    throw new Error("Nenhum produto válido foi enviado para o pedido.");
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${NEXT_PUBLIC_BASE_URL_VARIABLE}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${NEXT_PUBLIC_BASE_URL_VARIABLE}/cancel`,
    line_items: productsWithPrice.map((item) => ({
      price_data: {
        currency: "BRL",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // em centavos
      },
      quantity:
        productsWithPriceAndQuantities.find(
          (product) => product.productId === item.id,
        )?.quantity || 1,
    })),
  });

  await db.order.create({
    data: {
      status: "PENDING",
      customerName: input.customerName,
      customerCpf: removeCpfPunctuation(input.customerCpf),
      orderProducts: {
        createMany: {
          data:
            productsWithPriceAndQuantities.length > 0
              ? productsWithPriceAndQuantities
              : [],
        },
      },
      total:
        productsWithPriceAndQuantities.length > 0
          ? productsWithPriceAndQuantities.reduce(
              (acc, product) => acc + product.price * product.quantity,
              0,
            )
          : 0,
      method: input?.consumptionMethod,
      store: {
        connect: { id: store.id },
      },
      stripeSessionId: session.id,
      ...(input.consumptionMethod !== "PICKUP" && {
        street: input.street!,
        number: input.number!,
        city: input.city!,
        state: input.state!,
        country: input.country!,
        zipCode: input.zipCode!,
      }),
    },
  });
  revalidatePath(`/${input.slug}/orders`); // Limpa cache antes de redirecionar á página.
  redirect(session.url!);
};
