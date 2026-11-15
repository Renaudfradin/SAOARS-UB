import { NextResponse } from "next/server";
import { LANG_COOKIE, LANG_MAX_AGE, LOCALES, langFromAccept } from "@/i18n/locale.js";

export function proxy(request) {
  const current = request.cookies.get(LANG_COOKIE)?.value;
  const lang = LOCALES.includes(current) ? current : langFromAccept(request.headers.get("accept-language"));
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-saoub-lang", lang);
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  if (current !== lang) {
    response.cookies.set(LANG_COOKIE, lang, {
      path: "/",
      maxAge: LANG_MAX_AGE,
      sameSite: "lax",
    });
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};
