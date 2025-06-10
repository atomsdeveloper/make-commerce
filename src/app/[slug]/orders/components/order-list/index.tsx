"use client";

// Database
import { Prisma } from "@prisma/client";

// Icons
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";

// Next
import Image from "next/image";
import { useRouter } from "next/navigation";

// Components UI
import { Separator } from "@radix-ui/react-separator";
import { Button } from "../../../../../components/ui/button";
import { Card, CardContent } from "../../../../../components/ui/card";

// Components
import CheckoutButton from "./components/checkout-button";

// Helpers
import { formatCurrency } from "../../../../../helpers/format-currency";
import { getStatusLabel } from "../../../../../helpers/getStatusLabel";
import { getStyleClass } from "../../../../../helpers/getStyleClass";

interface OrderListProps {
  orders: Array<
    Prisma.OrderGetPayload<{
      include: {
        store: {
          select: {
            name: true;
            avatarImageUrl: true;
            stripeAccountId: true;
          };
        };
        orderProducts: {
          include: {
            product: true;
          };
        };
      };
    }>
  >;
}

const OrderList = ({ orders }: OrderListProps) => {
  const router = useRouter();
  const handleBackClick = () => router.back();

  return (
    <div className="space-y-6 p-6">
      <Button
        size="icon"
        variant="secondary"
        className="rounded-full"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
      <div className="flex items-center gap-3">
        <ScrollTextIcon />
        <h2 className="text-lg font-semibold">Meus Pedidos</h2>
      </div>
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="space-y-4 p-5">
            <div
              className={`w-fit rounded-full px-2 py-1 text-xs font-semibold 
                ${getStyleClass(order.status)}
              `}
            >
              {getStatusLabel(order.status)}
            </div>
            <div className="flex items-center gap-2">
              <div className="relative h-5 w-5">
                <Image
                  src={order.store.avatarImageUrl}
                  alt={order.store.name}
                  className="rounded-sm"
                  fill={true}
                />
              </div>
              <p className="text-sm font-semibold">{order.store.name}</p>
            </div>
            <Separator />
            <div className="space-y-2">
              {order.orderProducts.map((orderProduct) => (
                <div key={orderProduct.id} className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white">
                    {orderProduct.quantity}
                  </div>
                  <p className="text-sm">{orderProduct.product.name}</p>
                </div>
              ))}
            </div>
            <Separator />
            <p className="text-sm font-medium">{formatCurrency(order.total)}</p>

            <CheckoutButton
              items={order.orderProducts.map((op) => ({
                name: op.product.name,
                price_cents: op.product.price * 100,
                quantity: op.quantity,
              }))}
              sellerAccountId={order?.store?.stripeAccountId}
              status={order.status}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrderList;
