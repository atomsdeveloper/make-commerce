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

// React
// import { useActionState } from "react";

// Action
// import { loginAction } from "@/src/actions/loginAction";

export default function Form() {
  // TODO: Add form validation and types
  // const initialState = {
  //   formState: {
  //     email: "",
  //     password: "",
  //   },
  //   error: [],
  //   success: false,
  // };

  // const { state, action, isPending } = useActionState(
  //   loginAction,
  //   initialState
  // );

  return (
    <form
      action={""}
      role="form"
      className="flex flex-col justify-around h-full"
    >
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
              // defaultValue={state.formState.email}
              required
              //  disabled={isPending}
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
              // disabled={isPending}
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col  justify-between">
        <Button
          data-testid="button-element-signin"
          type="submit"
          variant="outline"
          className="w-full bg-stone-950 text-stone-100 mt-2 mb-2 text-sm"
          aria-label="Clique para enviar os dados e entrar na plataforma."
          // disabled={isPending}
        >
          Entrar
        </Button>

        <SignInButton>
          <div
            className="w-full mt-2 mb-2 flex items-center text-sm justify-center border rounded-md px-4 py-2 hover:bg-gray-100"
            aria-label="Entrar com o Google."
          >
            <LogInIcon className="mr-2" size={16} />
            Entrar com o Google
          </div>
        </SignInButton>

        <Link
          href="/create-user"
          title="Criar conta totalmente grátis."
          aria-label="Quero cadastrar uma conta grátis."
          className="mt-2 mb-2 text-xs underline italic cursor-pointer hover:text-slate-800"
          // aria-disabled={isPending}
        >
          Quero cadastrar uma conta grátis!
        </Link>
      </CardFooter>
    </form>
  );
}
