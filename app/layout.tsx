import type { Metadata } from "next";
import "./globals.css";
import { getLocale, getMessages } from "next-intl/server";
import { getUserLocale } from "@/lib/lang/locale";
import { NextIntlClientProvider } from "next-intl";
import GlobalProviders from "@/components/providers/globalProviders";
import AppThemeProvider from "@/components/providers/ThemeProvider";
import { SnackbarProvider } from "@/components/providers/SnackbarProvider/SnackbarProvider";
import { ReduxProvider } from "@/components/providers/reduxProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const { direction } = await getUserLocale();
  const messages = await getMessages();

  const normalizedDirection: "ltr" | "rtl" =
    direction === "rtl" ? "rtl" : "ltr";

  return (
    <html dir={normalizedDirection} lang={locale}>
      <body>
        <ReduxProvider>
          <SnackbarProvider>
            <GlobalProviders>
              <AppThemeProvider>
                <NextIntlClientProvider messages={messages}>
                  {children}
                </NextIntlClientProvider>
              </AppThemeProvider>
            </GlobalProviders>
          </SnackbarProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
