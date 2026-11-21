"use client";

import React, { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { LANG_COOKIE, isLocale, writeLangCookie, type Locale } from "@/i18n/locale";
import { translate } from "@/i18n/ui";

type LangValue = {
  lang: Locale;
  setLang: (next: Locale) => void;
  t: (key: string) => string;
};

const LangContext = createContext<LangValue | null>(null);

export function LangProvider({ lang, children }: { lang: Locale; children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem(LANG_COOKIE);
    if (!stored) return;
    localStorage.removeItem(LANG_COOKIE);
    if (isLocale(stored) && stored !== lang) {
      writeLangCookie(stored);
      router.refresh();
    }
  }, [lang, router]);

  const value = useMemo(() => {
    const setLang = (next: Locale) => {
      if (!isLocale(next) || next === lang) return;
      writeLangCookie(next);
      document.documentElement.lang = next;
      router.refresh();
    };
    return { lang, setLang, t: (key: string) => translate(lang, key) };
  }, [lang, router]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const value = useContext(LangContext);
  if (!value) throw new Error("useLang must be used within LangProvider");
  return value;
}
