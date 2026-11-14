import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "@/context/LangContext.jsx";
import Seo from "@components/ui/Seo.jsx";
import Frame from "@components/ui/Frame.jsx";

export default function NotFound() {
  const { t } = useLang();
  return (
    <>
      <Seo title={t("notFound.title")} />
      <Frame label="PAGE: 404">
        <div className="state">
          <h1>{t("notFound.title")}</h1>
          <Link className="btnTag" to="/">
            {t("notFound.back")}
          </Link>
        </div>
      </Frame>
    </>
  );
}
