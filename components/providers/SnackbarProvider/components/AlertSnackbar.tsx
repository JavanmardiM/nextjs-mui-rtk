import { forwardRef, useCallback } from "react";
import { Snackbar, Alert, AlertProps } from "@mui/material";
import { useSnackbar, type CustomContentProps } from "notistack";

interface Props extends Omit<CustomContentProps, "variant"> {
  dismissible?: boolean;
  variant?: AlertProps["severity"];
}

export const AlertSnackbar = forwardRef<HTMLDivElement, Props>(
  ({ message, hideIconVariant, variant = "info", style, dismissible = true, id }, ref) => {
    const { closeSnackbar } = useSnackbar();

    const dismiss = useCallback(() => {
      if (!dismissible) return;
      closeSnackbar(id);
    }, [dismissible, closeSnackbar, id]);

    return (
      <Snackbar open onClose={dismiss} autoHideDuration={variant === "info" ? 4000 : null}>
        <Alert
          ref={ref}
          severity={variant}
          onClose={dismissible ? dismiss : undefined}
          variant="filled"
          sx={{
            borderRadius: 2,
            minWidth: "100%",
            maxWidth: "20rem",
            boxShadow: 3,
            typography: "body2",
          }}
          icon={hideIconVariant ? false : undefined}
          style={style}
        >
          {message}
        </Alert>
      </Snackbar>
    );
  }
);

AlertSnackbar.displayName = "AlertSnackbar";
