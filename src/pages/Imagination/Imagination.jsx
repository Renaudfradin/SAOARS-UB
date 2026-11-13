import React from "react";
import { Link, useParams } from "react-router-dom";
import { useLang } from "@/context/LangContext.jsx";
import { useDetail } from "@/hook/queries.js";
import Seo from "@components/ui/Seo.jsx";
import Frame from "@components/ui/Frame.jsx";
import DetailHero from "@components/ui/DetailHero.jsx";
import LanguagesBox from "@components/ui/LanguagesBox.jsx";
import { ElementIcon } from "@components/ui/icons.jsx";
import { ErrorState, Loading } from "@components/ui/StateView.jsx";
import { placeholders } from "@components/ui/media.js";

export default function Imagination() {
  const { slug } = useParams();
  const { t } = useLang();
  const { data, isLoading, isError, error } = useDetail("imagination", slug);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorState error={error} backTo="/imaginations" />;
  if (!data) return <ErrorState error={{ response: { status: 404 } }} backTo="/imaginations" />;

  return (
    <>
      <Seo title={data.name} description={data.description} />
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
          <Link className="btnTag" to="/imaginations">
            {t("state.back")}
          </Link>
        </div>
      </Frame>
    </>
  );
}
