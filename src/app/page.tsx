// Next
import { notFound, redirect } from "next/navigation";

// Database
import { db } from "../lib/prisma";

const StoreSlug = async () => {
  const store = await db.store.findFirst();

  if (!store) {
    return notFound;
  }

  redirect(`${store.slug}`);
};
export default StoreSlug;
