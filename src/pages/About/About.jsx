import React from "react";
import { useLang } from "@/context/LangContext.jsx";
import Seo from "@components/ui/Seo.jsx";
import Frame from "@components/ui/Frame.jsx";

export default function About() {
  const { t } = useLang();
  return (
    <>
      <Seo title={t("about.title")} />
      <Frame label="PAGE: ABOUT">
        <article className="prose">
          <h1>{t("about.title")}</h1>
          <p>{t("about.body")}</p>
          <p>
            <a href="https://github.com/Renaudfradin" target="_blank" rel="noreferrer">
              RenaudFradin
            </a>
          </p>
        </article>
      </Frame>
    </>
  );
}
