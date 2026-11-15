"use client";

import React, { useState } from "react";
import { useLang } from "@/context/LangContext.jsx";
import { assetSrc } from "@/lib/assetSrc.js";
import Frame from "@components/ui/Frame.jsx";
import SafeImage from "@components/ui/SafeImage.jsx";
import { StarsIcon } from "@components/ui/icons.jsx";
import { placeholders } from "@components/ui/media.js";
import passivIcon from "@assets/img/icon_passiv.svg";
import breakIcon from "@assets/img/limit_break_0.svg";

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
        <img src={assetSrc(passivIcon)} alt="" />
      </div>
      <div className="bsCard__body">
        {label && <span className="bsCard__title">{label}</span>}
        <p>
          <img src={assetSrc(breakIcon)} alt="" />
          <span>{line}</span>
        </p>
      </div>
    </article>
  );
}

export default function Equipment({ data }) {
  const { lang, setLang } = useLang();
  const [stage, setStage] = useState({ slug: data.slug, index: 0 });
  if (stage.slug !== data.slug) {
    setStage({ slug: data.slug, index: 0 });
  }
  const stageIndex = stage.slug === data.slug ? stage.index : 0;

  const stages = [...(data.stats || [])].sort((a, b) => a.stage - b.stage);
  const current = stages[stageIndex] || stages[0] || data;
  const locales = data.locales || {};
  const localeCodes = Object.keys(locales);
  const elementIcon = ELEMENTS[data.type_equipment];
  const effects = [data.effect_1, data.effect_2].filter(Boolean);

  return (
    <>
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
                      onClick={() => setStage({ slug: data.slug, index })}
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
