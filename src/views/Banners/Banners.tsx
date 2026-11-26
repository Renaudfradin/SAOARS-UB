"use client";

import React from "react";
import EntityList from "@components/ui/EntityList";
import { BannerCard } from "@components/ui/EntityCard";
import type { ListSeed } from "@/types/api";

export default function Banners({ initialPage, seededAt }: ListSeed) {
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
