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
} from "@/src/components/ui/card";

// Clerk
import { useUser } from "@clerk/nextjs";

// Components
import FormSingIn from "./components/form";

export default function LoginPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/software-company");
    }
  }, [isSignedIn, router]);

  return (
    <div className="flex h-full justify-center items-center">
      <Card
        role="group"
        aria-label="Formulário de cadastro"
        className="h-[450px] max-w-[350px] flex justify-between flex-1"
      >
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription className="text-xs">
            Enter your email and password below to login to your account
          </CardDescription>
        </CardHeader>

        <FormSingIn />
      </Card>
    </div>
  );
}
