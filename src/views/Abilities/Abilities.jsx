"use client";

import React from "react";
import EntityList from "@components/ui/EntityList.jsx";
import { AbilityCard } from "@components/ui/EntityCard.jsx";

export default function Abilities({ initialPage, seededAt }) {
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
