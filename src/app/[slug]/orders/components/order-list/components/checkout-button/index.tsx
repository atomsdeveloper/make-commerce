"use client";

// Hooks React
import { useState, useEffect } from "react";

// Axios
import axios from "axios";

// Database
import { OrderStatus } from "@prisma/client";

// Components UI
import { Button } from "../../../../../../../components/ui/button";

// Helpers
import { getStatusLabel } from "../../../../../../../helpers/getStatusLabel";
import { getStyleClass } from "../../../../../../../helpers/getStyleClass";

interface CheckoutButtonProps {
  items: {
    name: string;
    price_cents: number;
    quantity: number;
  }[];
  sellerAccountId: string | null;
  status: OrderStatus;
}

const CheckoutButton = ({
  items,
  sellerAccountId,
  status,
}: CheckoutButtonProps) => {
  const [unable, setUnable] = useState(false);

  useEffect(() => {
    if (status === "FINISHED" || status === "PAYMENT_CONFIRMED") {
      setUnable(true);
    } else {
      setUnable(false);
    }
  }, [status]);

  const handleClick = async () => {
    setUnable(true);
    const res = await axios.post("/api/create-checkout-session", {
      items,
      sellerAccountId,
    });
    window.location.href = res.data.url;
    setUnable(false);
  };

  return (
    <Button
      onClick={handleClick}
      disabled={unable}
      className={`w-48 ${getStyleClass(status)}`}
    >
      {getStatusLabel(status)}
    </Button>
  );
};

export default CheckoutButton;
