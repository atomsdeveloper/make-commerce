import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Software Company",
  description: "E-commerce of sales for placing orders.",
};

// Styles
import "./globals.css";

// Clerk
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import { CartProvider } from "../app/[slug]/menu/context/cart";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className={`${poppins.className} antialiased h-full`}>
        <CartProvider>
          <ClerkProvider
            dynamic
            appearance={{
              baseTheme: dark,
            }}
          >
            {children}
          </ClerkProvider>
        </CartProvider>
      </body>
    </html>
  );
}
