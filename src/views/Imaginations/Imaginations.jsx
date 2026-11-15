"use client";

import React from "react";
import EntityList from "@components/ui/EntityList.jsx";
import { ImaginationCard } from "@components/ui/EntityCard.jsx";

export default function Imaginations({ initialPage, seededAt }) {
  return (
    <EntityList
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
