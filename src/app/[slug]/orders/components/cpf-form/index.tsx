"use client";

// Next
import { usePathname, useRouter } from "next/navigation";

// React
import { FormProvider, useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";

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

// Helpers
import { isValidCpf, removeCpfPunctuation } from "../../../../../helpers/cpf";

// Craindo esquema de válidação de formulário com o zod.
export const formSchema = z.object({
  cpf: z
    .string()
    .trim()
    .min(1)
    .refine((value) => isValidCpf(value), {
      message: "CPF é obrigatório",
    }),
});

// Criando o tipo TypeFormSchema para receber a referência de formSchema acima.
type TypeFormSchema = z.infer<typeof formSchema>;

const CpfForm = () => {
  const router = useRouter();
  const path = usePathname();

  // React useForm usa o TypeFormSchema criado acima como tipos.
  const form = useForm<TypeFormSchema>({
    // React useForm usa o formSchema criado acima para válidar o formulário com os dados.
    resolver: zodResolver(formSchema),
    defaultValues: {
      cpf: "",
    },
    shouldUnregister: true,
  });

  // Só vai ser executado se os dados do formulário forem válidos.
  const onSubmit = async (data: TypeFormSchema) => {
    router.replace(`${path}?cpf=${removeCpfPunctuation(data.cpf)}`);
  };

  const handleCancel = () => router.back();

  return (
    <Drawer open>
      <DrawerTrigger asChild></DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Visualizar Pedido</DrawerTitle>
          <DrawerDescription>
            Insira seu CPF abaixo para visualizar os seus pedidos
          </DrawerDescription>
        </DrawerHeader>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* CPF */}
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem className="px-4">
                  <FormLabel>CPF</FormLabel>

                  <FormControl>
                    {/* Máscara de CPF */}
                    <PatternFormat
                      placeholder="Dígite seu CPF"
                      format="###.###.###-##"
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
                variant="destructive"
                className="w-full rounded-full"
              >
                Confirmar
              </Button>

              <DrawerClose asChild>
                <Button
                  variant="outline"
                  className="w-full rounded-full"
                  onClick={handleCancel}
                >
                  Cancelar
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </FormProvider>
      </DrawerContent>
    </Drawer>
  );
};

export default CpfForm;
