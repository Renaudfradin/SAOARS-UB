import React from "react";
import { Link, useParams } from "react-router-dom";
import { useLang } from "@/context/LangContext.jsx";
import { useDetail } from "@/hook/queries.js";
import Seo from "@components/ui/Seo.jsx";
import Frame from "@components/ui/Frame.jsx";
import DetailHero from "@components/ui/DetailHero.jsx";
import LanguagesBox from "@components/ui/LanguagesBox.jsx";
import { ErrorState, Loading } from "@components/ui/StateView.jsx";
import { placeholders } from "@components/ui/media.js";

export default function Ability() {
  const { slug } = useParams();
  const { t } = useLang();
  const { data, isLoading, isError, error } = useDetail("ability", slug);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorState error={error} backTo="/abilities" />;
  if (!data) return <ErrorState error={{ response: { status: 404 } }} backTo="/abilities" />;

  return (
    <>
      <Seo title={data.name} description={data.description || data.descripton} />
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
          <Link className="btnTag" to="/abilities">
            {t("state.back")}
          </Link>
        </div>
      </Frame>
    </>
  );
}
