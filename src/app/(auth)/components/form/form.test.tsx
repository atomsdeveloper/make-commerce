// Jest
import { render, screen } from "@testing-library/react";

// Component Test
import Form from "./index";

describe("Form", () => {
  // Form Role
  it("Should be render a role form intro component", () => {
    render(<Form />);

    const formElement = screen.getByRole("form");
    expect(formElement).toBeInTheDocument();
  });

  // Form Element
  it("Should be render a form element on component", () => {
    const { container } = render(<Form />);
    const formElement = container.querySelector("form");
    expect(formElement).toBeInTheDocument();
  });

  // Fields Inputs
  it("Should be render fields inputs for email and password", () => {
    render(<Form />);
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
  });

  // Button Sign In
  it("Should be render a button element to Sign In", () => {
    render(<Form />);

    const signInButton = screen.getByTestId("button-element-signin");

    expect(signInButton).toBeInTheDocument();
  });

  // Button Google
  it("Should be render a button element to Sign In with Google", () => {
    render(<Form />);

    const googleButton = screen.getByText(/Entrar com o Google/i);
    expect(googleButton).toBeInTheDocument();
  });

  // Link Sign Up
  it("Should be render a link for sign up", () => {
    render(<Form />);
    expect(
      screen.getByRole("link", { name: /Quero cadastrar uma conta grátis!/i }),
    ).toBeInTheDocument();
  });
});
