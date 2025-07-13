// Actions
import { createStripeCheckoutSession } from "../../actions/stripe-checkout"; // Caminho de exemplo, ajuste conforme sua estrutura

// Componentes UI
import { Button } from "../../../../../../../components/ui/button"; // Verifique o caminho correto para o seu botão

interface CheckoutButtonProps {
  children: React.ReactNode;
  items: Array<{ name: string; price_cents: number; quantity: number }>;
  sellerAccountId: string;
  status: string;
}

const CheckoutButton = ({
  children,
  items,
  sellerAccountId,
  status,
}: CheckoutButtonProps) => {
  const handleCheckoutClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault(); // Previne o comportamento padrão do botão

    console.log("Iniciando o checkout com os itens:", items);

    try {
      // Chama a Server Action para criar a sessão do Stripe
      const checkoutUrl = await createStripeCheckoutSession(
        items,
        sellerAccountId
      );

      if (checkoutUrl) {
        window.location.href = checkoutUrl; // Redireciona o usuário para o checkout
      } else {
        console.error("URL de checkout não recebida.");
        // Opcional: mostrar uma mensagem de erro para o usuário
      }
    } catch (error) {
      console.error("Erro ao iniciar o checkout:", error);
      // Opcional: mostrar uma mensagem de erro para o usuário
    }
  };

  // Lógica para desabilitar o botão se o pedido estiver pago
  const isCheckoutFinishedFinish =
    status === "FINISHED" || status === "PAYMENT_CONFIRMED";

  return (
    <Button
      className={`h-full w-full text-left bg-transparent hover:bg-transparent hover:cursor-pointer`}
      onClick={(e) => handleCheckoutClick(e)}
      variant="default"
      disabled={isCheckoutFinishedFinish}
    >
      {children}
    </Button>
  );
};

export default CheckoutButton;
