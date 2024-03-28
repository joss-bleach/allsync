import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "AllSync",
  description: "Chat with friends",
};

// Providers
import { ClerkConvexProvider } from "@/providers/clerk-convex-provider";
import { Toaster as ToastProvider } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <ClerkConvexProvider>
          <ToastProvider richColors />
          {children}
        </ClerkConvexProvider>
      </body>
    </html>
  );
}
