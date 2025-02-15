import { useTranslations } from "next-intl";

type SubMenuItem = {
  key: string;
  icon: string;
  label: string;
  route: string;
};

type MenuItem = {
  children: SubMenuItem[];
} & SubMenuItem;

const GenerateMenuItems = () => {
  const t = useTranslations();

  const MENU_ITEMS: MenuItem[] = [
    {
      key: "dashboard",
      icon: "LayoutDashboard",
      label: t("SIDEBAR_DASHBOARD"),
      route: "/admin/dashboard",
      children: [],
    },
    {
      key: "users",
      icon: "Users",
      label: t("SIDEBAR_USERS"),
      route: "/admin/users",
      children: [],
    },
  ];

  return MENU_ITEMS;
};

export default GenerateMenuItems;
