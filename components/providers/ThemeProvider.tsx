"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { getUserTheme } from "@/lib/theme"; // Import your function to get the theme from the cookie
import { useTheme } from "next-themes"; // Use next-themes to detect theme

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export default function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeMode] = useState<"dark" | "light">("light");

  useEffect(() => {
    // Fetch the theme from the cookie or `next-themes`
    const fetchTheme = async () => {
      const { theme } = await getUserTheme();
      if (theme) {
        setThemeMode(theme === "dark" ? "dark" : "light");
      }
    };
    fetchTheme();
  }, []);

  // Fallback to next-themes if needed
  const { theme } = useTheme();
  const appliedTheme = theme === "dark" ? darkTheme : lightTheme;

  return <ThemeProvider theme={appliedTheme}>{children}</ThemeProvider>;
}
