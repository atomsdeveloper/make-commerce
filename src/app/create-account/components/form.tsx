"use client";

// UI Shadcn
import { CardContent, CardFooter } from "../../../components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form as FormShadcn,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";

// Toastify
import { toast } from "react-toastify";

// React
import { useActionState, useEffect } from "react";

// Action
import { GetDataAccount, account } from "@/src/actions/account";

// Next
import Link from "next/link";

// React Hook Form Plus Zod
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter no mínimo 2 caracteres.",
  }),
  email: z.string().email({
    message: "Digite um e-mail válido.",
  }),
  password: z.string().min(6, {
    message: "A senha deve ter no mínimo 6 caracteres.",
  }),
});

export default function FormCreateUser() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const initialState: GetDataAccount = {
    formState: {
      name: "",
      email: "",
      password: "",
    },
    errors: [],
    success: false,
  };

  const [state, action, isPending] = useActionState(account, initialState);

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
    data: z.infer<typeof formSchema>,
  ) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);

    action(formData);
  };

  return (
    <>
      <FormShadcn {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitConvertedDataForFormDataType)}
          className="space-y-6"
          role="form"
        >
          <CardContent>
            {/* Name */}
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
                      value={formState.name}
                      onChange={(e) => {
                        field.onChange(e);
                        formState.name = e.target.value;
                      }}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription>Digite seu nome completo.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                  <FormDescription>
                    Digite seu endereço de e-mail.
                  </FormDescription>
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
                  <FormDescription>Digite sua senha.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter>
            <Button
              data-testid="button-element-signin"
              type="submit"
              variant="outline"
              className="w-full bg-stone-950 text-stone-100 mt-2 mb-2 text-sm"
              aria-label="Clique para enviar os dados e entrar na plataforma."
              // disabled={isPending}
            >
              Salvar
            </Button>

            <Link
              href="/"
              aria-label="Quero cadastrar uma conta grátis."
              className="mt-2 mb-2 text-xs underline italic cursor-pointer hover:text-slate-800"
              // aria-disabled={isPending}
            >
              Voltar para a tela de login!
            </Link>
          </CardFooter>
        </form>
      </FormShadcn>
    </>
  );
}
