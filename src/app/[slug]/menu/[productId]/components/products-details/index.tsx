"use client";

// React
import { useContext, useState } from "react";

// Database
import { Prisma } from "@prisma/client";

// Icons
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

// Next
import Image from "next/image";

// Components UI
import { Button } from "../../../../../../components/ui/button";
import { ScrollArea } from "../../../../../../components/ui/scroll-area";

// Helpers
import { formatCurrency } from "../../../../../../helpers/format-currency";

// Components
import CartSheet from "../../../components/sheet";

// Context
import { CartContext } from "../../../context/cart";

interface ProductsDetailsProps {
  product: Prisma.ProductsGetPayload<{
    include: {
      store: {
        select: {
          name: true;
          avatarImageUrl: true;
        };
      };
    };
  }>;
}

const ProductsDetails = ({ product }: ProductsDetailsProps) => {
  const { toggleIsOpen, addProductCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState<number>(1);

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => {
      if (prev === 1) {
        return 1;
      }

      return prev - 1;
    });
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    // addProductCart vem do CartContext .
    // Recebe um parametro product que tem a interface CartProduct.
    // Essa interface precisa receber o product mais o valor de quantity.
    addProductCart({
      ...product,
      quantity,
    });
    toggleIsOpen();
  };

  return (
    <>
      <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl p-3 flex-auto flex flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden">
          {/* restaurant */}
          <div className="flex items-center gap-1.5 rounded-full">
            <Image
              src={product.store.avatarImageUrl}
              alt={product.store.name}
              width={16}
              height={16}
            />
            <p className="text-xs text-muted-foreground">
              {product.store.name}
            </p>
          </div>

          {/* product name */}
          <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>

          {/* price and quantity */}
          <div className="flex items-center justify-between mt-3">
            <h3 className="text-xl font-semibold">
              {formatCurrency(product.price)}
            </h3>
            <div className="flex items-center gap-3 text-center">
              <Button
                variant="outline"
                className="h-8 w-8 rounded-xl"
                onClick={handleDecreaseQuantity}
              >
                <ChevronLeftIcon />
              </Button>
              <div className="w-4">{quantity}</div>
              <Button
                variant="destructive"
                className="h-8 w-8 rounded-xl"
                onClick={handleIncreaseQuantity}
              >
                <ChevronRightIcon />
              </Button>
            </div>
          </div>

          <ScrollArea className="h-full">
            {/* about */}
            <div className="mt-6 space-y-2 h-1/2">
              <h4 className="font-semibold">Sobre</h4>
              <p className="text-sm text-muted-foreground">
                {product.description}
              </p>
            </div>

            {/* ingredients */}
            <div className="mt-6 space-y-2 1/2">
              <div className="flex items-center gap-1">
                <ChefHatIcon size={16} />
                <h4 className="font-semibold">Composições</h4>
              </div>
              <div className="text-sm text-muted-foreground">
                <ul className="list-disc px-5 text-sm text-muted-foreground">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollArea>
        </div>

        <Button className="rounded-full w-full mt-3" onClick={handleAddToCart}>
          Adicionar à sacola
        </Button>
      </div>
      <CartSheet />
    </>
  );
};

export default ProductsDetails;
