// app/layout.tsx
import type { Metadata } from "next";
import Providers from "./providers";
import "./globals.css";
import RootWrapper from "@/components/RootWrapper";

export const metadata: Metadata = {
  title: "My Blog",
  description: "Blog website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Providers>
          <RootWrapper>{children}</RootWrapper>
        </Providers>
      </body>
    </html>
  );
}
