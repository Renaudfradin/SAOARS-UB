import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Switch } from "antd";
import { useLang } from "@/context/LangContext.jsx";
import { translated } from "@/i18n/ui.js";
import { useDetail } from "@/hook/queries.js";
import Seo from "@components/ui/Seo.jsx";
import Frame from "@components/ui/Frame.jsx";
import DetailHero from "@components/ui/DetailHero.jsx";
import StatsPanel from "@components/ui/StatsPanel.jsx";
import SkillCard from "@components/ui/SkillCard.jsx";
import LanguagesBox from "@components/ui/LanguagesBox.jsx";
import LinkedCard from "@components/ui/LinkedCard.jsx";
import { ElementIcon } from "@components/ui/icons.jsx";
import { ErrorState, Loading } from "@components/ui/StateView.jsx";
import { placeholders } from "@components/ui/media.js";
import { mediaUrl } from "@components/ui/media.js";

export default function Character() {
  const { slug } = useParams();
  const { t, lang } = useLang();
  const { data, isLoading, isError, error } = useDetail("character", slug);
  const [enhance, setEnhance] = useState(false);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorState error={error} backTo="/characters" />;
  if (!data) return <ErrorState error={{ response: { status: 404 } }} backTo="/characters" />;

  const title = [data.name, data.description].filter(Boolean).join(" ");
  const partner = data.special_partner;
  const partnerName = partner ? translated(partner.name, lang) || partner.name : null;
  const partnerSlug = partner?.slug;
  const partnerImage = mediaUrl(partner?.image) || placeholders.character;
  const hasEnhance = Boolean(data.enhance_atk || data.enhance_atk2 || data.enhance);

  return (
    <>
      <Seo title={title} description={data.profile} />
      <Frame label="UNIT TYPE: CHARACTER">
        <DetailHero
          name={title}
          image={data.image}
          secondImage={data.image2}
          fallback={placeholders.character}
          badge={<ElementIcon element={data.element} size={30} />}
          rarity={data.start}
        >
          {data.cost != null && (
            <div className="panel" style={{ marginTop: 8 }}>
              {t("detail.cost")}: {data.cost}
            </div>
          )}
        </DetailHero>

        <div className="detailGrid">
          <div className="skills">
            <div className="panel__title" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>{enhance ? t("detail.enhance") : t("detail.skills")}</span>
              {hasEnhance && (
                <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 12 }}>
                  <Switch size="small" checked={enhance} onChange={setEnhance} />
                  {t("detail.enhance")}
                </label>
              )}
            </div>
            {!enhance ? (
              <>
                <SkillCard attack={data.atk1} />
                <SkillCard attack={data.atk2} />
                <SkillCard attack={data.atk3} />
                <SkillCard type="U" title={data.ultime} description={data.ultime_description} />
              </>
            ) : (
              <>
                <SkillCard attack={data.enhance_atk} />
                <SkillCard attack={data.enhance_atk2} />
                <SkillCard type="EM" title={data.enhance} description={data.enhance} />
              </>
            )}
          </div>
          <StatsPanel item={data} />
        </div>

        {partner && (
          <div className="panel" style={{ marginTop: 18 }}>
            <h2 className="panel__heading">&lt;{t("detail.partner")}&gt;</h2>
            <LinkedCard
              to={partnerSlug ? `/characters/${partnerSlug}` : undefined}
              image={partnerImage}
              fallback={placeholders.character}
              title={partnerName || `#${partner.id}`}
            />
          </div>
        )}

        {data.profile && (
          <div className="panel" style={{ marginTop: 18 }}>
            <h2 className="panel__heading">&lt;{t("detail.profile")}&gt;</h2>
            <p>{data.profile}</p>
          </div>
        )}

        <div style={{ marginTop: 18 }}>
          <LanguagesBox item={data} />
        </div>

        <div style={{ marginTop: 18 }}>
          <Link className="btnTag" to="/characters">
            {t("state.back")}
          </Link>
        </div>
      </Frame>
    </>
  );
}
