import React from "react";
import { useLang } from "@/context/LangContext.jsx";
import { WEAPON_TYPES } from "@components/ui/icons.jsx";
import EntityList from "@components/ui/EntityList.jsx";
import { WeaponCard } from "@components/ui/EntityCard.jsx";

export default function Weapons() {
  const { t } = useLang();
  return (
    <EntityList
      resource="weapons"
      title={t("nav.weapons")}
      label="PAGE: LIST/WEAPON"
      elementKey="element_weapons"
      typeKey="type"
      typeOptions={WEAPON_TYPES.map((type) => ({ value: type, label: t(`weapon.${type}`) }))}
      renderCard={(item) => <WeaponCard key={item.id} item={item} />}
    />
  );
}
