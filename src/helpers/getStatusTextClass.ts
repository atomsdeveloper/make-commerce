import { OrderStatus } from "@prisma/client";

const labels: Record<OrderStatus, string> = {
  FINISHED: "Finalizado",
  IN_PREPARATION: "Processando",
  PENDING: "Pendente",
  PAYMENT_CONFIRMED: "Finalizado",
  PAYMENT_FAILED: "Falha no pagamento",
};

export const getStatusTextClass = (status: OrderStatus): string => {
  return labels[status] ?? "";
};
