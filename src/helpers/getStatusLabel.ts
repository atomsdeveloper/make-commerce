import { OrderStatus } from "@prisma/client";

const labels: Record<OrderStatus, string> = {
  FINISHED: "Pago",
  IN_PREPARATION: "Processando pagamento",
  PENDING: "Realizar pagamento",
  PAYMENT_CONFIRMED: "Pago",
  PAYMENT_FAILED: "Tentar novamente",
};

export const getStatusLabel = async (status: OrderStatus) => {
  return labels[status] ?? "";
};
