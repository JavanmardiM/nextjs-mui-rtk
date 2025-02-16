"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { getUserTheme } from "@/lib/theme";
import { useTheme } from "next-themes";

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

export default function AppThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [themeMode, setThemeMode] = useState<"dark" | "light">("light");

  useEffect(() => {
    const fetchTheme = async () => {
      const { theme } = await getUserTheme();
      if (theme) {
        setThemeMode(theme === "dark" ? "dark" : "light");
      }
    };
    fetchTheme();
  }, []);

  const { theme } = useTheme();
  const appliedTheme = theme === "dark" ? darkTheme : lightTheme;

  return <ThemeProvider theme={appliedTheme}>{children}</ThemeProvider>;
}
