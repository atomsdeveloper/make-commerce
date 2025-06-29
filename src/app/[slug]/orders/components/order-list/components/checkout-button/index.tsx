// Hooks React
import React, { useState } from "react";

// Axios
import axios from "axios";

// Database
import { OrderStatus } from "@prisma/client";

// Components UI
import { Button } from "../../../../../../../components/ui/button";

interface CheckoutButtonProps {
  items: {
    name: string;
    price_cents: number;
    quantity: number;
  }[];
  sellerAccountId: string | null;
  status: OrderStatus;
  children: React.ReactElement;
}

const CheckoutButton = ({
  items,
  sellerAccountId,
  status,
  children,
}: CheckoutButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    console.log(`Função do Pedido clicada. status: ${status}`);
    setLoading(true);
    try {
      const res = await axios.post("/api/create-checkout-session", {
        items,
        sellerAccountId,
      });
      window.location.href = res.data.url;
    } finally {
      setLoading(false);
    }
  };

  // Só mostra o botão se o status for PENDING ou PAYMENT_FAILED
  if (
    status === "FINISHED" ||
    status === "IN_PREPARATION" ||
    status === "PAYMENT_CONFIRMED"
  ) {
    return null;
  }

  return (
    <>
      {loading ? (
        <h1>Loading </h1>
      ) : (
        <Button
          onClick={(e) => handleClick(e)}
          disabled={loading}
          className={`h-full w-full text-left bg-transparent hover:bg-transparent`}
        >
          {children}
        </Button>
      )}
    </>
  );
};

export default CheckoutButton;
