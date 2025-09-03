// Next
import { notFound } from "next/navigation";

// Database
import { db } from "../../../lib/prisma";

// Components
import StoreCategories from "./components/categories";
import StoreHeader from "./components/header";

interface StoreMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ method?: string }>; // ⚡ searchParams é Promise
}

const hasMethod = (method: string) => {
  return ["MOTORBIKE", "PICKUP", "MAIL"].includes(method?.toUpperCase() || "");
};

const StoreMenuPage = async ({ params, searchParams }: StoreMenuPageProps) => {
  const { slug } = await params;
  const { method } = await searchParams;

  if (!method || !hasMethod(method)) {
    return notFound();
  }

  const store = await db.store.findUnique({
    where: { slug },
    include: {
      categories: {
        include: { products: true },
      },
    },
  });

  if (!store) {
    return notFound();
  }

  return (
    <div>
      <StoreHeader store={store} />
      <StoreCategories store={store} />
    </div>
  );
};

export default StoreMenuPage;
