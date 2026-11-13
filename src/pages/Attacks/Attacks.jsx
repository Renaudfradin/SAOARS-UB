import React from "react";
import { useLang } from "@/context/LangContext.jsx";
import { ATTACK_TYPES } from "@components/ui/icons.jsx";
import EntityList from "@components/ui/EntityList.jsx";
import { AttackCard } from "@components/ui/EntityCard.jsx";

export default function Attacks() {
  const { t } = useLang();
  return (
    <EntityList
      resource="attacks"
      title={t("nav.attacks")}
      label="PAGE: LIST/ATTACK"
      showRarity={false}
      typeKey="type_atk"
      typeOptions={ATTACK_TYPES.map((type) => ({ value: type, label: t(`attack.${type}`) }))}
      renderCard={(item) => <AttackCard key={item.id} item={item} />}
    />
  );
}
