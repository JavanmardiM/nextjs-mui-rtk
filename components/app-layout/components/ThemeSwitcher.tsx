"use client";

import { setUserTheme } from "@/lib/theme";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleDarkMode = () => {
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
    setUserTheme(newTheme);
  };

  return (
    <IconButton onClick={toggleDarkMode} color="inherit">
      {isDark ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
}

export default ThemeSwitcher;
