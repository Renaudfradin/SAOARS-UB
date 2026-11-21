"use client";

import React from "react";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import Frame from "@components/ui/Frame";
import DetailHero from "@components/ui/DetailHero";
import LanguagesBox from "@components/ui/LanguagesBox";
import { ElementIcon } from "@components/ui/icons";
import { placeholders } from "@components/ui/media";
import type { ImaginationDetail } from "@/types/api";

export default function Imagination({ data }: { data: ImaginationDetail }) {
  const { t } = useLang();

  return (
    <>
      <Frame label="UNIT TYPE: IMAGINATION">
        <DetailHero
          name={data.name}
          image={data.image}
          fallback={placeholders.character}
          badge={<ElementIcon element={data.element} size={30} />}
        />
        <div className="panel">
          <h2 className="panel__heading">&lt;{t("detail.description")}&gt;</h2>
          <p>{data.description || "—"}</p>
          {data.character && (
            <>
              <h2 className="panel__heading">&lt;{t("detail.character")}&gt;</h2>
              <p>{data.character}</p>
            </>
          )}
        </div>
        <div style={{ marginTop: 18 }}>
          <LanguagesBox item={data} />
        </div>
        <div style={{ marginTop: 18 }}>
          <Link className="btnTag" href="/imaginations">
            {t("state.back")}
          </Link>
        </div>
      </Frame>
    </>
  );
}
