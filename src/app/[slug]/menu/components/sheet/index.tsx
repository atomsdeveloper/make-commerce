import { useContext, useState } from "react";

import { Button } from "../../../../../components/ui/button";
import { Card, CardContent } from "../../../../../components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/src/components/ui/sheet";
import { formatCurrency } from "../../../../../helpers/format-currency";

// Context
import { CartContext } from "../../context/cart";

import CartProductItem from "../card-product-items";
import FinishOrderDialog from "../finish-order-product";

const CartSheet = () => {
  const [finishOrderDialogIsOpen, setFinishOrderDialogIsOpen] = useState(false);

  const { isOpen, toggleIsOpen, productsCart, total } = useContext(CartContext);

  return (
    <Sheet open={isOpen} onOpenChange={toggleIsOpen}>
      <SheetContent aria-description="" className="w-[80%]">
        <SheetHeader>
          <SheetTitle className="text-lg text-start"> Sacola </SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col py-5">
          <div className="flex-auto">
            {productsCart.map((product) => (
              <CartProductItem key={product.id} product={product} />
            ))}
          </div>

          <Card className="mb-4">
            <CardContent className="p-5">
              <div className="flex-justify-between">
                <p className="text-muted-foreground text-sm">Total</p>
                <p className="text-sm font-semibold">{formatCurrency(total)}</p>
              </div>
            </CardContent>
          </Card>

          {/* Botão que altera o estado para true para limpar dados do formulário após fechar o dialog */}
          <Button
            className="w-full rounded-full"
            onClick={() => setFinishOrderDialogIsOpen(true)}
          >
            Finalizar pedido
          </Button>

          <FinishOrderDialog
            open={finishOrderDialogIsOpen}
            onOpenChange={setFinishOrderDialogIsOpen}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
