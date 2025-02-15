export type Locale = (typeof locales)[number];

export const locales = ["en", "fa"] as const;
export const defaultLocale: Locale = "en";

export const localeConfig = {
  en: { direction: "ltr" },
  fa: { direction: "rtl" },
};
