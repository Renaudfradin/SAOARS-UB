import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "@/context/LangContext.jsx";
import { useAllItems, usePagedList } from "@/hook/queries.js";
import Frame from "@components/ui/Frame.jsx";
import Seo from "@components/ui/Seo.jsx";
import SafeImage from "@components/ui/SafeImage.jsx";
import { AttackTypeIcon, RarityIcon, WeaponTypeIcon } from "@components/ui/icons.jsx";
import { Empty, ErrorState, Loading } from "@components/ui/StateView.jsx";
import { placeholders } from "@components/ui/media.js";
import "./characters.css";

const PAGE_SIZE = 21;

const ELEMENTS = [
  { id: "neutral", icon: "/ui/diamonds/void.png", label: "Void" },
  { id: "fire", icon: "/ui/diamonds/fire.png", label: "Fire" },
  { id: "water", icon: "/ui/diamonds/water.png", label: "Water" },
  { id: "wind", icon: "/ui/diamonds/wind.png", label: "Wind" },
  { id: "earth", icon: "/ui/diamonds/earth.png", label: "Earth" },
  { id: "light", icon: "/ui/diamonds/holy.png", label: "Holy" },
  { id: "darkness", icon: "/ui/diamonds/dark.png", label: "Dark" },
];

const WEAPONS = [
  { id: "sword", icon: "/ui/diamonds/sword.png", label: "Sword" },
  { id: "rapier", icon: "/ui/diamonds/rapier.png", label: "Rapier" },
  { id: "dual swords", icon: "/ui/diamonds/dual.png", label: "Dual blades" },
  { id: "dagger", icon: "/ui/diamonds/dagger.png", label: "Dagger" },
  { id: "mace", icon: "/ui/diamonds/mace.png", label: "Mace" },
  { id: "bow", icon: "/ui/diamonds/bow.png", label: "Bow" },
  { id: "rifle", icon: "/ui/diamonds/gun.png", label: "Gun" },
  { id: "gauntlet", icon: "/ui/diamonds/fist.png", label: "Fist" },
];

function toggle(list, value) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function pageWindow(page, pages) {
  if (pages <= 7) return Array.from({ length: pages }, (_, index) => index + 1);
  if (page <= 4) return [1, 2, 3, 4, 5, "…", pages];
  if (page >= pages - 3) return [1, "…", pages - 4, pages - 3, pages - 2, pages - 1, pages];
  return [1, "…", page - 1, page, page + 1, "…", pages];
}

function CharacterTile({ item }) {
  const attacks = [item.atk1, item.atk2, item.atk3].filter((type) => type && type !== "0");
  const element = ELEMENTS.find((entry) => entry.id === item.element);

  return (
    <Link className="charCard" to={`/characters/${item.slug}`}>
      <div className="charCard__plate">
        <SafeImage
          className="charCard__img"
          src={item.image || item.image2}
          fallback={placeholders.character}
          alt={item.name}
        />
        <RarityIcon rarity={item.start} className="charCard__rarity" />
        {item.weapon_type ? (
          <WeaponTypeIcon
            className="charCard__weapon"
            type={item.weapon_type}
            element={item.element}
          />
        ) : (
          element && <img className="charCard__weapon" src={element.icon} alt="" />
        )}
        {attacks.length > 0 && (
          <div className="charCard__attacks">
            {attacks.map((type, index) => (
              <AttackTypeIcon key={`${type}-${index}`} type={type} />
            ))}
          </div>
        )}
      </div>
      <h3 className="charCard__name">{item.name}</h3>
      {item.description && <span className="charCard__title">{item.description}</span>}
    </Link>
  );
}

export default function Characters() {
  const { t } = useLang();
  const [page, setPage] = useState(1);
  const [advanced, setAdvanced] = useState(false);
  const [tab, setTab] = useState("rarity");
  const [elements, setElements] = useState([]);
  const [rarities, setRarities] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [names, setNames] = useState([]);

  const filtering = elements.length + rarities.length + weapons.length + names.length > 0;
  const needsAll = filtering || (advanced && tab === "name");
  const paged = usePagedList("characters", page);
  const all = useAllItems("characters", needsAll);
  const source = filtering ? all : paged;

  const people = useMemo(() => {
    const seen = new Map();
    (all.data || []).forEach((item) => {
      if (item.name && !seen.has(item.name)) seen.set(item.name, item);
    });
    return [...seen.values()].sort((a, b) => a.name.localeCompare(b.name));
  }, [all.data]);

  const filtered = useMemo(() => {
    const raw = filtering ? all.data || [] : paged.data?.data || [];
    return raw.filter((item) => {
      if (elements.length && !elements.includes(item.element)) return false;
      if (rarities.length && !rarities.includes(Number(item.start))) return false;
      if (weapons.length && !weapons.includes(item.weapon_type)) return false;
      if (names.length && !names.includes(item.name)) return false;
      return true;
    });
  }, [filtering, all.data, paged.data, elements, rarities, weapons, names]);

  const total = filtering ? filtered.length : paged.data?.meta?.total || 0;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const pageItems = filtering ? filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE) : filtered;

  const pick = (setter, value) => {
    setter((current) => toggle(current, value));
    setPage(1);
  };

  return (
    <>
      <Seo title={t("nav.characters")} />
      <Frame label="PAGE: LIST/CHARACTER">
        <div className="charList">
          <div className="elemBar" role="group" aria-label="Element">
            {ELEMENTS.map((element) => {
              const selected = elements.includes(element.id);
              const dimmed = elements.length > 0 && !selected;
              return (
                <button
                  key={element.id}
                  type="button"
                  className={`elemBtn ${selected ? "is-on" : ""} ${dimmed ? "is-off" : ""}`}
                  title={element.label}
                  aria-pressed={selected}
                  onClick={() => pick(setElements, element.id)}
                >
                  <img src={element.icon} alt={element.label} />
                </button>
              );
            })}
          </div>

          <button type="button" className="advToggle" onClick={() => setAdvanced((open) => !open)}>
            Advanced search
          </button>

          {advanced && (
            <div className="adv">
              <div className="adv__side">
                <button
                  type="button"
                  className={`advTab ${tab === "rarity" ? "is-on" : ""}`}
                  onClick={() => setTab("rarity")}
                >
                  <strong>&lt;RARITY&gt;</strong>
                  <RarityIcon rarity={4} className="rarityIcon" />
                </button>
                <button
                  type="button"
                  className={`advTab advTab--weapon ${tab === "weapon" ? "is-on" : ""}`}
                  onClick={() => setTab("weapon")}
                >
                  <strong>&lt;WEAPON&gt;</strong>
                  <img src="/ui/diamonds/sword.png" alt="" />
                </button>
                <button
                  type="button"
                  className={`advTab advTab--name ${tab === "name" ? "is-on" : ""}`}
                  onClick={() => setTab("name")}
                >
                  <strong>&lt;NAME&gt;</strong>
                  <span style={{ fontFamily: "SAOUI, serif", fontSize: 28 }}>T</span>
                </button>
                <button type="button" className="adv__close" aria-label="Close" onClick={() => setAdvanced(false)}>
                  ×
                </button>
              </div>
              <div className="adv__panel">
                {tab === "rarity" && (
                  <div className="adv__choices">
                    {[1, 2, 3, 4].map((rarity) => {
                      const selected = rarities.includes(rarity);
                      const dimmed = rarities.length > 0 && !selected;
                      return (
                        <button
                          key={rarity}
                          type="button"
                          className={`choiceBtn ${selected ? "is-on" : ""} ${dimmed ? "is-off" : ""}`}
                          aria-pressed={selected}
                          onClick={() => pick(setRarities, rarity)}
                        >
                          <RarityIcon rarity={rarity} className="rarityIcon" />
                        </button>
                      );
                    })}
                  </div>
                )}
                {tab === "weapon" && (
                  <div className="adv__choices">
                    {WEAPONS.map((weapon) => {
                      const selected = weapons.includes(weapon.id);
                      const dimmed = weapons.length > 0 && !selected;
                      return (
                        <button
                          key={weapon.id}
                          type="button"
                          className={`choiceBtn ${selected ? "is-on" : ""} ${dimmed ? "is-off" : ""}`}
                          title={weapon.label}
                          aria-pressed={selected}
                          onClick={() => pick(setWeapons, weapon.id)}
                        >
                          <img src={weapon.icon} alt={weapon.label} />
                        </button>
                      );
                    })}
                  </div>
                )}
                {tab === "name" && (
                  <>
                    {all.isLoading && <Loading label={t("list.loadingAll")} />}
                    {all.isError && <ErrorState error={all.error} />}
                    {!all.isLoading && !all.isError && (
                      <div className="personGrid">
                        {people.map((person) => {
                          const selected = names.includes(person.name);
                          return (
                            <button
                              key={person.name}
                              type="button"
                              className={`person ${selected ? "is-on" : ""}`}
                              aria-pressed={selected}
                              onClick={() => pick(setNames, person.name)}
                            >
                              <span className="person__gem">
                                <SafeImage src={person.image || person.image2} fallback={placeholders.character} alt="" />
                              </span>
                              <span className="person__name">{person.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {source.isLoading && <Loading label={filtering ? t("list.loadingAll") : undefined} />}
          {source.isError && <ErrorState error={source.error} />}
          {!source.isLoading && !source.isError && pageItems.length === 0 && <Empty />}
          {!source.isLoading && !source.isError && pageItems.length > 0 && (
            <>
              <div className="charGrid">
                {pageItems.map((item) => (
                  <CharacterTile key={item.id} item={item} />
                ))}
              </div>
              {pages > 1 && (
                <div className="charPager">
                  <button
                    type="button"
                    className="charPager__arrow"
                    disabled={page <= 1}
                    onClick={() => setPage((current) => current - 1)}
                    aria-label="Previous"
                  >
                    ‹
                  </button>
                  <div className="charPager__nums">
                    {pageWindow(page, pages).map((entry, index) =>
                      entry === "…" ? (
                        <span key={`gap-${index}`}>…</span>
                      ) : (
                        <button
                          key={entry}
                          type="button"
                          className={entry === page ? "is-on" : ""}
                          onClick={() => setPage(entry)}
                        >
                          {entry}
                        </button>
                      )
                    )}
                  </div>
                  <button
                    type="button"
                    className="charPager__arrow"
                    disabled={page >= pages}
                    onClick={() => setPage((current) => current + 1)}
                    aria-label="Next"
                  >
                    ›
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </Frame>
    </>
  );
}
