"use client";

// Database
import { Prisma } from "@prisma/client";

// Icons
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";

// Next
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";

// Components UI
import { Separator } from "@radix-ui/react-separator";
import { Button } from "../../../../../components/ui/button";
import { Card, CardContent } from "../../../../../components/ui/card";

// Components
import CheckoutButton from "./components/checkout-button";

// Context
import { useMethod } from "../../../context/MethodContext";

// Helpers
import { formatCurrency } from "../../../../../helpers/format-currency";
import { getStatusTextTag } from "../../../../../helpers/getStatusTextTag";
import { getStyleClassTag } from "@/src/helpers/getStyleClassTag";

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
  const params = useParams();
  const { method } = useMethod();

  const slug = params.slug as string;

  const handleBackClick = () => {
    router.replace(`/${slug}/menu?method=${method}`);
  };

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
        <CheckoutButton
          key={order.id}
          items={order.orderProducts.map((op) => ({
            name: op.product.name,
            price_cents: op.product.price * 100,
            quantity: op.quantity,
          }))}
          sellerAccountId={order?.store?.stripeAccountId}
          status={order.status}
        >
          <Card className="border-none w-full h-full">
            <CardContent className="space-y-5 p-5">
              <div
                className={`w-fit rounded-full px-2 py-1 text-xs font-semibold 
                ${getStyleClassTag(order.status)}
              `}
              >
                {getStatusTextTag(order.status)}
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
                  <div
                    key={orderProduct.id}
                    className="flex items-center gap-2"
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-400 text-xs font-semibold text-white">
                      {orderProduct.quantity}
                    </div>
                    <p className="text-sm">{orderProduct.product.name}</p>
                  </div>
                ))}
              </div>
              <Separator />
              <p className="text-sm font-medium">
                {formatCurrency(order.total)}
              </p>
            </CardContent>
          </Card>
        </CheckoutButton>
      ))}
    </div>
  );
};

export default OrderList;
