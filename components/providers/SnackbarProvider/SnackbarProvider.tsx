"use client";

import {
  SnackbarProvider as NotiStackSnackbarProvider,
  type SnackbarProviderProps,
} from "notistack";
import { useRef } from "react";
import { AlertSnackbar } from "./components/AlertSnackbar";

type CustomProps = {
  dismissible?: boolean;
};

declare module "notistack" {
  interface VariantOverrides {
    default: true;
    error: CustomProps;
    info: CustomProps;
    success: CustomProps;
    warning: CustomProps;
  }
}
export function SnackbarProvider(props: SnackbarProviderProps) {
  const notistackRef = useRef<NotiStackSnackbarProvider>(null);

  return (
    <NotiStackSnackbarProvider
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      autoHideDuration={3500}
      Components={{
        error: AlertSnackbar,
        info: AlertSnackbar,
        success: AlertSnackbar,
        warning: AlertSnackbar,
        default: AlertSnackbar,
      }}
      dense
      disableWindowBlurListener
      maxSnack={5}
      preventDuplicate
      ref={notistackRef}
      {...props}
    />
  );
}
