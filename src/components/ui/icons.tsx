import React from "react";
import { useLang } from "@/context/LangContext";
import { assetSrc } from "@/lib/assetSrc";
import { weaponIcons } from "./weaponIcons";
import rarity1 from "@assets/img/icon_stars/rarity_1.svg";
import rarity2 from "@assets/img/icon_stars/rarity_2.svg";
import rarity3 from "@assets/img/icon_stars/rarity_3.svg";
import rarity4 from "@assets/img/icon_stars/rarity_4.svg";
import stars1 from "@assets/img/icon_stars/stars_1.svg";
import stars2 from "@assets/img/icon_stars/stars_2.svg";
import stars3 from "@assets/img/icon_stars/stars_3.svg";
import stars4 from "@assets/img/icon_stars/stars_4.svg";
import atkA from "@assets/img/icon_atk/icon_assult.svg";
import atkB from "@assets/img/icon_atk/icon_break.svg";
import atkC from "@assets/img/icon_atk/icon_charge.svg";
import atkD from "@assets/img/icon_atk/icon_debuff.svg";
import atkE from "@assets/img/icon_atk/icon_enhance-1.svg";
import atkEM from "@assets/img/icon_atk/icon_enhance.svg";
import atkH from "@assets/img/icon_atk/icon_heal.svg";
import atkU from "@assets/img/icon_atk/skill_i.svg";

export const ELEMENTS = ["neutral", "fire", "water", "wind", "earth", "light", "darkness"];
export const WEAPON_TYPES = ["sword", "rapier", "dagger", "bow", "dual swords", "gauntlet", "rifle", "mace"];
export const ATTACK_TYPES = ["A", "B", "C", "D", "E", "EM", "H"];

const RARITY_ICONS: Record<number, typeof rarity1> = { 1: rarity1, 2: rarity2, 3: rarity3, 4: rarity4 };
const STARS_ICONS: Record<number, typeof stars1> = { 1: stars1, 2: stars2, 3: stars3, 4: stars4 };
const ATTACK_ICONS: Record<string, typeof atkA> = { A: atkA, B: atkB, C: atkC, D: atkD, E: atkE, EM: atkEM, H: atkH, U: atkU };

const WEAPON_FILE: Record<string, (element: string) => string[]> = {
  sword: (el) => [`sword_${el}1`],
  rapier: (el) => [`rapier_${el}`],
  dagger: (el) => [`dagger_${el}`],
  bow: (el) => [`bow_${el}`],
  "dual swords": (el) => [`dualblade_${el}`, `dualblades_${el}`],
  gauntlet: (el) => [`fist_${el}`],
  rifle: (el) => [`riffle_${el}`],
  mace: (el) => [`mace_${el}`],
};

const ELEMENT_FILE: Record<string, string[]> = {
  neutral: ["none", "void"],
  darkness: ["dark"],
};

function weaponIcon(type?: string | null, element?: string | null) {
  if (!type) return null;
  const names = WEAPON_FILE[type];
  if (!names) return null;
  const elementNames = (element && ELEMENT_FILE[element]) || [element || ""];
  for (const el of elementNames) {
    for (const name of names(el)) {
      const icon = weaponIcons[name];
      if (icon) return assetSrc(icon);
    }
  }
  return null;
}

export function ElementIcon({
  element,
  size = 26,
  active = true,
  title,
}: {
  element?: string | null;
  size?: number;
  active?: boolean;
  title?: string;
}) {
  const { t } = useLang();
  if (!element) return null;
  const label = title || t(`element.${element}`);
  return (
    <span
      className={`elementIcon elementIcon--${element} ${active ? "" : "elementIcon--off"}`}
      style={{ width: size, height: size }}
      title={label}
      role="img"
      aria-label={label}
    >
      <span className="elementIcon__inner" />
    </span>
  );
}

export function RarityIcon({ rarity, className = "rarityIcon" }: { rarity?: number | string | null; className?: string }) {
  const icon = RARITY_ICONS[Number(rarity)];
  if (!icon) return null;
  return <img className={className} src={assetSrc(icon)} alt={`Rarity ${rarity}`} title={`★${rarity}`} />;
}

export function StarsIcon({ rarity }: { rarity?: number | string | null }) {
  const icon = STARS_ICONS[Number(rarity)];
  if (!icon) return null;
  return <img className="starsIcon" src={assetSrc(icon)} alt={`${rarity} stars`} />;
}

export function AttackTypeIcon({ type, className = "attackIcon" }: { type?: string | null; className?: string }) {
  if (!type) return null;
  const icon = ATTACK_ICONS[type];
  if (!icon) return null;
  return <img className={className} src={assetSrc(icon)} alt={type} title={type} />;
}

export function WeaponTypeIcon({
  type,
  element,
  className = "weaponIcon",
}: {
  type?: string | null;
  element?: string | null;
  className?: string;
}) {
  const { t } = useLang();
  const icon = weaponIcon(type, element);
  if (!icon) return element ? <ElementIcon element={element} /> : null;
  const label = `${t(`weapon.${type}`)} ${t(`element.${element}`)}`;
  return <img className={className} src={icon} alt={label} title={label} />;
}
