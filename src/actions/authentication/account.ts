"use server";

// Next
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

// UUID
import { v4 as uuid } from "uuid";

// Database
import { UserModel } from "../../model/user/user-model";

// Libs from Database
import { db } from "../../lib/prisma";
import { createdUserCache } from "../../lib/user/queries/publish";

// Type
import { GetDataAction } from "../../utils/actions/type-form-credentials";
import { hashPassword } from "@/src/utils/actions/manage-login";

export const account = async (prevState: GetDataAction, formData: FormData) => {
  // Check type formData.
  if (!(formData instanceof FormData)) {
    return {
      formState: { ...prevState.formState },
      errors: ["Os dados recebidos são inválidos."],
      success: false,
    };
  }

  // Get fields
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  // Check empty fiels
  if (!email || !password || !name) {
    return {
      errors: ["Todos os campos devem ser fornecidos. Tente novamente!"],
      formState: {
        name: name || "",
        email: email || "",
        password: password || "",
      },
      success: false,
    };
  }

  // Get user credentials
  const hasUser = await db.user.findUnique({
    where: { email },
  });

  // Check user existence
  if (hasUser) {
    return {
      errors: ["Não foi possível cadastrar o usuário."],
      formState: {
        name: name || "",
        email: email || "",
        password: password || "",
      },
      success: false,
    };
  }

  // Critptografy password
  const encryptPassword = await hashPassword(password);

  // Check cripto hash was success
  if (!encryptPassword) {
    return {
      errors: ["Erro 500."],
      formState: {
        name: name || "",
        email: email || "",
        password: password || "",
      },
      success: false,
    };
  }

  // Create user datas
  const newUser: UserModel = {
    id: uuid(),
    clerkUserId: "",
    email,
    name,
    password: encryptPassword,
    role: "READ",
    image: "",
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  };

  // Create user account
  try {
    await createdUserCache(newUser);
  } catch (error: unknown) {
    return {
      errors: [
        "Não foi possível cadastrar o usuário.",
        error instanceof Error ? error.message : "",
      ],
      formState: {
        name: name || "",
        email: email || "",
        password: password || "",
      },
      success: false,
    };
  }

  revalidateTag(`/`);
  redirect("/software-company");
};
