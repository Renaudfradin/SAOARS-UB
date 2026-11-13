import React from "react";
import { Link } from "react-router-dom";
import SafeImage from "./SafeImage.jsx";
import { AttackTypeIcon, ElementIcon, RarityIcon, WeaponTypeIcon } from "./icons.jsx";
import { placeholders } from "./media.js";

export function CharacterCard({ item }) {
  const attacks = [item.atk1, item.atk2, item.atk3].filter(Boolean);
  return (
    <Link className="entityCard" to={`/characters/${item.slug}`}>
      <div className="entityCard__art">
        <SafeImage src={item.image || item.image2} fallback={placeholders.character} alt={item.name} />
        <RarityIcon rarity={item.start} className="entityCard__rarity rarityIcon" />
        <div className="entityCard__badge">
          <ElementIcon element={item.element} size={28} />
        </div>
        {attacks.length > 0 && (
          <div className="entityCard__attacks">
            {attacks.map((type, index) => (
              <AttackTypeIcon key={`${type}-${index}`} type={type} />
            ))}
          </div>
        )}
      </div>
      <div className="entityCard__name">{item.name}</div>
    </Link>
  );
}

export function WeaponCard({ item }) {
  return (
    <Link className="entityCard" to={`/weapons/${item.slug}`}>
      <div className="entityCard__art">
        <SafeImage src={item.image2 || item.image} fallback={placeholders.weapon} alt={item.name} />
        <RarityIcon rarity={item.start} className="entityCard__rarity rarityIcon" />
        <div className="entityCard__badge">
          <WeaponTypeIcon type={item.type} element={item.element_weapons} />
        </div>
      </div>
      <div className="entityCard__name">{item.name}</div>
    </Link>
  );
}

export function EquipmentCard({ item }) {
  return (
    <Link className="entityCard" to={`/equipments/${item.slug}`}>
      <div className="entityCard__art">
        <SafeImage src={item.image || item.image2} fallback={placeholders.equipment} alt={item.name} />
        <RarityIcon rarity={item.start} className="entityCard__rarity rarityIcon" />
        <div className="entityCard__badge">
          <ElementIcon element={item.type_equipment} size={28} />
        </div>
      </div>
      <div className="entityCard__name">{item.name}</div>
    </Link>
  );
}

export function BannerCard({ item }) {
  return (
    <Link className="bannerCard" to={`/banners/${item.slug}`}>
      <div className="bannerCard__plate">
        <SafeImage className="bannerCard__img" src={item.image} alt={item.name} />
      </div>
      <h3 className="bannerCard__name">{item.name}</h3>
    </Link>
  );
}

export function AbilityCard({ item }) {
  return (
    <Link className="entityCard" to={`/abilities/${item.slug}`}>
      <div className="entityCard__art">
        <SafeImage src={null} fallback={placeholders.ability} alt={item.name} />
        <RarityIcon rarity={item.start} className="entityCard__rarity rarityIcon" />
      </div>
      <div className="entityCard__name">{item.name}</div>
    </Link>
  );
}

export function AttackCard({ item }) {
  return (
    <Link className="entityCard" to={`/attacks/${item.slug}`}>
      <div className="entityCard__art" style={{ display: "grid", placeItems: "center" }}>
        <AttackTypeIcon type={item.type_atk} className="attackIcon" />
      </div>
      <div className="entityCard__name">
        {item.name}
        <span className="entityCard__sub">{item.mp_cost != null ? `${item.mp_cost} MP` : item.type_atk}</span>
      </div>
    </Link>
  );
}

export function ImaginationCard({ item }) {
  return (
    <Link className="entityCard" to={`/imaginations/${item.slug}`}>
      <div className="entityCard__art">
        <SafeImage src={item.image} fallback={placeholders.character} alt={item.name} />
        <div className="entityCard__badge">
          <ElementIcon element={item.element} size={28} />
        </div>
      </div>
      <div className="entityCard__name">{item.name}</div>
    </Link>
  );
}
