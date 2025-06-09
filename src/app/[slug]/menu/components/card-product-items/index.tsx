// Icons
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";

// Image
import Image from "next/image";

// Components UI
import { Button } from "../../../../../components/ui/button";

// Helpers
import { formatCurrency } from "../../../../../helpers/format-currency";

// Context
import { useContext } from "react";
import { CartContext, CartProduct } from "../../context/cart";

interface CartProductItemProps {
  product: CartProduct;
}

const CartProductItem = ({ product }: CartProductItemProps) => {
  const {
    decreaseQuantityProductCart,
    increaseQuantityProductCart,
    removeProductCart,
  } = useContext(CartContext);
  return (
    <div className="flex items-center justify-between p-2">
      <div className="flex items-center gap-3">
        <div className="relative h-20 w-20 rounded-xl bg-gray-100">
          <Image src={product.imageUrl} alt={product.name} fill />
        </div>
        <div className="space-y-1">
          <p className="text-xs max-w-[90%] truncate text-ellipsis">
            {product.name}
          </p>
          <p className="text-sm font-semibold">
            {formatCurrency(product.price)}
          </p>

          <div className="flex items-center gap-1 text-center">
            <Button
              className="h-7 w-7 rounded-lg"
              variant="outline"
              onClick={() => decreaseQuantityProductCart(product.id)}
            >
              <ChevronLeftIcon />
            </Button>

            <p className="w-7 text-xs">{product.quantity}</p>

            <Button
              className="h-7 w-7 rounded-lg"
              variant="destructive"
              onClick={() => increaseQuantityProductCart(product.id)}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </div>

      <Button
        className="h-7 w-7 rounded-lg"
        variant="outline"
        onClick={() => removeProductCart(product.id)}
      >
        <TrashIcon />
      </Button>
    </div>
  );
};

export default CartProductItem;
