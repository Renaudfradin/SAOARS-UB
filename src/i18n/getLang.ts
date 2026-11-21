import { cookies, headers } from "next/headers";
import { DEFAULT_LOCALE, LANG_COOKIE, isLocale, type Locale } from "./locale";

export async function getLang(): Promise<Locale> {
  const fromCookie = (await cookies()).get(LANG_COOKIE)?.value;
  if (isLocale(fromCookie)) return fromCookie;
  const hinted = (await headers()).get("x-saoub-lang");
  if (isLocale(hinted)) return hinted;
  return DEFAULT_LOCALE;
}
