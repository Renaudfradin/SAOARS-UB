import React from "react";
import { useLang } from "@/context/LangContext.jsx";
import { LANG_LABELS } from "@/i18n/ui.js";

export default function LanguagesBox({ item }) {
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
            onClick={() => setLang(code)}
          >
            {LANG_LABELS[code] || code}
          </button>
        ))}
      </div>
    </div>
  );
}
