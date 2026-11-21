"use client";

import React from "react";
import { useLang } from "@/context/LangContext";
import { ATTACK_TYPES } from "@components/ui/icons";
import EntityList from "@components/ui/EntityList";
import { AttackCard } from "@components/ui/EntityCard";
import type { ApiRecord, ListSeed } from "@/types/api";

export default function Attacks({ initialPage, seededAt }: ListSeed) {
  const { t } = useLang();
  return (
    <EntityList<ApiRecord>
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
