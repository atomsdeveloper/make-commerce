// Model
import { UserModel } from "@/src/model/user/user-model";

// Database (Prisma Client)
import { db } from "../../lib/prisma"; // aqui assumo que você tem um prisma client exportado

// Repository
import { UserRepository } from "./user-repository";

export class PrismaUserRepository implements UserRepository {
  // MUTATIONS
  async createUser(user: UserModel): Promise<UserModel> {
    const hasUser = await db.user.findFirst({
      where: {
        OR: [{ name: user.name }, { email: user.email }],
      },
      select: { id: true },
    });

    if (hasUser) {
      throw new Error("User ou Id já existem.");
    }

    try {
      const newUser = await db.user.create({
        data: user,
      });

      return newUser;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      throw new Error("Erro ao criar usuário.", error as any);
    }
  }
}
