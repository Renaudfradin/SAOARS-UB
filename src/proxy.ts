import { NextResponse, type NextRequest } from "next/server";
import { LANG_COOKIE, LANG_MAX_AGE, isLocale, langFromAccept } from "@/i18n/locale";

export function proxy(request: NextRequest) {
  const current = request.cookies.get(LANG_COOKIE)?.value;
  const lang = isLocale(current) ? current : langFromAccept(request.headers.get("accept-language"));
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
