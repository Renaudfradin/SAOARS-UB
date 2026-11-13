import React from "react";
import { Link, useParams } from "react-router-dom";
import { useLang } from "@/context/LangContext.jsx";
import { translated } from "@/i18n/ui.js";
import { useDetail } from "@/hook/queries.js";
import Seo from "@components/ui/Seo.jsx";
import Frame from "@components/ui/Frame.jsx";
import DetailHero from "@components/ui/DetailHero.jsx";
import StatsPanel from "@components/ui/StatsPanel.jsx";
import LanguagesBox from "@components/ui/LanguagesBox.jsx";
import LinkedCard from "@components/ui/LinkedCard.jsx";
import { WeaponTypeIcon } from "@components/ui/icons.jsx";
import { ErrorState, Loading } from "@components/ui/StateView.jsx";
import { mediaUrl, placeholders } from "@components/ui/media.js";

function Effects({ item, t }) {
  const effects = [item.effect_1, item.effect_2, item.effect_3].filter(Boolean);
  if (!effects.length) return null;
  return (
    <div className="panel">
      <h2 className="panel__heading">&lt;{t("detail.effects")}&gt;</h2>
      <div className="effects">
        {effects.map((text, index) => (
          <div key={index} className="effectItem">
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Weapon() {
  const { slug } = useParams();
  const { t, lang } = useLang();
  const { data, isLoading, isError, error } = useDetail("weapon", slug);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorState error={error} backTo="/weapons" />;
  if (!data) return <ErrorState error={{ response: { status: 404 } }} backTo="/weapons" />;

  const linked = data.characters_id;
  const linkedName = linked ? translated(linked.name, lang) || linked.name : null;
  const linkedSlug = linked?.slug;

  return (
    <>
      <Seo title={data.name} />
      <Frame label="UNIT TYPE: WEAPON">
        <DetailHero
          name={data.name}
          image={data.image || data.image2}
          secondImage={data.image2 && data.image ? data.image2 : null}
          fallback={placeholders.weapon}
          badge={<WeaponTypeIcon type={data.type} element={data.element_weapons} />}
          rarity={data.start}
        >
          {linked && (
            <LinkedCard
              to={linkedSlug ? `/characters/${linkedSlug}` : undefined}
              image={mediaUrl(linked.image) || placeholders.character}
              fallback={placeholders.character}
              title={linkedName || `#${linked.id}`}
            />
          )}
        </DetailHero>

        <div className="detailGrid">
          <Effects item={data} t={t} />
          <StatsPanel item={data} />
        </div>

        <div style={{ marginTop: 18 }}>
          <LanguagesBox item={data} />
        </div>

        <div style={{ marginTop: 18 }}>
          <Link className="btnTag" to="/weapons">
            {t("state.back")}
          </Link>
        </div>
      </Frame>
    </>
  );
}
