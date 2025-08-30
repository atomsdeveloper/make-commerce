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
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));
