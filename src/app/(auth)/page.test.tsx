import { fireEvent, render, screen, waitFor } from "@testing-library/react";

// Component Test
import LoginPage from "./page";

// Mock
import { SignInButton } from "@/__mocks__/@clerk/nextjs";
import { loginAction } from "@/src/actions/signIn";

describe("SignIn Include Form", () => {
  // Form Role
  it("Should be render a role form intro component", () => {
    render(<LoginPage />);

    const formElement = screen.getByRole("form");
    expect(formElement).toBeInTheDocument();
  });

  // Form Element
  it("Should be render a form element on component", () => {
    const { container } = render(<LoginPage />);
    const formElement = container.querySelector("form");
    expect(formElement).toBeInTheDocument();
  });

  // Fields Inputs
  it("Should be render fields inputs for email and password", () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
  });

  // Button Sign In
  it("Should be render a button element with call action on submit form", async () => {
    render(<LoginPage />);

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/senha/i);

    const signInButton = screen.getByTestId("button-element-signin");

    fireEvent.change(emailInput, {
      target: { value: "test@example.com" },
    });
    fireEvent.change(passwordInput, {
      target: { value: "password" },
    });

    const email = "test@example.com";
    const password = "password";

    expect(signInButton).toBeInTheDocument();

    const form = screen.getByRole("form");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(loginAction).toHaveBeenCalled();

      const [prevState, formData] = (loginAction as jest.Mock).mock.calls[0];

      expect(prevState.success).toBe(true);
      expect(formData.get("email")).toBe(email);
      expect(formData.get("password")).toBe(password);
    });
  });

  // Button Google Sign In
  it("Should be render a button element an redirect to Clerk on click todo sign in.", () => {
    render(<LoginPage />);

    const googleButtonText = screen.getByText(/Entrar com o Google/i);
    expect(googleButtonText).toBeInTheDocument();

    // Button Google
    const googleButton = screen.getByTestId("mock-signin-button");

    fireEvent.click(googleButton);

    // Call mock Sign In Clerk
    expect(SignInButton).toHaveBeenCalled();
  });

  // Link Sign Up
  it("Should be render a link for sign up an redirect to create register page on click.", () => {
    render(<LoginPage />);

    const signUpLink = screen.getByRole("link", {
      name: /Quero cadastrar uma conta grátis!/i,
    });

    expect(signUpLink).toBeInTheDocument();
    expect(signUpLink).toHaveAttribute("href", "/create-user");
  });
});
