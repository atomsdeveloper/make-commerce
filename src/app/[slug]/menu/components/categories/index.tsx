"use client";

// Database
import { Prisma } from "@prisma/client";

// Next
import Image from "next/image";

// Icons
import { ClockIcon } from "lucide-react";

// React
import { useContext, useState } from "react";

// Helpers
import { formatCurrency } from "../../../../../helpers/format-currency";

// Context
import { CartContext } from "../../context/cart";

// Components UI
import { Button } from "../../../../../components/ui/button";
import {
  ScrollArea,
  ScrollBar,
} from "../../../../../components/ui/scroll-area";

// Components
import Bag from "../bag";
import ProductsList from "../products";

interface StoreCategoriesProps {
  store: Prisma.StoreGetPayload<{
    include: {
      categories: {
        include: { products: true };
      };
    };
  }>;
}

import type { Category, Products } from "@prisma/client";

export type CategoriesWithProducts = Category & { products: Products[] };

const StoreCategories = ({ store }: StoreCategoriesProps) => {
  // Context
  const { productsCart, total, toggleIsOpen, totalQuantity } =
    useContext(CartContext);

  // States
  const [selectedCategory, setSelectedCategory] =
    useState<CategoriesWithProducts>(store.categories[0]);

  // Actions Functions
  const handleCategoryClick = (category: CategoriesWithProducts) => {
    setSelectedCategory(category);
  };

  const getCategoryButtonVariant = (category: CategoriesWithProducts) => {
    return selectedCategory.id === category.id ? "default" : "secondary";
  };

  return (
    <div className="relative z-50 mt-[-150px] rounded-3xl bg-white">
      <div className="p-5">
        <div className="flex items-center gap-3">
          <Image
            src={store.avatarImageUrl}
            alt={store.name}
            height={45}
            width={45}
          />
          <div>
            <h2 className="text-lg font-semibold">{store.name}</h2>
            <p className="text-xs opacity-55">{store.description}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1 text-xs text-green-500">
          <ClockIcon size={12} />
          <p>Aberto!</p>
        </div>
      </div>

      <ScrollArea className="w-full">
        <div className="flex w-max space-x-4 p-4 pt-0">
          {/*  eslint-disable-next-line @typescript-eslint/no-explicit-any  */}
          {store.categories.map((category: any) => (
            <Button
              onClick={() => handleCategoryClick(category)}
              key={category.id}
              variant={getCategoryButtonVariant(category)}
              size="sm"
              className="rounded-full"
            >
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <h3 className="px-5 pt-2 font-semibold">{selectedCategory.name}</h3>
      <ProductsList products={selectedCategory.products} />

      {productsCart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 flex w-full items-center justify-between border-t bg-white px-4  py-3">
          <div>
            <p className="text-sm text-muted-foreground">Total dos Pedidos</p>
            <p className="text-sm font-semibold">
              {formatCurrency(total)}
              <span className="text-sm font-normal text-muted-foreground">
                / {totalQuantity} {totalQuantity > 0 ? "Items" : "Item"}
              </span>
            </p>
          </div>

          <Button onClick={toggleIsOpen}>Ver sacola</Button>
          <Bag />
        </div>
      )}
    </div>
  );
};
export default StoreCategories;
