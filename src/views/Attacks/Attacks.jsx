"use client";

import React from "react";
import { useLang } from "@/context/LangContext.jsx";
import { ATTACK_TYPES } from "@components/ui/icons.jsx";
import EntityList from "@components/ui/EntityList.jsx";
import { AttackCard } from "@components/ui/EntityCard.jsx";

export default function Attacks({ initialPage, seededAt }) {
  const { t } = useLang();
  return (
    <EntityList
      resource="attacks"
      initialPage={initialPage}
      seededAt={seededAt}
      label="PAGE: LIST/ATTACK"
      showRarity={false}
      typeKey="type_atk"
      typeOptions={ATTACK_TYPES.map((type) => ({ value: type, label: t(`attack.${type}`) }))}
      renderCard={(item) => <AttackCard key={item.id} item={item} />}
    />
  );
}
