import { OrderStatus } from "@prisma/client";

export function getStyleClassTag(status: OrderStatus): string {
  switch (status) {
    case "FINISHED":
    case "PAYMENT_CONFIRMED":
      return "bg-green-300 hover:bg-green-400 text-white";
    case "IN_PREPARATION":
      return "bg-gray-300 hover:bg-gray-400 text-white";
    case "PENDING":
      return "bg-yellow-300 hover:bg-yellow-400 text-white";
    case "PAYMENT_FAILED":
      return "bg-red-300 hover:bg-red-400 text-white";
    default:
      return "bg-gray-200 text-gray-500";
  }
}
