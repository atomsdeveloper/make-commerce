"use client";

// React
import React, { useEffect } from "react";

// Next
import { useRouter } from "next/navigation";

// Components UI
import { Button } from "@/src/components/ui/button";

interface SuccessClientComponentProps {
  sessionId: string;
  customerEmail: string;
  amountTotal: number;
  slug: string;
}

export default function SuccessClientComponent({
  sessionId,
  customerEmail,
  amountTotal,
  slug,
}: SuccessClientComponentProps) {
  const router = useRouter();

  useEffect(() => {
    // Você pode ter alguma lógica de efeito colateral aqui,
    // como enviar eventos de analytics ou limpar o carrinho de compras no cliente.
    console.log("compoennte montado com sucesso", sessionId);
  }, [sessionId]);

  const handleGoToCart = () => {
    // Replace 'your-slug' with the actual slug value or pass it as a prop
    router.replace(`${process.env.NEXT_PUBLIC_BASE_URL}/${slug}/orders`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Pagamento Confirmado! 🎉
      </h1>
      <p className="text-lg text-gray-700 mb-2">Obrigado pela sua compra!</p>
      <p className="text-md text-gray-600 mb-1">
        Um e-mail para o endereço abaixo será enviado para você com os detalhes
        do pedido.
      </p>
      <p className="text-md text-gray-600 mb-1">
        Email: <span className="font-semibold">{customerEmail}</span>
      </p>
      <p className="text-md text-gray-600 mb-4">
        Total:{" "}
        <span className="font-semibold">
          R$ {amountTotal.toFixed(2).replace(".", ",")}
        </span>
      </p>
      <Button
        onClick={handleGoToCart}
        className="mt-6 px-6 py-3 text-white rounded-md transition-colors"
      >
        Voltar para o carrinho
      </Button>
    </div>
  );
}
