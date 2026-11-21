import React from "react";
import { useLang } from "@/context/LangContext";
import { isLocale } from "@/i18n/locale";
import { langLabel } from "@/i18n/ui";
import type { ApiRecord } from "@/types/api";

export default function LanguagesBox({ item }: { item: ApiRecord }) {
  const { lang, setLang, t } = useLang();
  const locales = item.available_locales || [];
  if (locales.length < 2) return null;

  return (
    <div className="panel">
      <h2 className="panel__heading">&lt;{t("detail.languages")}&gt;</h2>
      <div className="languages">
        {locales.map((code) => (
          <button
            key={code}
            type="button"
            className={`btnTag ${code === lang ? "btnTag--active" : ""}`}
            onClick={() => {
              if (isLocale(code)) setLang(code);
            }}
          >
            {langLabel(code)}
          </button>
        ))}
      </div>
    </div>
  );
}
