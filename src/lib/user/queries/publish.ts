import { InstanceUserRepository } from "@/src/repositories/user";
import { UserModel } from "../../../model/user/user-model";

// React
import { cache } from "react";

export const createdUserCache = cache(async (user: UserModel) => {
  return await InstanceUserRepository.createUser(user);
});
