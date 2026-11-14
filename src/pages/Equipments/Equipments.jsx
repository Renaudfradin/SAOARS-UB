import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "@/context/LangContext.jsx";
import { useAllItems, usePagedList } from "@/hook/queries.js";
import Frame from "@components/ui/Frame.jsx";
import Seo from "@components/ui/Seo.jsx";
import SafeImage from "@components/ui/SafeImage.jsx";
import { RarityIcon } from "@components/ui/icons.jsx";
import { Empty, ErrorState, Loading } from "@components/ui/StateView.jsx";
import { placeholders } from "@components/ui/media.js";
import "../Characters/characters.css";
import "./equipments.css";

const PAGE_SIZE = 20;

const ELEMENTS = [
  { id: "neutral", icon: "/ui/diamonds/void.png", label: "Void" },
  { id: "fire", icon: "/ui/diamonds/fire.png", label: "Fire" },
  { id: "water", icon: "/ui/diamonds/water.png", label: "Water" },
  { id: "wind", icon: "/ui/diamonds/wind.png", label: "Wind" },
  { id: "earth", icon: "/ui/diamonds/earth.png", label: "Earth" },
  { id: "light", icon: "/ui/diamonds/holy.png", label: "Holy" },
  { id: "darkness", icon: "/ui/diamonds/dark.png", label: "Dark" },
];

const TYPES = [
  { id: "armour", label: "Armor" },
  { id: "accessory", label: "Accessory" },
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

function ArmorGlyph() {
  return (
    <svg viewBox="0 0 64 64" className="typeGlyph" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14 12h36l4 10v12c0 16-10 26-22 28C22 60 10 50 10 34V22l4-10zm8 6v8h8v-8h-8zm12 0v8h8v-8h-8zM20 32h24c-2 10-6 16-12 18-6-2-10-8-12-18z"
      />
    </svg>
  );
}

function AccessoryGlyph() {
  return (
    <svg viewBox="0 0 64 64" className="typeGlyph" aria-hidden="true">
      <path fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" d="M18 22c8 10 20 10 28 0" />
      <path fill="currentColor" d="M30 28h4v8h-4z" />
      <circle cx="32" cy="44" r="9" fill="currentColor" />
    </svg>
  );
}

function EquipmentTile({ item }) {
  const element = ELEMENTS.find((entry) => entry.id === item.type_equipment);

  return (
    <Link className="eqCard" to={`/equipments/${item.slug}`}>
      <div className="eqCard__plate">
        <SafeImage
          className="eqCard__img"
          src={item.image2 || item.image}
          fallback={placeholders.equipment}
          alt={item.name}
        />
        {element && <img className="eqCard__elem" src={element.icon} alt="" />}
        <RarityIcon rarity={item.start} className="eqCard__rarity" />
      </div>
      <h3 className="eqCard__name">{item.name}</h3>
    </Link>
  );
}

export default function Equipments() {
  const { t, lang } = useLang();
  const [page, setPage] = useState(1);
  const [advanced, setAdvanced] = useState(false);
  const [tab, setTab] = useState("rarity");
  const [elements, setElements] = useState([]);
  const [rarities, setRarities] = useState([]);
  const [types, setTypes] = useState([]);

  const filtering = elements.length + rarities.length + types.length > 0;
  const paged = usePagedList("equipments", page);
  const all = useAllItems("equipments", filtering);
  const source = filtering ? all : paged;

  const filtered = useMemo(() => {
    const raw = filtering ? all.data || [] : paged.data?.data || [];
    return raw.filter((item) => {
      if (elements.length && !elements.includes(item.type_equipment)) return false;
      if (rarities.length && !rarities.includes(Number(item.start))) return false;
      if (types.length && !types.includes(item.type)) return false;
      return true;
    });
  }, [filtering, all.data, paged.data, elements, rarities, types]);

  const total = filtering ? filtered.length : paged.data?.meta?.total || 0;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const pageItems = filtering ? filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE) : filtered;

  const pick = (setter, value) => {
    setter((current) => toggle(current, value));
    setPage(1);
  };

  const pageLabel = lang === "fr" ? "PAGE: LISTE/EQUIPEMENT" : "PAGE: LIST/EQUIPMENT";
  const rarityLabel = lang === "fr" ? "<RARETÉ>" : "<RARITY>";
  const typeLabel = lang === "fr" ? "<EQUIPEMENT>" : "<EQUIPMENT>";

  return (
    <>
      <Seo title={t("nav.equipments")} />
      <Frame label={pageLabel}>
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
                  <strong>{rarityLabel}</strong>
                  <RarityIcon rarity={4} className="rarityIcon" />
                </button>
                <button
                  type="button"
                  className={`advTab advTab--weapon ${tab === "type" ? "is-on" : ""}`}
                  onClick={() => setTab("type")}
                >
                  <strong>{typeLabel}</strong>
                  <ArmorGlyph />
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
                {tab === "type" && (
                  <div className="adv__choices">
                    {TYPES.map((entry) => {
                      const selected = types.includes(entry.id);
                      const dimmed = types.length > 0 && !selected;
                      return (
                        <button
                          key={entry.id}
                          type="button"
                          className={`choiceBtn choiceBtn--type ${selected ? "is-on" : ""} ${dimmed ? "is-off" : ""}`}
                          title={entry.label}
                          aria-pressed={selected}
                          onClick={() => pick(setTypes, entry.id)}
                        >
                          {entry.id === "armour" ? <ArmorGlyph /> : <AccessoryGlyph />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {source.isLoading && <Loading label={filtering ? t("list.loadingAll") : undefined} />}
          {source.isError && <ErrorState error={source.error} />}
          {!source.isLoading && !source.isError && pageItems.length === 0 && <Empty />}
          {!source.isLoading && !source.isError && pageItems.length > 0 && (
            <>
              <div className="eqBoard">
                <div className="eqGrid">
                  {pageItems.map((item) => (
                    <EquipmentTile key={item.id} item={item} />
                  ))}
                </div>
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
