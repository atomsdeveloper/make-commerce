// Model
import { UserModel } from "@/src/model/user/user-model";

// Repository Pattern
export interface UserRepository {
  // Mutation
  createUser(user: UserModel): Promise<UserModel>;
}
