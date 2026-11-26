export const LOCALES = ["fr", "en", "zh", "ko", "ja", "de", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "fr";
export const LANG_COOKIE = "saoub.lang";
export const LANG_MAX_AGE = 60 * 60 * 24 * 365;

export function isLocale(value: string | null | undefined): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

export function langFromAccept(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE;
  const tags = header.split(",").map((part) => part.trim().split(";")[0].toLowerCase());
  for (const tag of tags) {
    const code = tag.slice(0, 2);
    if (isLocale(code)) return code;
  }
  return DEFAULT_LOCALE;
}

export function writeLangCookie(lang: Locale) {
  document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=${LANG_MAX_AGE}; samesite=lax`;
}
