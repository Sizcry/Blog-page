import type { Metadata } from "next";
import Providers from "./providers";
import "./globals.css";
import Navbar from "@/components/global-ui/navbar";
import Footer from "@/components/global-ui/footer";

export const metadata: Metadata = {
  title: "My Blog",
  description: "Blog website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        {/* Wrap the whole app with Providers */}
        <Providers>
          {/* Navbar */}
          <Navbar />

          {/* Main content */}
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
