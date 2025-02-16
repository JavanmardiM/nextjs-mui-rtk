import { Box } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Dashboard() {
  const t = useTranslations();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <div>{t("DASHBOARD_WELCOME_MESSAGE")}</div>
      <Link
        href="/admin/users"
        style={{
          marginTop: "20px",
          textDecoration: "none",
          color: "#1976d2",
        }}
      >
        {t("DASHBOARD_USER_BUTTON")}
      </Link>
    </Box>
  );
}
