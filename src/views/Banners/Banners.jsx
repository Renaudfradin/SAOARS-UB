"use client";

import React from "react";
import EntityList from "@components/ui/EntityList.jsx";
import { BannerCard } from "@components/ui/EntityCard.jsx";

export default function Banners({ initialPage, seededAt }) {
  return (
    <EntityList
      resource="banners"
      initialPage={initialPage}
      seededAt={seededAt}
      label="PAGE: LIST/SCOUT"
      showRarity={false}
      showFilters={false}
      gridClassName="cardGrid cardGrid--banners"
      pageSize={20}
      renderCard={(item) => <BannerCard key={item.id} item={item} />}
    />
  );
}
