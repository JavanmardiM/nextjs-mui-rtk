"use client";
import React from "react";
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import Link from "next/link";
import GenerateMenuItems from "@/lib/constants/menuItems";
import { ICONS } from "./icons";
import { useTranslations } from "next-intl";

interface SidebarProps {
  open: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ open, toggleSidebar }: SidebarProps) => {
  const menuItems = GenerateMenuItems();
  const t = useTranslations();

  const handleMenuItemClick = () => {
    toggleSidebar();
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={toggleSidebar}
      variant="temporary"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          position: "relative",
        },
      }}
    >
      <Box sx={{ width: 240, padding: 2 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          {t("SIDEBAR_TITLE")}
        </Typography>
        <List>
          {menuItems.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <ListItem
                key={item.key}
                component={Link}
                href={item.route}
                onClick={handleMenuItemClick}
              >
                <ListItemIcon>{Icon && <Icon size={20} />}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
