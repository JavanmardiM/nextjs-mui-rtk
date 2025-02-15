import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from "./locale";

export default getRequestConfig(async () => {
  const { locale } = await getUserLocale();
  let messages;

  try {
    messages = (await import(`./messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale "${locale}":`, error);
    const fallbackLocale = "en";
    messages = (await import(`./messages/${fallbackLocale}.json`)).default;
  }

  return {
    locale,
    messages,
  };
});
