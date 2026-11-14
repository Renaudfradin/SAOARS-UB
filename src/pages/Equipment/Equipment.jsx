import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLang } from "@/context/LangContext.jsx";
import { useDetail } from "@/hook/queries.js";
import Seo from "@components/ui/Seo.jsx";
import Frame from "@components/ui/Frame.jsx";
import SafeImage from "@components/ui/SafeImage.jsx";
import { StarsIcon } from "@components/ui/icons.jsx";
import { ErrorState, Loading } from "@components/ui/StateView.jsx";
import { placeholders } from "@components/ui/media.js";
import passivIcon from "@assets/img/icon_passiv.svg";
import breakIcon from "@assets/img/limit_break_0.svg";
import "./equipment.css";

const ELEMENTS = {
  neutral: "/ui/diamonds/void.png",
  fire: "/ui/diamonds/fire.png",
  water: "/ui/diamonds/water.png",
  wind: "/ui/diamonds/wind.png",
  earth: "/ui/diamonds/earth.png",
  light: "/ui/diamonds/holy.png",
  darkness: "/ui/diamonds/dark.png",
};

const LANG_TAGS = {
  fr: "French",
  en: "English",
  zh: "Chinese",
  ko: "Korean",
  ja: "Japanese",
  de: "German",
  es: "Spanish",
};

const STATS = [
  { key: "hp", label: "HP" },
  { key: "mp", label: "MP" },
  { key: "atk", label: "ATK" },
  { key: "matk", label: "MATK" },
  { key: "def", label: "DEF" },
  { key: "mdef", label: "MDEF" },
  { key: "crit", label: "CRIT" },
  { key: "spd", label: "SPD" },
];

function unitLabel(type, lang) {
  const armour = lang === "fr" ? "ARMURE" : "ARMOR";
  const accessory = lang === "fr" ? "ACCESSOIRE" : "ACCESSORY";
  const kind = type === "accessory" ? accessory : armour;
  return lang === "fr" ? `UNIT TYPE: EQUIPEMENT/${kind}` : `UNIT TYPE: EQUIPMENT/${kind}`;
}

function EffectCard({ text }) {
  if (!text) return null;
  const parts = text.split("\n").map((line) => line.trim()).filter(Boolean);
  const distinct = parts.length > 1 && parts[0] !== parts.slice(1).join(" ");
  const label = distinct ? parts[0] : "";
  const line = distinct ? parts.slice(1).join("\n") : parts.join(" ");

  return (
    <article className="bsCard">
      <div className="bsCard__mark">
        <img src={passivIcon} alt="" />
      </div>
      <div className="bsCard__body">
        {label && <span className="bsCard__title">{label}</span>}
        <p>
          <img src={breakIcon} alt="" />
          <span>{line}</span>
        </p>
      </div>
    </article>
  );
}

export default function Equipment() {
  const { slug } = useParams();
  const { lang, setLang } = useLang();
  const { data, isLoading, isError, error } = useDetail("equipment", slug);
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => setStageIndex(0), [slug]);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorState error={error} backTo="/equipments" />;
  if (!data) return <ErrorState error={{ response: { status: 404 } }} backTo="/equipments" />;

  const stages = [...(data.stats || [])].sort((a, b) => a.stage - b.stage);
  const current = stages[stageIndex] || stages[0] || data;
  const locales = data.locales || {};
  const localeCodes = Object.keys(locales);
  const elementIcon = ELEMENTS[data.type_equipment];
  const effects = [data.effect_1, data.effect_2].filter(Boolean);

  return (
    <>
      <Seo title={data.name} />
      <Frame className="eqDetail" label={unitLabel(data.type, lang)}>
        <article className="eqUnit">
          <div className="eqUnit__thumb">
            <SafeImage src={data.image2 || data.image} fallback={placeholders.equipment} alt="" />
          </div>

          <div className="eqUnit__stage">
            <div className="eqUnit__ring" aria-hidden="true" />
            <div className="eqUnit__name">
              <span>{data.name}</span>
              <i className="eqUnit__elbow" />
            </div>
            <div className="eqUnit__portrait">
              <SafeImage className="eqUnit__img" src={data.image || data.image2} fallback={placeholders.equipment} alt={data.name} />
            </div>
            <div className="eqUnit__marks">
              {elementIcon && <img src={elementIcon} alt="" />}
              <StarsIcon rarity={data.start} />
            </div>
          </div>

          <div className="eqSplit">
            <div className="eqStats">
              <div className="eqStats__rows">
                {STATS.map(({ key, label }) => (
                  <div key={key} className={`eqStat eqStat--${key}`}>
                    <span className="eqStat__label">{label}</span>
                    <span className="eqStat__value">{Number(current[key] ?? 0)}</span>
                    <i className="eqStat__bar" />
                  </div>
                ))}
              </div>
              {stages.length > 1 && (
                <div className="eqStats__lbs">
                  {stages.map((stage, index) => (
                    <button
                      key={stage.stage}
                      type="button"
                      className={`eqLb ${index === stageIndex ? "is-on" : ""}`}
                      aria-label={`LB ${stage.stage - 1}`}
                      onClick={() => setStageIndex(index)}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="eqEffects">
              {effects.map((text) => (
                <EffectCard key={text} text={text} />
              ))}
            </div>
          </div>

          {localeCodes.length > 0 && (
            <section className="eqLangs">
              <h2>{lang === "fr" ? "<AUTRES LANGUAGES>" : "<OTHER LANGUAGES>"}</h2>
              <div className="eqLangs__list">
                {localeCodes.map((code) => (
                  <button
                    key={code}
                    type="button"
                    className={`eqLang ${code === lang ? "is-on" : ""}`}
                    onClick={() => setLang(code)}
                  >
                    <span>{LANG_TAGS[code] || code}</span>
                    <strong>{locales[code]?.name}</strong>
                  </button>
                ))}
              </div>
            </section>
          )}
        </article>
      </Frame>
    </>
  );
}
