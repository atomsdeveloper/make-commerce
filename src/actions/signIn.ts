"use server";

// Criptograph
import bcrypt from "bcryptjs";

// Database
import { db } from "../lib/prisma";

// Next
import { redirect } from "next/navigation";

type CredentialData = {
  email: string;
  password: string;
};

export type GetDataSignIn = {
  formState: CredentialData;
  errors: string[];
  success: boolean;
};

export const loginAction = async (
  prevState: GetDataSignIn,
  formData: FormData,
): Promise<GetDataSignIn> => {
  if (!(formData instanceof FormData)) {
    return {
      formState: { ...prevState.formState },
      errors: ["Os dados recebidos são inválidos."],
      success: false,
    };
  }

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return {
      errors: ["Email e/ou senha devem ser fornecidos."],
      formState: {
        email: email || "",
        password: password || "",
      },
      success: false,
    };
  }

  // Get user and add password hash
  const base64Hash = await db.user.findUnique({
    where: { email },
    select: { password: true },
  });

  // Check has hash pass.
  if (!base64Hash) {
    return {
      errors: ["Usuário não encontrado."],
      formState: {
        email: email || "",
        password: password || "",
      },
      success: false,
    };
  }

  // Unpack hash pass to check compare.
  const hashUnpack = Buffer.from(base64Hash.password!, "base64").toString(
    "utf-8",
  );

  // Check if password is valid
  const passwordDecrypted = await bcrypt.compare(password, hashUnpack);

  if (!passwordDecrypted) {
    return {
      errors: ["Email e/ou senha inválidos."],
      formState: {
        email: email || "",
        password: password || "",
      },
      success: false,
    };
  }

  redirect("/software-company");
};
