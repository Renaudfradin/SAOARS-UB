import React from "react";
import { Link, useParams } from "react-router-dom";
import { useLang } from "@/context/LangContext.jsx";
import { useDetail } from "@/hook/queries.js";
import Seo from "@components/ui/Seo.jsx";
import Frame from "@components/ui/Frame.jsx";
import DetailHero from "@components/ui/DetailHero.jsx";
import StatsPanel from "@components/ui/StatsPanel.jsx";
import LanguagesBox from "@components/ui/LanguagesBox.jsx";
import { ElementIcon } from "@components/ui/icons.jsx";
import { ErrorState, Loading } from "@components/ui/StateView.jsx";
import { placeholders } from "@components/ui/media.js";

export default function Equipment() {
  const { slug } = useParams();
  const { t } = useLang();
  const { data, isLoading, isError, error } = useDetail("equipment", slug);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorState error={error} backTo="/equipments" />;
  if (!data) return <ErrorState error={{ response: { status: 404 } }} backTo="/equipments" />;

  const effects = [data.effect_1, data.effect_2].filter(Boolean);

  return (
    <>
      <Seo title={data.name} />
      <Frame label="UNIT TYPE: EQUIPMENT">
        <DetailHero
          name={data.name}
          image={data.image || data.image2}
          fallback={placeholders.equipment}
          badge={<ElementIcon element={data.type_equipment} size={30} />}
          rarity={data.start}
        />

        <div className="detailGrid">
          <div className="panel">
            <h2 className="panel__heading">&lt;{t("detail.type")}&gt;</h2>
            <p>{t(`equipment.${data.type}`) || data.type}</p>
            {effects.length > 0 && (
              <>
                <h2 className="panel__heading">&lt;{t("detail.effects")}&gt;</h2>
                <div className="effects">
                  {effects.map((text, index) => (
                    <div key={index} className="effectItem">
                      {text}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <StatsPanel item={data} />
        </div>

        <div style={{ marginTop: 18 }}>
          <LanguagesBox item={data} />
        </div>

        <div style={{ marginTop: 18 }}>
          <Link className="btnTag" to="/equipments">
            {t("state.back")}
          </Link>
        </div>
      </Frame>
    </>
  );
}
