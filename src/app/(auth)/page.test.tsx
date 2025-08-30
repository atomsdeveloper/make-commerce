import { render, screen } from "@testing-library/react";

// Component Test
import LoginPage from "./page";

describe("Login integração > Form", () => {
  it("renderiza a role form dentro da página", () => {
    render(<LoginPage />);

    const formElement = screen.getByRole("form");
    expect(formElement).toBeInTheDocument();

    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();

    // Botão principal
    expect(
      screen.getByRole("button", {
        name: /clique para enviar os dados/i,
      }),
    ).toBeInTheDocument();
  });

  it("renderiza um elemento <form>", () => {
    const { container } = render(<LoginPage />);
    const formElement = container.querySelector("form");
    expect(formElement).toBeInTheDocument();
  });
});
