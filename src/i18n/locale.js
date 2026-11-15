export const LOCALES = ["fr", "en", "zh", "ko", "ja", "de", "es"];
export const DEFAULT_LOCALE = "fr";
export const LANG_COOKIE = "saoub.lang";
export const LANG_MAX_AGE = 60 * 60 * 24 * 365;

export function langFromAccept(header) {
  if (!header) return DEFAULT_LOCALE;
  const tags = header.split(",").map((part) => part.trim().split(";")[0].toLowerCase());
  for (const tag of tags) {
    const code = tag.slice(0, 2);
    if (LOCALES.includes(code)) return code;
  }
  return DEFAULT_LOCALE;
}

export function writeLangCookie(lang) {
  document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=${LANG_MAX_AGE}; samesite=lax`;
}
