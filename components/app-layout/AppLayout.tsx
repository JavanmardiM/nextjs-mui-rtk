"use client";
import { ReactNode, useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface Props {
  children: ReactNode;
}

export function AppLayout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      bgcolor="background.default"
      sx={{ minHeight: "100vh" }}
    >
      <CssBaseline />
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
      <Box component="main" flex={1} overflow="auto" bgcolor="background.paper">
        <Header toggleSidebar={toggleSidebar} />
        <Box m={2} height="100%" overflow="auto">
          {children}
        </Box>
      </Box>
    </Box>
  );
}
