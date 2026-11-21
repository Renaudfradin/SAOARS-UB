"use client";

import React from "react";
import EntityList from "@components/ui/EntityList";
import { AbilityCard } from "@components/ui/EntityCard";
import type { ListSeed } from "@/types/api";

export default function Abilities({ initialPage, seededAt }: ListSeed) {
  return (
    <EntityList
      resource="abilities"
      initialPage={initialPage}
      seededAt={seededAt}
      label="PAGE: LIST/ABILITY"
      showRarity
      renderCard={(item) => <AbilityCard key={item.id} item={item} />}
    />
  );
}
