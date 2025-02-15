"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { loginUser } from "@/services/login";
import { CircularProgress } from "@mui/material";
import { useToastHandler } from "@/hooks/useToastHandler";
import { VariantType } from "notistack";
import { setUserToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow: theme.shadows[3],
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: "\"\"",
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    background: theme.palette.mode === "dark" ? theme.palette.background.default : theme.palette.background.paper,
  },
}));

const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .default("eve.holt@reqres.in"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .default("cityslicka"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

function Login() {
  const t = useTranslations();
  const router = useRouter();
  const { showToast } = useToastHandler();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    },
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const result = await loginUser(data.email, data.password);
      let toastVariant: VariantType = "default";
      let toastMsg = "";
      if ("token" in result) {
        toastMsg = t("LOGIN_SUCCESS_MESSAGE");
        toastVariant = "success";

        setUserToken(result.token);
      } else {
        toastMsg = t("LOGIN_ERROR_MESSAGE");
        toastVariant = "error";
      }
      router.push("/admin/dashboard");
      showToast(toastMsg, toastVariant);
    } catch (error) {
      if (error instanceof Error) {
        showToast(t("LOGIN_ERROR_MESSAGE"), "error");
      }
    }
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography component="h1" variant="h4">
            {t("LOGIN_SIGN_IN")}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">{t("LOGIN_EMAIL")}</FormLabel>
              <TextField
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                id="email"
                type="email"
                placeholder={t("LOGIN_EMAIL_PLACEHOLDER")}
                autoComplete="email"
                required
                fullWidth
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">{t("LOGIN_PASSWORD")}</FormLabel>
              <TextField
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                id="password"
                type="password"
                placeholder={t("LOGIN_PASSWORD_PLACEHOLDER")}
                autoComplete="current-password"
                required
                fullWidth
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={t("LOGIN_REMEMBER_ME")}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                t("LOGIN_SIGN_IN")
              )}
            </Button>
          </Box>
        </Card>
      </SignInContainer>
    </>
  );
}

export default Login;
