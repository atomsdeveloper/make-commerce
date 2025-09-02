// Methods Repository
import { PrismaUserRepository } from "./prisma-user-repository";

// Interface
import { UserRepository } from "./user-repository";
// Singleton Pattern
// This allows us to use the same instance of the repository throughout the application
// This is useful for maintaining a single source of truth for the users data
// Should be used in the application where the repository can change
// ...and we want to ensure that the same instance is used everywhere.
export const InstanceUserRepository: UserRepository =
  new PrismaUserRepository();
