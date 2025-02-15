"use server";

import { cookies } from "next/headers";
import { defaultLocale, Locale, localeConfig } from "./config";

const COOKIE_NAME = "TUG_LOCALE";

export async function getUserLocale() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get(COOKIE_NAME)?.value as Locale) || defaultLocale;
  const direction = localeConfig[locale]?.direction;
  return { locale, direction };
}

export async function setUserLocale(locale: Locale) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, locale);
}
