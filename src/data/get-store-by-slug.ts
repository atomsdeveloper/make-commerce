import { db } from "../lib/prisma";

// TODO: Create design pattern Repository.
export const getStoreBySlug = async (slug: string) => {
  const store = await db.store.findUnique({ where: { slug } });
  return store;
};
