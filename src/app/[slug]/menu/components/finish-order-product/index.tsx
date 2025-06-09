"use client";

// Database
import { Method } from "@prisma/client";

// Icons
import { Loader2Icon } from "lucide-react";

// Next
import { useParams, useSearchParams } from "next/navigation";

// React
import { FormProvider, useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { useContext, useTransition } from "react";

import { toast } from "sonner";

// Zod
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Components UI
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

// Actions
import { createOrder } from "../../actions/create-orders";

// Context
import { CartContext } from "../../context/cart";

// Helpers
import { isValidCpf } from "../../../../../helpers/cpf";

// Craindo esquema de válidação de formulário com o zod.
export const formSchema = z.object({
  // Dados do formúlario.
  name: z.string().trim().min(1, {
    message: "O nome é obrigatório",
  }),
  cpf: z
    .string()
    .trim()
    .min(1, {
      message: "O CPF é obrigatório.",
    })
    .refine((value) => isValidCpf(value), {
      message: "CPF inválido",
    }),
});

// Criando o tipo TypeFormSchema para receber a referência de formSchema acima.
type TypeFormSchema = z.infer<typeof formSchema>;

// Tipo para o fechar o Dialog de finalizar o Pedido.
interface FinishOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FinishOrderDialog = ({ open, onOpenChange }: FinishOrderDialogProps) => {
  const { productsCart } = useContext(CartContext);
  const { slug } = useParams<{ slug: string }>();

  const [isPending, startTransition] = useTransition();

  // React useForm usa o TypeFormSchema criado acima como tipos.
  const form = useForm<TypeFormSchema>({
    // React useForm usa o formSchema criado acima para válidar o formulário com os dados.
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpf: "",
    },
    shouldUnregister: true,
  });

  const consumptionMethod = useSearchParams().get("method") as Method;

  // Só vai ser executado se os dados do formulário forem válidos.
  const onSubmit = async (data: TypeFormSchema) => {
    try {
      startTransition(async () => {
        await createOrder({
          consumptionMethod,
          customerCpf: data.cpf,
          customerName: data.name,
          products: productsCart,
          slug,
        });

        onOpenChange(false);
        toast.success("Pedido finalizado com sucesso.");
      });
      toast.success("Pedido finalizado com sucesso.");
    } catch (error) {
      toast.error(`Erro ao finalizar o pedido. Tente novamente. ${error}`);
    }
  };
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild></DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Finalizar Pedido</DrawerTitle>
          <DrawerDescription>
            Insira sua informações abaixo para finalizar o seu pedido
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-5">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* NOME */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>

                    <FormControl>
                      <Input placeholder="Dígite seu nome..." {...field} />
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
                      {/* Máscara de CPF */}
                      <PatternFormat
                        placeholder="Dígite seu CPF"
                        format="###.###.###-##"
                        mask="_"
                        customInput={Input}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Botões do Dialog */}
              <DrawerFooter>
                <Button
                  type="submit"
                  className="rounded-full"
                  variant="destructive"
                  disabled={isPending}
                >
                  {isPending && <Loader2Icon className="animate-spin" />}
                  Finalizar
                </Button>

                <DrawerClose asChild>
                  <Button variant="outline" className="w-full rounded-full">
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
