// Employee functions that must be simulated later.
import React from "react";

export const useUser = () => ({
  isSignedIn: false,
  user: null,
});

export const SignInButton = jest.fn(
  ({ children }: { children: React.ReactNode }) => (
    <button data-testid="mock-signin-button">{children}</button>
  ),
);

export const ClerkProvider = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

export const SignedIn = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

export const SignedOut = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
