import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import FormSignIn from "../form";

describe("Component Form of SignIn Page", () => {
  it("Test of Component Render", () => {
    render(<FormSignIn />);

    // Exemplo: verifica se um input de email está presente
    const emailInput = screen.getByPlaceholderText(/email/i);
    expect(emailInput).toBeInTheDocument();

    // Outra opção: verifica se o botão de submit está presente
    const submitButton = screen.getByRole("button", { name: /sign in/i });
    expect(submitButton).toBeInTheDocument();
  });
});
