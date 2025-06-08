"use client";

// React
import { useEffect } from "react";

// Icons
import { LogInIcon } from "lucide-react";

// Next Router
import { useRouter } from "next/navigation";

// User Clerk
import { SignInButton, useUser } from "@clerk/nextjs";

// Components
import { Button } from "../../components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import Form from "./components/form";

const LoginPage = () => {
  const { isSignedIn } = useUser();
  const router = useRouter();

  // Se o usuário já estiver logado, redireciona pra home
  useEffect(() => {
    if (isSignedIn) {
      router.replace("/ravie");
    }
  }, [isSignedIn, router]);

  return (
    <div className="flex h-full justify-center items-center">
      <Card className="h-[400px] max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="outline">Sign Up</Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <Form />
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            variant="outline"
            className="w-full bg-stone-950 text-stone-100"
          >
            Login
          </Button>

          <SignInButton>
            <Button variant="outline" className="w-full">
              <LogInIcon className="mr-2" />
              Login with Provider
            </Button>
          </SignInButton>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
