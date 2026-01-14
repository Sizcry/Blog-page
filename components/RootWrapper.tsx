// app/components/RootWrapper.tsx
"use client"; // client component for hooks

import { usePathname } from "next/navigation";
import Navbar from "./global-ui/navbar";
import Footer from "./global-ui/footer";

export default function RootWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && <Navbar />}
      {children}
      {!isDashboard && <Footer />}
    </>
  );
}
