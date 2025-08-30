// UI Shadcn
import { CardContent, CardFooter } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Button } from "../../../../components/ui/button";

// Clerk
import { SignInButton } from "@clerk/nextjs";

// Icons
import { LogInIcon } from "lucide-react";

// Next
import Link from "next/link";

export default function FormSignIn() {
  return (
    <form className="flex flex-col justify-around h-full">
      <CardContent className="h-full flex flex-col mt-1">
        <div className="flex flex-col gap-6">
          {/* TODO: Separate component of input and label, both are equals. */}

          {/* EMAIL */}
          <div className="grid gap-2 [&>input::placeholder]:text-sm [&>input::placeholder]:italic">
            <Label htmlFor="email" className="text-xs">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              aria-label="Dígite seu e-mail."
              autoComplete="username"
              placeholder="m@example.com"
              required
            />
          </div>

          {/* PASS */}
          <div className="grid gap-2 [&>input::placeholder]:text-sm [&>input::placeholder]:italic [&>input::placeholder]">
            <Label htmlFor="password" className="text-xs">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              name="password"
              aria-label="Dígite sua senha."
              autoComplete="current-password"
              placeholder="Dígite a senha."
              required
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col  justify-between">
        <Button
          type="submit"
          variant="outline"
          className="w-full bg-stone-950 text-stone-100 mt-2 mb-2"
          aria-label="Clique para enviar os dados e entrar na plataforma."
        >
          Login
        </Button>

        <SignInButton>
          <Button
            variant="outline"
            className="w-full mt-2 mb-2"
            type="button"
            aria-label="Clique para entrar com a conta do google."
          >
            <LogInIcon className="mr-2" />
            Login with Google
          </Button>
        </SignInButton>

        <Link
          href="/create-user"
          title="Criar conta totalmente grátis."
          aria-label="Quero cadastrar uma conta grátis."
          className="mt-2 mb-2 text-xs underline italic cursor-pointer hover:text-slate-800"
        >
          Quero cadastrar uma conta grátis!
        </Link>
      </CardFooter>
    </form>
  );
}
