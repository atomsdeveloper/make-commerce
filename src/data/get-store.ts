// TODO: Create design pattern Repository.

// Database
import { db } from "../lib/prisma";

export const getStoreBySlug = async (slug: string) => {
  const store = await db.store.findUnique({ where: { slug } });
  return store;
};
