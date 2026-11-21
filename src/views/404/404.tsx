"use client";

import React from "react";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import Frame from "@components/ui/Frame";

export default function NotFound() {
  const { t } = useLang();
  return (
    <>
      <Frame label="PAGE: 404">
        <div className="state">
          <h1>{t("notFound.title")}</h1>
          <Link className="btnTag" href="/">
            {t("notFound.back")}
          </Link>
        </div>
      </Frame>
    </>
  );
}
