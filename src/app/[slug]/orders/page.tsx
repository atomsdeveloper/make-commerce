// Database
import { db } from "../../../lib/prisma";

// Helpers
import { isValidCpf, removeCpfPunctuation } from "../../../helpers/cpf";

// Components
import CpfForm from "./components/cpf-form";
import OrderList from "./components/order-list";

interface OrderPageProps {
  searchParams: Promise<{ cpf: string }>;
}

const OrdersPage = async ({ searchParams }: OrderPageProps) => {
  const { cpf } = await searchParams;

  if (!cpf) {
    return <CpfForm />;
  }

  if (!isValidCpf(cpf)) {
    return <CpfForm />;
  }

  const orders = await db.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      customerCpf: removeCpfPunctuation(cpf),
    },
    include: {
      store: {
        select: {
          name: true,
          avatarImageUrl: true,
        },
      },

      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return <OrderList orders={orders} />;
};

export default OrdersPage;
