"use client";

import { useEffect, useState } from "react";

export default function BlogFormWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Render nothing on server to avoid hydration mismatch
  if (!mounted) return null;

  return <>{children}</>;
}
