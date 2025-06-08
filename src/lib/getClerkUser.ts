import { clerkClient } from "@clerk/nextjs/server";

export async function getClerkUser(userId: string) {
  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    return user;
  } catch (err) {
    console.error("Erro ao buscar usuário no Clerk:", err);
    return null;
  }
}
