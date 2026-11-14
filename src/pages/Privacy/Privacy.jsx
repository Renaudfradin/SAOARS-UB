import React from "react";
import { useLang } from "@/context/LangContext.jsx";
import Seo from "@components/ui/Seo.jsx";
import Frame from "@components/ui/Frame.jsx";

export default function Privacy() {
  const { t } = useLang();
  return (
    <>
      <Seo title={t("privacy.title")} />
      <Frame label="PAGE: PRIVACY">
        <article className="prose">
          <h1>{t("privacy.title")}</h1>
          <p>{t("privacy.body")}</p>
        </article>
      </Frame>
    </>
  );
}
