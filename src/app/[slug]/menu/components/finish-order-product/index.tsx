"use client";

import { Method } from "@prisma/client";
import { Loader2Icon } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { useContext, useTransition } from "react";
import { toast } from "sonner";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../../../../../components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../../../../components/ui/drawer";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../components/ui/form";
import { Input } from "../../../../../components/ui/input";

import { createOrder } from "../../actions/create-orders";
import { CartContext } from "../../context/cart";
import { isValidCpf } from "../../../../../helpers/cpf";

export const formSchema = z.object({
  name: z.string().trim().min(1, { message: "O nome é obrigatório" }),
  cpf: z
    .string()
    .trim()
    .min(1, { message: "O CPF é obrigatório." })
    .refine((value) => isValidCpf(value), { message: "CPF inválido" }),
  street: z.string().trim().min(1, { message: "A rua é obrigatória" }),
  number: z.string().trim().min(1, { message: "O número é obrigatório" }),
  city: z.string().trim().min(1, { message: "A cidade é obrigatória" }),
  state: z.string().trim().min(1, { message: "O estado é obrigatório" }),
  country: z.string().trim().min(1, { message: "O país é obrigatório" }),
  zipCode: z.string().trim().min(1, { message: "O CEP é obrigatório" }),
});

type TypeFormSchema = z.infer<typeof formSchema>;

interface FinishOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FinishOrderDialog = ({ open, onOpenChange }: FinishOrderDialogProps) => {
  const { productsCart } = useContext(CartContext);
  const { slug } = useParams<{ slug: string }>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<TypeFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpf: "",
      street: "",
      number: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    },
    shouldUnregister: true,
  });

  const consumptionMethod = useSearchParams().get("method") as Method;

  const onSubmit = (data: TypeFormSchema) => {
    startTransition(async () => {
      try {
        await createOrder({
          consumptionMethod,
          customerCpf: data.cpf,
          customerName: data.name,
          products: productsCart,
          city: data.city,
          country: data.country,
          number: data.number,
          state: data.state,
          street: data.street,
          zipCode: data.zipCode,
          slug,
        });

        onOpenChange(false);
        toast.success("Pedido finalizado com sucesso.");
      } catch (error) {
        toast.error(`Erro ao finalizar o pedido. Tente novamente. ${error}`);
      }
    });
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild></DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Finalizar Pedido</DrawerTitle>
          <DrawerDescription>
            Insira suas informações abaixo para finalizar o seu pedido
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-5 overflow-y-auto">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* NOME */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite seu nome..."
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* CPF */}
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu CPF</FormLabel>
                    <FormControl>
                      <PatternFormat
                        placeholder="Digite seu CPF"
                        format="###.###.###-##"
                        mask="_"
                        customInput={Input}
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ENDEREÇO */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rua</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex.: Av. Paulista"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex.: 1000"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cidade</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex.: São Paulo"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex.: SP"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>País</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex.: Brasil"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CEP</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex.: 01311-000"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Ações */}
              <DrawerFooter>
                <Button
                  type="submit"
                  className="rounded-full"
                  variant="destructive"
                  disabled={isPending}
                >
                  {isPending && (
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Finalizar
                </Button>

                <DrawerClose asChild>
                  <Button
                    variant="outline"
                    className="w-full rounded-full"
                    disabled={isPending}
                  >
                    Cancelar
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </FormProvider>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FinishOrderDialog;
