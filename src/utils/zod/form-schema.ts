import z from "zod";

export const generateFormSchema = ({ mode }: { mode: "create" | "signin" }) => {
  return z.object({
    name:
      mode === "create"
        ? z
            .string()
            .min(2, { message: "O nome deve ter no mínimo 2 caracteres." })
        : z.string().optional(),
    email: z.string().email({ message: "Digite um e-mail válido." }),
    password: z
      .string()
      .min(6, { message: "A senha deve ter no mínimo 6 caracteres." }),
  });
};

// Type of schema (ZodObject)
export type FormSchema = ReturnType<typeof generateFormSchema>;

// Type check datas zod
export type FormData = z.infer<FormSchema>;
