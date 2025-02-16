import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Button, MenuItem, Popover, List } from "@mui/material";
import { useState } from "react";

import iranFlag from "./flag/iran.svg";
import usaFlag from "./flag/usa.svg";
import { Locale } from "@/lib/lang/config";
import { setUserLocale } from "@/lib/lang/locale";
import { useTransition } from "react";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isPending, startTransition] = useTransition();

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleChange(value: string) {
    const newLocale = value as Locale;
    startTransition(() => {
      setUserLocale(newLocale);
      handleClose();
    });
  }

  const open = Boolean(anchorEl);
  const id = open ? "locale-popover" : undefined;

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClick}
        disabled={isPending}
        endIcon={<span className="arrow-down-icon" />}
      >
        {t(locale)}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <List>
          <MenuItem onClick={() => handleChange("en")}>
            <Image alt={t("en")} src={usaFlag} width={20} height={15} />{" "}
            {t("en")}
          </MenuItem>
          <MenuItem onClick={() => handleChange("fa")}>
            <Image alt={t("fa")} src={iranFlag} width={20} height={15} />{" "}
            {t("fa")}
          </MenuItem>
        </List>
      </Popover>
    </>
  );
}
