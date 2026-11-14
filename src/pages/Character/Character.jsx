import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLang } from "@/context/LangContext.jsx";
import { LANG_LABELS } from "@/i18n/ui.js";
import { useDetail } from "@/hook/queries.js";
import Seo from "@components/ui/Seo.jsx";
import Frame from "@components/ui/Frame.jsx";
import SafeImage from "@components/ui/SafeImage.jsx";
import { AttackTypeIcon, ElementIcon, StarsIcon, WeaponTypeIcon } from "@components/ui/icons.jsx";
import { ErrorState, Loading } from "@components/ui/StateView.jsx";
import { placeholders } from "@components/ui/media.js";
import "./character.css";

const STATS = [
  { key: "hp", label: "HP", max: 10000 },
  { key: "mp", label: "MP", max: 400 },
  { key: "atk", label: "ATK", max: 3500 },
  { key: "matk", label: "MATK", max: 3500 },
  { key: "def", label: "DEF", max: 2500 },
  { key: "mdef", label: "MDEF", max: 2500 },
  { key: "crit", label: "CRIT", max: 1200 },
  { key: "spd", label: "SPD", max: 600 },
];

function SkillRow({ attack, type, title, description }) {
  const name = attack?.name || title;
  const text = attack?.description || description;
  const atkType = attack?.type_atk || type;
  const cost = attack?.mp_cost;
  if (!name && !text) return null;

  return (
    <article className="skillRow">
      <div className="skillRow__mark">
        <AttackTypeIcon type={atkType} />
      </div>
      <div>
        <div className="skillRow__name">
          {attack?.slug ? <Link to={`/attacks/${attack.slug}`}>{name}</Link> : name}
        </div>
        {text && text !== name && <p className="skillRow__text">{text}</p>}
        <div className="mpBar">{cost != null && cost !== "" ? `${cost} MP` : "? MP"}</div>
      </div>
    </article>
  );
}

export default function Character() {
  const { slug } = useParams();
  const { t, lang, setLang } = useLang();
  const { data, isLoading, isError, error } = useDetail("character", slug);
  const [enhance, setEnhance] = useState(false);
  const [lb, setLb] = useState(null);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorState error={error} backTo="/characters" />;
  if (!data) return <ErrorState error={{ response: { status: 404 } }} backTo="/characters" />;

  const stages = [...(data.stats || [])].sort((a, b) => a.stage - b.stage);
  const activeStage = lb ?? stages.at(-1)?.stage ?? null;
  const current = stages.find((stage) => stage.stage === activeStage) || data;
  const heading = [data.name, data.description].filter(Boolean).join(" ");
  const weapon = data.weapon;
  const banner = data.banner;
  const partner = data.special_partner;
  const locales = data.locales || {};
  const localeCodes = Object.keys(locales);
  const firstSkills = enhance ? [data.enhance_atk, data.enhance_atk2] : [data.atk1, data.atk2, data.atk3];

  return (
    <>
      <Seo title={heading} description={data.profile} />
      <Frame label="UNIT TYPE: CHARACTER">
        <section className="unit">
          <div className="unit__name">{heading}</div>
          <div className="unit__stage">
            <SafeImage className="unit__img" src={data.image} fallback={placeholders.character} alt={heading} />
            {data.image2 && <SafeImage className="unit__img2" src={data.image2} alt="" />}
          </div>
          <div className="unit__marks">
            {data.weapon_type ? (
              <WeaponTypeIcon type={data.weapon_type} element={data.element} />
            ) : (
              <ElementIcon element={data.element} size={48} />
            )}
            <StarsIcon rarity={data.start} />
          </div>
        </section>

        <section className={`combat ${enhance ? "combat--enhance" : ""}`}>
          <div className="combat__stats">
            <div className="lbHead">
              <strong>{stages.length ? `LB ${activeStage}/${stages.length}` : "LB"}</strong>
              {stages.length > 0 && (
                <div className="lbPicks">
                  {stages.map((stage) => (
                    <button
                      key={stage.stage}
                      type="button"
                      className={stage.stage === activeStage ? "is-on" : ""}
                      onClick={() => setLb(stage.stage)}
                    >
                      {stage.stage}
                    </button>
                  ))}
                </div>
              )}
              <button
                type="button"
                className={`lbLabel ${enhance ? "" : "is-on"}`}
                onClick={() => {
                  if (!stages.length) return;
                  const index = stages.findIndex((stage) => stage.stage === activeStage);
                  const next = stages[(index + 1) % stages.length];
                  setLb(next.stage);
                }}
              >
                Limit Break
              </button>
            </div>
            {STATS.map(({ key, label, max }) => {
              const value = Number(current[key] ?? 0);
              return (
                <div key={key} className={`statRow statRow--${key}`}>
                  <span className="statRow__track">
                    <span style={{ width: `${Math.min(100, (value / max) * 100)}%` }} />
                  </span>
                  <span className="statRow__label">{label}</span>
                  <span className="statRow__value">{value}</span>
                </div>
              );
            })}
          </div>

          {weapon ? (
            <Link className="gear" to={`/weapons/${weapon.slug}`}>
              <SafeImage className="gear__img" src={weapon.image} fallback={placeholders.weapon} alt="" />
              <div className="gear__body">
                <div className="gear__name">{weapon.name}</div>
                <div className="gear__icons">
                  <ElementIcon element={weapon.element} size={22} />
                  <WeaponTypeIcon type={weapon.type} element={weapon.element} />
                </div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          <button
            type="button"
            className={`enhanceBtn ${enhance ? "is-on" : ""}`}
            onClick={() => setEnhance((value) => !value)}
          >
            ENHANCE MODE
          </button>

          <div className="combat__skills">
            {firstSkills.map((attack, index) => (
              <SkillRow key={attack?.id || `skill-${index}`} attack={attack} />
            ))}
            <SkillRow
              type={enhance ? "EM" : "U"}
              title={enhance ? "Enhance Mode" : data.ultime}
              description={enhance ? data.enhance : data.ultime_description}
            />
          </div>
        </section>

        {partner && (partner.name || partner.slug) && (
          <div className="sheet">
            <Link className="langRow" to={partner.slug ? `/characters/${partner.slug}` : "/characters"}>
              <span className="langTag">Partner</span>
              <span className="langText">{partner.name}</span>
            </Link>
          </div>
        )}

        {(localeCodes.length > 0 || data.profile) && (
          <section className="sheet">
            <div className="langList">
              {localeCodes.map((code) => {
                const line = locales[code];
                const text = [line.name, line.description].filter(Boolean).join(" ");
                return (
                  <button
                    key={code}
                    type="button"
                    className={`langRow ${code === lang ? "is-on" : ""}`}
                    onClick={() => setLang(code)}
                  >
                    <span className="langTag">{LANG_LABELS[code] || code}</span>
                    <span className="langText">{text}</span>
                  </button>
                );
              })}
            </div>
            {data.profile && (
              <div className="profileBox">
                <h3>&lt;{t("detail.description")}&gt;</h3>
                <p>{data.profile}</p>
              </div>
            )}
          </section>
        )}

        {banner?.image && (
          <Link className="origin" to={banner.slug ? `/banners/${banner.slug}` : "/banners"}>
            <SafeImage src={banner.image} alt={banner.name || ""} />
            {banner.name && <span>{banner.name}</span>}
          </Link>
        )}
      </Frame>
    </>
  );
}
