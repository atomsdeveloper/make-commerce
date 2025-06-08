// Next
import { notFound } from "next/navigation";

// Database
import { db } from "../../../../lib/prisma";

// Components
import ProductsDetails from "./components/products-details";
import ProductsHeader from "./components/products-header";

interface ProductsPageProps {
  params: Promise<{ slug: string; productId: string }>;
}

const ProductsPage = async ({ params }: ProductsPageProps) => {
  const { slug, productId } = await params;
  const products = await db.products.findUnique({
    where: { id: productId },
    include: {
      store: {
        select: {
          name: true,
          avatarImageUrl: true,
          slug: true,
        },
      },
    },
  });

  if (!products) {
    return notFound;
  }

  if (products.store.slug.toUpperCase() !== slug.toUpperCase()) {
    return notFound;
  }

  return (
    <div className="flex h-full flex-col">
      <ProductsHeader product={products} />
      <ProductsDetails product={products} />
    </div>
  );
};

export default ProductsPage;
