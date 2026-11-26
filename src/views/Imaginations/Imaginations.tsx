"use client";

import React from "react";
import EntityList from "@components/ui/EntityList";
import { ImaginationCard } from "@components/ui/EntityCard";
import type { ApiRecord, ListSeed } from "@/types/api";

export default function Imaginations({ initialPage, seededAt }: ListSeed) {
  return (
    <EntityList<ApiRecord>
      resource="imaginations"
      initialPage={initialPage}
      seededAt={seededAt}
      label="PAGE: LIST/IMAGINATION"
      elementKey="element"
      showRarity={false}
      renderCard={(item) => <ImaginationCard key={item.id} item={item} />}
    />
  );
}
