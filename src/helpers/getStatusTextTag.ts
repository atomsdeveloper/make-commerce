import { OrderStatus } from "@prisma/client";

const labels: Record<OrderStatus, string> = {
  FINISHED: "Pago",
  IN_PREPARATION: "Processando",
  PENDING: "Pendente",
  PAYMENT_CONFIRMED: "Pago",
  PAYMENT_FAILED: "Tente novamente",
};

export const getStatusTextTag = async (status: OrderStatus) => {
  return labels[status] ?? "";
};
