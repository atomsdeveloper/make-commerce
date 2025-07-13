"use server";

// Next
import { notFound } from "next/navigation";

// Database
import { db } from "../../../lib/prisma";

// Components
import StoreCategories from "./components/categories";
import StoreHeader from "./components/header";

interface StoreMenuProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ method: string }>;
}

const hasMethod = (method: string) => {
  return ["MOTORBIKE", "PICKUP", "MAIL"].includes(method.toUpperCase());
};

const StoreMenuPage = async ({ params, searchParams }: StoreMenuProps) => {
  const { slug } = await params;
  const { method } = await searchParams;

  if (!hasMethod(method)) {
    return notFound;
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
    notFound();
  }

  return (
    <div>
      <StoreHeader store={store} />
      <StoreCategories store={store} />
    </div>
  );
};
export default StoreMenuPage;
