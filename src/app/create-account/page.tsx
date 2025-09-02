"use client";

import { useEffect } from "react";
// UI Shadcn
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

// Components
import FormCreateUser from "./components/form";

// Next
import { useRouter } from "next/navigation";

// Clerk
import { useUser } from "@clerk/nextjs";

export default function CreateUser() {
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
        aria-label="Formulário de cadastro"
        className="h-[480px] max-w-full flex justify-between flex-1"
      >
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription className="text-xs">
            Enter your datas below to create your account now
          </CardDescription>
        </CardHeader>
      </Card>

      <FormCreateUser />
    </div>
  );
}
