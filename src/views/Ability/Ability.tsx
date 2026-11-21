"use client";

import React from "react";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import Frame from "@components/ui/Frame";
import DetailHero from "@components/ui/DetailHero";
import LanguagesBox from "@components/ui/LanguagesBox";
import { placeholders } from "@components/ui/media";
import type { AbilityDetail } from "@/types/api";

export default function Ability({ data }: { data: AbilityDetail }) {
  const { t } = useLang();

  return (
    <>
      <Frame label="UNIT TYPE: ABILITY">
        <DetailHero name={data.name} fallback={placeholders.ability} rarity={data.start} />
        <div className="panel">
          <h2 className="panel__heading">&lt;{t("detail.type")}&gt;</h2>
          <p>{data.type || t("ability.skill")}</p>
          <h2 className="panel__heading">&lt;{t("detail.description")}&gt;</h2>
          <p>{data.description || data.descripton}</p>
        </div>
        <div style={{ marginTop: 18 }}>
          <LanguagesBox item={data} />
        </div>
        <div style={{ marginTop: 18 }}>
          <Link className="btnTag" href="/abilities">
            {t("state.back")}
          </Link>
        </div>
      </Frame>
    </>
  );
}
