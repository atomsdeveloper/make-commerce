import { OrderStatus } from "@prisma/client";

export function getStyleClass(status: OrderStatus): string {
  switch (status) {
    case "FINISHED":
    case "PAYMENT_CONFIRMED":
      return "bg-green-600 hover:bg-green-700 text-white";
    case "IN_PREPARATION":
      return "bg-blue-600 hover:bg-blue-700 text-white";
    case "PENDING":
      return "bg-gray-500 hover:bg-gray-600 text-white";
    case "PAYMENT_FAILED":
      return "bg-red-600 hover:bg-red-700 text-white";
    default:
      return "bg-gray-200 text-gray-500";
  }
}
