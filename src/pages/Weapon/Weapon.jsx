import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLang } from "@/context/LangContext.jsx";
import { useDetail } from "@/hook/queries.js";
import Seo from "@components/ui/Seo.jsx";
import Frame from "@components/ui/Frame.jsx";
import SafeImage from "@components/ui/SafeImage.jsx";
import { ElementIcon, StarsIcon, WeaponTypeIcon } from "@components/ui/icons.jsx";
import { ErrorState, Loading } from "@components/ui/StateView.jsx";
import { placeholders } from "@components/ui/media.js";
import "./weapon.css";

const STATS = [
  { key: "hp", label: "HP", rgb: [55, 250, 55, 0, 40, 0] },
  { key: "mp", label: "MP", rgb: [35, 250, 235, 0, 40, 0] },
  { key: "atk", label: "ATK", rgb: [235, 70, 35, 40, 10, 0] },
  { key: "matk", label: "MATK", rgb: [240, 200, 25, 30, 15, 0] },
  { key: "def", label: "DEF", rgb: [180, 10, 240, 20, 0, 40] },
  { key: "mdef", label: "MDEF", rgb: [200, 10, 145, 20, 0, 40] },
  { key: "crit", label: "CRIT", rgb: [235, 150, 15, 40, 30, 0] },
  { key: "spd", label: "SPD", rgb: [240, 200, 25, 30, 15, 0] },
];

const LB_FILL = [23, 48, 73, 95, 100];

const TYPE_FRAME = {
  sword: ["ÉPÉE", "SWORD"],
  rapier: ["RAPIÈRE", "RAPIER"],
  "dual swords": ["DOUBLE LAMES", "DUAL BLADES"],
  dagger: ["DAGUE", "DAGGER"],
  mace: ["MASSE", "MACE"],
  bow: ["ARC", "BOW"],
  rifle: ["FUSIL", "GUN"],
  gauntlet: ["POING", "FIST"],
};

const LANG_ROWS = [
  ["en", "English"],
  ["fr", "French"],
  ["zh", "Chinese"],
  ["ko", "Korean"],
  ["ja", "Japanese"],
  ["de", "German"],
  ["es", "Spanish"],
];

function unitLabel(type, lang) {
  const pair = TYPE_FRAME[type] || [String(type || "").toUpperCase(), String(type || "").toUpperCase()];
  const word = lang === "fr" ? pair[0] : pair[1];
  const kind = lang === "fr" ? "ARME" : "WEAPON";
  return `UNIT TYPE: ${kind}/${word}`;
}

function clamp(value) {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function statBackground(stat, stages) {
  return stages
    .map((stage, index) => {
      const lb = Math.min(index, 4);
      const empty = STATS.every((item) => !Number(stage[item.key]));
      if (lb >= 4) {
        return empty
          ? "linear-gradient(90deg, rgb(89, 62, 133) 98%, #fff 100%)"
          : "linear-gradient(90deg, rgb(233, 72, 247) 98%, #fff 100%)";
      }
      const fill = LB_FILL[lb];
      if (empty) return `linear-gradient(90deg, rgb(190, 190, 190) ${fill}%, transparent ${fill}%)`;
      const [r, g, b, dr, dg, db] = stat.rgb;
      const color = `rgb(${clamp(r - dr * lb)}, ${clamp(g - dg * lb)}, ${clamp(b - db * lb)})`;
      return `linear-gradient(90deg, ${color} ${fill}%, transparent ${fill}%)`;
    })
    .join(", ");
}

function artwork(data) {
  if (data.image || data.image2) return data.image || data.image2;
  if (data.fanadata_id) return `https://saoub.fanadata.com/assets/weapons/stuff_${data.fanadata_id}.jpg`;
  return null;
}

export default function Weapon() {
  const { slug } = useParams();
  const { lang, setLang } = useLang();
  const { data, isLoading, isError, error } = useDetail("weapon", slug);
  const [lb, setLb] = useState(0);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorState error={error} backTo="/weapons" />;
  if (!data) return <ErrorState error={{ response: { status: 404 } }} backTo="/weapons" />;

  const stages = [...(data.stats || [])].sort((a, b) => a.stage - b.stage);
  const active = stages[lb] || stages[0] || data;
  const skills = data.skills || [];
  const locales = data.locales || {};
  const character = data.characters_id;
  const languagesLabel = lang === "fr" ? "<AUTRES LANGUAGES>" : "<OTHER LANGUAGES>";

  return (
    <>
      <Seo title={data.name} />
      <Frame label={unitLabel(data.type, lang)}>
        <section className="wStage">
          <div className="wStage__name">{data.name}</div>
          <div className="wStage__art">
            <SafeImage src={artwork(data)} fallback={placeholders.weapon} alt={data.name} />
          </div>
          <span className="wStage__badge">
            <WeaponTypeIcon type={data.type} element={data.element_weapons} />
          </span>
          <div className="wStage__marks">
            <WeaponTypeIcon type={data.type} element={data.element_weapons} />
            <StarsIcon rarity={data.start} />
          </div>
          {character?.slug && (
            <Link className="wWho" to={`/characters/${character.slug}`}>
              <SafeImage src={character.image || character.image2} fallback={placeholders.character} alt="" />
              <span className="wWho__body">
                <span className="wWho__title">{character.description || character.name}</span>
                <span className="wWho__icons">
                  <ElementIcon element={character.element} size={22} />
                  <WeaponTypeIcon type={character.weapon_type} element={character.element} />
                </span>
              </span>
            </Link>
          )}
        </section>

        <section className="wCombat">
          <div className="wStatsWrap">
            <div className="wStats">
              {STATS.map((stat) => (
                <div key={stat.key} className="wStat">
                  <div className="wStat__row">
                    <span>{stat.label}</span>
                    <strong>{active[stat.key] ?? 0}</strong>
                  </div>
                  <div className="wStat__bar" style={{ backgroundImage: statBackground(stat, stages.length ? stages : [active]) }} />
                </div>
              ))}
            </div>
            {stages.length > 1 && (
              <div className="wGems" role="group" aria-label="Limit break">
                {stages.map((stage, index) => (
                  <button
                    key={stage.stage}
                    type="button"
                    className={index === lb ? "is-on" : ""}
                    aria-label={String(index)}
                    aria-pressed={index === lb}
                    onClick={() => setLb(index)}
                  >
                    <img src={`/ui/icons/limit_break_${Math.min(index, 4)}.png`} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {skills.length > 0 && (
            <div className="wPassives">
              {skills.map((skill) => (
                <article key={skill.slot} className="wPassive">
                  <div className="wPassive__mark">
                    <img src="/ui/icons/icon_passiv.png" alt="BS" />
                  </div>
                  <div className="wPassive__body">
                    {skill.name && (
                      <div className="wPassive__title">
                        <span>{skill.name}</span>
                      </div>
                    )}
                    {skill.lines.map((line) => (
                      <div key={`${skill.slot}-${line.lb}`} className="wPassive__line">
                        <img src={`/ui/icons/limit_break_${Math.min(line.lb, 4)}.png`} alt="" />
                        <span>{line.text}</span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {Object.keys(locales).length > 0 && (
          <section className="wLangs">
            <h2>{languagesLabel}</h2>
            {LANG_ROWS.filter(([code]) => locales[code]?.name).map(([code, label]) => (
              <button
                key={code}
                type="button"
                className={`wLang ${code === lang ? "is-on" : ""}`}
                onClick={() => setLang(code)}
              >
                <span>{label}</span>
                <strong>{locales[code].name}</strong>
              </button>
            ))}
          </section>
        )}
      </Frame>
    </>
  );
}
