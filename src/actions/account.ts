"use server";

// Next
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

// Hash
import bcrypt from "bcryptjs";

// UUID
import { v4 as uuid } from "uuid";

// Database
import { UserModel } from "../model/user/user-model";

// Libs from Database
import { db } from "../lib/prisma";
import { createdUserCache } from "../lib/user/queries/publish";

type CredentialData = {
  name: string;
  email: string;
  password: string;
};

export type GetDataAccount = {
  formState: CredentialData;
  errors: string[];
  success: boolean;
};

export const account = async (
  prevState: GetDataAccount,
  formData: FormData,
) => {
  if (!(formData instanceof FormData)) {
    return {
      formState: { ...prevState.formState },
      errors: ["Os dados recebidos são inválidos."],
      success: false,
    };
  }

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

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
  const hash = await bcrypt.hash(password, 10); // Created hash of pass.
  const base64 = Buffer.from(hash).toString("base64"); // Wrapper hash pass in base64.

  // Check unpack hash was success
  if (!base64) {
    return {
      errors: ["Erro interno do servidor."],
      formState: {
        name: name || "",
        email: email || "",
        password: password || "",
      },
      success: false,
    };
  }

  const newUser: UserModel = {
    id: uuid(),
    clerkUserId: "",
    email,
    name,
    password: base64,
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
