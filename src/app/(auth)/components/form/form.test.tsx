// Jest
import { render, screen } from "@testing-library/react";

// Component Test
import Form from "./index";

describe("Form", () => {
  it("renderiza campos de email e senha", () => {
    render(<Form />);

    expect(screen.getByLabelText(/dígite seu e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/dígite sua senha/i)).toBeInTheDocument();
  });

  it("renderiza botão de login", () => {
    render(<Form />);

    expect(screen.getAllByText(/login$/i)).toHaveLength(1);
  });

  it("renderiza botão de login com Google mockado", () => {
    render(<Form />);

    const googleButton = screen.getByTestId("mock-signin-button");
    expect(googleButton).toBeInTheDocument();
    expect(screen.getByText(/login with google/i)).toBeInTheDocument();
  });

  it("renderiza link de cadastro", () => {
    render(<Form />);
    expect(
      screen.getByRole("link", { name: /quero cadastrar uma conta grátis/i }),
    ).toBeInTheDocument();
  });
});
