"use server";

import { cookies } from "next/headers";

const COOKIE_NAME = "TUG_TOKEN";

export async function getUserToken() {
  const token = cookies().get(COOKIE_NAME)?.value;
  return { token };
}

export async function setUserToken(token: string) {
  cookies().set(COOKIE_NAME, token);
}

export async function clearUserToken() {
  cookies().set(COOKIE_NAME, "", { expires: new Date(0) });
}
