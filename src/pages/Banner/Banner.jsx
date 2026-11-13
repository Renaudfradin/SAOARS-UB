import React from "react";
import { Link, useParams } from "react-router-dom";
import { useLang } from "@/context/LangContext.jsx";
import { translated } from "@/i18n/ui.js";
import { useDetail } from "@/hook/queries.js";
import Seo from "@components/ui/Seo.jsx";
import Frame from "@components/ui/Frame.jsx";
import SafeImage from "@components/ui/SafeImage.jsx";
import { ErrorState, Loading } from "@components/ui/StateView.jsx";
import { placeholders } from "@components/ui/media.js";
import "./Banner.css";

const DATE_LOCALE = { fr: "fr", en: "en", zh: "zh-CN", ko: "ko", ja: "ja", de: "de", es: "es" };

function splitDate(value, lang) {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  const month = date.toLocaleDateString(DATE_LOCALE[lang] || lang, { month: "long" });
  return {
    day: date.getDate(),
    month: month.charAt(0).toUpperCase() + month.slice(1),
    year: date.getFullYear(),
  };
}

function characterName(character, lang) {
  if (!character) return "";
  if (typeof character.name === "string") return character.name;
  return translated(character.name, lang) || "";
}

function Folder({ title, children }) {
  return (
    <section className="folder">
      <div className="folder__top" aria-hidden="true">
        <div className="folder__tl" />
        <div className="folder__tm" />
        <div className="folder__tr" />
      </div>
      <div className="folder__body">
        <h2>{title}</h2>
        {children}
      </div>
      <div className="folder__bot" aria-hidden="true">
        <div className="folder__bl" />
        <div className="folder__bm" />
        <div className="folder__br" />
      </div>
    </section>
  );
}

function PeriodRow({ label, date }) {
  if (!date) return null;
  return (
    <div className="period">
      <div className="period__label">{label}</div>
      <div className="period__value">
        <span className="period__day">{date.day}</span>
        <span>
          <strong>{date.month}</strong> {date.year}
        </span>
      </div>
    </div>
  );
}

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
      <Frame label="SCOUT TYPE: CHARACTER">
        <div className="scout">
          <div className="scout__name">{data.name}</div>
          <div className="scout__line" aria-hidden="true" />
          <div className="scout__art">
            <SafeImage src={data.image} fallback={placeholders.character} alt={data.name} />
          </div>

          <div className="scout__cols">
            <Folder title="&lt;PERIOD&gt;">
              <PeriodRow label={t("detail.from")} date={splitDate(data.from, lang)} />
              <PeriodRow label={t("detail.to")} date={splitDate(data.to, lang)} />
            </Folder>
            <Folder title="&lt;CHARACTER&gt;">
              <div className="scout__faces">
                {characters.map((character) => {
                  const name = characterName(character, lang);
                  const face = (
                    <SafeImage src={character.image} fallback={placeholders.character} alt={name} />
                  );
                  return character.slug ? (
                    <Link key={character.id} to={`/characters/${character.slug}`} title={name}>
                      {face}
                    </Link>
                  ) : (
                    <span key={character.id} title={name}>
                      {face}
                    </span>
                  );
                })}
              </div>
            </Folder>
          </div>
        </div>
      </Frame>
    </>
  );
}
