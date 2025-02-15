"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

function GlobalProviders({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider attribute="class" enableSystem>
      {children}
    </ThemeProvider>
  );
}

export default GlobalProviders;
