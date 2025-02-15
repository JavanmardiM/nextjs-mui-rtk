"use client";

import { useSnackbar, VariantType } from "notistack";
import { useCallback } from "react";

export function useToastHandler() {
  const { enqueueSnackbar } = useSnackbar();

  const showToast = useCallback(
    (message: string, variant: VariantType = "default") => {
      if (message) {
        enqueueSnackbar(message, { variant });
      }
    },
    [enqueueSnackbar]
  );

  return { showToast };
}
