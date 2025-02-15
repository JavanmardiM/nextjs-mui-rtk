"use server";

import { cookies } from "next/headers";

const COOKIE_NAME = "TUG_THEME";

export async function getUserTheme() {
  const theme = cookies().get(COOKIE_NAME)?.value || "light";
  return { theme };
}

export async function setUserTheme(theme: string) {
  cookies().set(COOKIE_NAME, theme);
}