import { cookies, headers } from "next/headers";
import { DEFAULT_LOCALE, LANG_COOKIE, LOCALES } from "./locale.js";

export async function getLang() {
  const fromCookie = (await cookies()).get(LANG_COOKIE)?.value;
  if (LOCALES.includes(fromCookie)) return fromCookie;
  const hinted = (await headers()).get("x-saoub-lang");
  if (LOCALES.includes(hinted)) return hinted;
  return DEFAULT_LOCALE;
}
