import React, { createContext, useContext, useMemo, useState } from "react";
import { DEFAULT_LOCALE, LOCALES, setApiLang } from "@/api/client.js";
import { translate } from "@/i18n/ui.js";

const STORAGE_KEY = "saoub.lang";

function initialLang() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (LOCALES.includes(stored)) return stored;
  const browser = navigator.language?.slice(0, 2);
  return LOCALES.includes(browser) ? browser : DEFAULT_LOCALE;
}

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    const value = initialLang();
    setApiLang(value);
    return value;
  });

  const value = useMemo(() => {
    const setLang = (next) => {
      if (!LOCALES.includes(next)) return;
      localStorage.setItem(STORAGE_KEY, next);
      setApiLang(next);
      document.documentElement.lang = next;
      setLangState(next);
    };
    return { lang, setLang, t: (key) => translate(lang, key) };
  }, [lang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
