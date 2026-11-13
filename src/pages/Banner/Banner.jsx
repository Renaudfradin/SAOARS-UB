import React from "react";
import { Link, useParams } from "react-router-dom";
import { useLang } from "@/context/LangContext.jsx";
import { translated } from "@/i18n/ui.js";
import { useDetail } from "@/hook/queries.js";
import Seo from "@components/ui/Seo.jsx";
import Frame from "@components/ui/Frame.jsx";
import DetailHero from "@components/ui/DetailHero.jsx";
import LanguagesBox from "@components/ui/LanguagesBox.jsx";
import SafeImage from "@components/ui/SafeImage.jsx";
import { ErrorState, Loading } from "@components/ui/StateView.jsx";
import { mediaUrl, placeholders } from "@components/ui/media.js";

export default function Banner() {
  const { slug } = useParams();
  const { t, lang } = useLang();
  const { data, isLoading, isError, error } = useDetail("banner", slug);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorState error={error} backTo="/banners" />;
  if (!data) return <ErrorState error={{ response: { status: 404 } }} backTo="/banners" />;

  const characters = Array.isArray(data.characters) ? data.characters : [];

  return (
    <>
      <Seo title={data.name} />
      <Frame label="SCOUT TYPE: BANNER">
        <DetailHero name={data.name} image={data.image} fallback={placeholders.character} />

        <div className="panel">
          <h2 className="panel__heading">&lt;{t("detail.period")}&gt;</h2>
          <p>
            {t("detail.from")} {data.from || "—"} — {t("detail.to")} {data.to || "—"}
          </p>
        </div>

        {characters.length > 0 && (
          <div className="panel" style={{ marginTop: 18 }}>
            <h2 className="panel__heading">&lt;{t("detail.characters")}&gt;</h2>
            <div className="avatars">
              {characters.map((character) => {
                const name = translated(character.name, lang) || character.name || `#${character.id}`;
                const to = character.slug ? `/characters/${character.slug}` : null;
                const body = (
                  <>
                    <SafeImage
                      src={mediaUrl(character.image)}
                      fallback={placeholders.character}
                      alt={name}
                    />
                    <span>{name}</span>
                  </>
                );
                return to ? (
                  <Link key={character.id} className="avatar" to={to}>
                    {body}
                  </Link>
                ) : (
                  <div key={character.id} className="avatar">
                    {body}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div style={{ marginTop: 18 }}>
          <LanguagesBox item={data} />
        </div>

        <div style={{ marginTop: 18 }}>
          <Link className="btnTag" to="/banners">
            {t("state.back")}
          </Link>
        </div>
      </Frame>
    </>
  );
}
