import React from "react";
import { Link, useParams } from "react-router-dom";
import { useLang } from "@/context/LangContext.jsx";
import { useDetail } from "@/hook/queries.js";
import Seo from "@components/ui/Seo.jsx";
import Frame from "@components/ui/Frame.jsx";
import LanguagesBox from "@components/ui/LanguagesBox.jsx";
import SkillCard from "@components/ui/SkillCard.jsx";
import { ErrorState, Loading } from "@components/ui/StateView.jsx";

export default function Attack() {
  const { slug } = useParams();
  const { t } = useLang();
  const { data, isLoading, isError, error } = useDetail("attack", slug);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorState error={error} backTo="/attacks" />;
  if (!data) return <ErrorState error={{ response: { status: 404 } }} backTo="/attacks" />;

  return (
    <>
      <Seo title={data.name} description={data.description} />
      <Frame label="UNIT TYPE: ATTACK">
        <div className="hero__name" style={{ margin: "0 auto 18px", width: "min(520px, 100%)" }}>
          {data.name}
        </div>
        <SkillCard attack={data} />
        <div style={{ marginTop: 18 }}>
          <LanguagesBox item={data} />
        </div>
        <div style={{ marginTop: 18 }}>
          <Link className="btnTag" to="/attacks">
            {t("state.back")}
          </Link>
        </div>
      </Frame>
    </>
  );
}
