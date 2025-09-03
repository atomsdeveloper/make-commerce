"use client";

// React
import { useEffect } from "react";

// Next
import { useRouter } from "next/navigation";

// UI Shadcn
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

// Clerk
import { useUser } from "@clerk/nextjs";

// Components
import Form from "../../components/form";

// Zod
import { FormSchema, generateFormSchema } from "../../../utils/zod/form-schema";

const formSchema: FormSchema = generateFormSchema({ mode: "signin" });

export default function LoginPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/software-company");
    }
  }, [isSignedIn, router]);

  return (
    <div className="flex h-full justify-center items-center p-5">
      <Card
        role="group"
        aria-label="Formulário de login"
        className="h-[420px] max-w-full flex justify-between flex-1"
      >
        <CardHeader>
          <CardTitle>Faça login na sua conta.</CardTitle>
          <CardDescription className="text-xs">
            Insira seu login e sua senha para finalizar seu pedido.
          </CardDescription>
        </CardHeader>

        <Form formSchema={formSchema} mode="signin" />
      </Card>
    </div>
  );
}
