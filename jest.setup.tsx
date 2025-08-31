// Simulations required for testing

import "@testing-library/jest-dom";

// Mock Lucide
jest.mock("lucide-react", () => ({
  LogInIcon: () => null,
}));

// Using the mocked functions for Clerk from the jest.setup.tsx file
jest.mock("@clerk/nextjs");

// Mock Next.js Link
jest.mock("next/link", () => {
  const Link = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>;
  Link.displayName = "MockNextLink";
  return Link;
});

// Mock do App Router do Next.js
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: jest.fn(),
}));

// Mock loginAction
export const loginAction = jest.fn(async (data: FormData) => {
  return { success: true, ...data };
});

jest.mock("./src/app/(auth)/page", () => {
  const originalModule = jest.requireActual("./src/app/(auth)/page");
  return {
    __esModule: true,
    ...originalModule,
    loginAction, // sobrescreve o export real com o mock
  };
});
