"use client";

import React, { createContext, useContext, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { LANG_COOKIE, LOCALES, writeLangCookie } from "@/i18n/locale.js";
import { translate } from "@/i18n/ui.js";

const LangContext = createContext(null);

export function LangProvider({ lang, children }) {
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem(LANG_COOKIE);
    if (!stored) return;
    localStorage.removeItem(LANG_COOKIE);
    if (LOCALES.includes(stored) && stored !== lang) {
      writeLangCookie(stored);
      router.refresh();
    }
  }, [lang, router]);

  const value = useMemo(() => {
    const setLang = (next) => {
      if (!LOCALES.includes(next) || next === lang) return;
      writeLangCookie(next);
      document.documentElement.lang = next;
      router.refresh();
    };
    return { lang, setLang, t: (key) => translate(lang, key) };
  }, [lang, router]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
