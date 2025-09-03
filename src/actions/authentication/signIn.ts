"use server";

// Database
import { db } from "../../lib/prisma";

// Next
import { redirect } from "next/navigation";

// Utils Type
import { GetDataAction } from "../../utils/actions/type-form-credentials";

// Utils Fn
import {
  checkPassword,
  createLoginSession,
} from "../../utils/actions/manage-login";

export const signIn = async (
  prevState: GetDataAction,
  formData: FormData,
): Promise<GetDataAction> => {
  // Check type formData
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

  // Check empty fields
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
  const user = await db.user.findUnique({
    where: { email },
  });

  // Check has hash pass.
  if (!user) {
    return {
      errors: ["Usuário não encontrado."],
      formState: {
        email: email || "",
        password: password || "",
      },
      success: false,
    };
  }

  // Check if password is valid
  const hasPassHash = await checkPassword(password, "base64");

  // Check pass user is valid
  if (!hasPassHash) {
    return {
      errors: ["Email e/ou senha inválidos."],
      formState: {
        email: email || "",
        password: password || "",
      },
      success: false,
    };
  }

  await createLoginSession(email);

  redirect("/software-company");
};
