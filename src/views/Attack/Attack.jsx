"use client";

import React from "react";
import Link from "next/link";
import { useLang } from "@/context/LangContext.jsx";
import Frame from "@components/ui/Frame.jsx";
import LanguagesBox from "@components/ui/LanguagesBox.jsx";
import SkillCard from "@components/ui/SkillCard.jsx";

export default function Attack({ data }) {
  const { t } = useLang();

  return (
    <>
      <Frame label="UNIT TYPE: ATTACK">
        <div className="hero__name" style={{ margin: "0 auto 18px", width: "min(520px, 100%)" }}>
          {data.name}
        </div>
        <SkillCard attack={data} />
        <div style={{ marginTop: 18 }}>
          <LanguagesBox item={data} />
        </div>
        <div style={{ marginTop: 18 }}>
          <Link className="btnTag" href="/attacks">
            {t("state.back")}
          </Link>
        </div>
      </Frame>
    </>
  );
}
