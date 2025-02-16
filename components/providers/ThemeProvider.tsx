"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
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
  const { theme } = useTheme();
  const appliedTheme = theme === "dark" ? darkTheme : lightTheme;

  return <ThemeProvider theme={appliedTheme}>{children}</ThemeProvider>;
}
