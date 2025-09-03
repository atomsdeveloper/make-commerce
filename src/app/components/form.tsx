"use client";

// UI Shadcn
import { CardContent, CardFooter } from "../../../src/components/ui/card";
import { Input } from "../../../src/components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Form as FormShadcn,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../src/components/ui/form";

// Toastify
import { toast } from "react-toastify";

// React
import { useActionState, useEffect, useTransition } from "react";

// Action
import { account } from "../../actions/authentication/account";
import { signIn } from "../../actions/authentication/signIn";

// Next
import Link from "next/link";

// React Hook Form Plus Zod
import { useForm } from "react-hook-form";

// Zod
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormSchema } from "../../../src/utils/zod/form-schema";

// Clerk
import { SignInButton } from "@clerk/nextjs";
import { LogInIcon } from "lucide-react";
import { GetDataAction } from "@/src/utils/actions/type-form-credentials";

// Tipo inferido dos dados do formulário
export type FormData = z.infer<FormSchema>;

export default function Form({
  formSchema,
  mode,
}: {
  formSchema: FormSchema;
  mode: "create" | "signin";
}) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: formSchema.shape.name ? "" : undefined,
      password: "",
      email: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  const initialState: GetDataAction = {
    formState: {
      name: formSchema.shape.name ? "" : undefined,
      email: "",
      password: "",
    },
    errors: [],
    success: false,
  };

  const actionMap = {
    create: account,
    signin: signIn,
  };

  const [state, action] = useActionState(actionMap[mode], initialState);

  const { formState, errors = [], success = false } = state ?? initialState;

  // Error
  useEffect(() => {
    if (errors && errors.length > 0) {
      toast.dismiss();
      errors.map((error) => toast.error(error));
    }
  }, [errors]);

  // Success
  useEffect(() => {
    if (success) {
      toast.dismiss();
      toast.success("Login realizado com sucesso!");
    }
  }, [success]);

  // TODO: Move function to utils because it is used to convert data for FormData type.
  // Convert data receive form shadcn for data form.
  const handleSubmitConvertedDataForFormDataType = (
    data: z.infer<FormSchema>,
  ) => {
    startTransition(() => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });
      action(formData);
    });
  };

  return (
    <>
      <FormShadcn {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitConvertedDataForFormDataType)}
          className="space-y-6"
          role="form"
        >
          <CardContent className="flex flex-col gap-4">
            {mode === "create" && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Seu nome"
                        type="text"
                        {...field}
                        value={formState?.name}
                        onChange={(e) => {
                          field.onChange(e);
                          formState.name = e.target.value;
                        }}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="exemplo@email.com"
                      type="email"
                      {...field}
                      value={formState.email}
                      onChange={(e) => {
                        field.onChange(e);
                        formState.email = e.target.value;
                      }}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="••••••••"
                      type="password"
                      {...field}
                      value={formState.password}
                      onChange={(e) => {
                        field.onChange(e);
                        formState.password = e.target.value;
                      }}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex flex-col">
            <Button
              data-testid="button-element-signin"
              type="submit"
              variant="outline"
              className="w-full bg-stone-950 text-stone-100 mt-2 mb-2 text-sm"
              aria-label="Clique para enviar os dados e entrar na plataforma."
              disabled={isPending}
            >
              {mode === "signin" ? "Entrar" : "Cadastrar"}
            </Button>

            {/* Sign In Form */}
            {mode === "signin" && (
              <SignInButton>
                <div
                  className="w-full mt-2 mb-2 flex items-center text-sm justify-center border rounded-md cursor-pointer px-4 py-2 hover:bg-gray-100"
                  aria-label="Entrar com o Google."
                >
                  <LogInIcon className="mr-2" size={16} />
                  Entrar com o Google
                </div>
              </SignInButton>
            )}

            <Link
              href={mode === "signin" ? "/create-account" : "/"}
              aria-label="Quero cadastrar uma conta grátis."
              className="mt-2 mb-2 text-xs underline italic cursor-pointer hover:text-slate-800"
              aria-disabled={isPending}
            >
              {mode === "signin"
                ? "Quero ir para a tela de cadastro!"
                : "Voltar para a tela de login!"}
            </Link>
          </CardFooter>
        </form>
      </FormShadcn>
    </>
  );
}
