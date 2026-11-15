"use client";

import React from "react";
import { useLang } from "@/context/LangContext.jsx";
import Frame from "@components/ui/Frame.jsx";

export default function Privacy() {
  const { t } = useLang();
  return (
    <>
      <Frame label="PAGE: PRIVACY">
        <article className="prose">
          <h1>{t("privacy.title")}</h1>
          <p>{t("privacy.body")}</p>
        </article>
      </Frame>
    </>
  );
}
