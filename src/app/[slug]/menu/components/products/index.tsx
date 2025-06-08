// Next
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

// Database
import { Products } from "@prisma/client";

// Helpers
import { formatCurrency } from "../../../../../helpers/format-currency";

interface ProductsListProps {
  products: Products[];
}

const ProductsList = ({ products }: ProductsListProps) => {
  const { slug } = useParams<{ slug: string }>();
  const method = useSearchParams().get("method");
  return (
    <div className="space-y-3 px-5">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/${slug}/menu/${product.id}?method=${method}`}
          className="flex items-center justify-between border-b py-3"
        >
          <div>
            <h3 className="text-sm font-medium"> {product.name} </h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {product.description}
            </p>
            <p className="pt-3 text-sm font-semibold">
              {formatCurrency(product.price)}
            </p>
          </div>
          <div className="relative min-h-[82px] min-w-[120px]">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="rounded-lg object-contain"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};
export default ProductsList;
