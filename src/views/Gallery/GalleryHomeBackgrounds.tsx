"use client";

import React from "react";
import { useLang } from "@/context/LangContext";
import ArtworkGallery from "./ArtworkGallery";
import type { ApiRecord, ArtworkCard } from "@/types/api";

const WORLDS = [
  { id: "1", label: "SAO" },
  { id: "2", label: "ALO" },
  { id: "3", label: "GGO" },
  { id: "4", label: "OS" },
  { id: "5", label: "UW" },
  { id: "6", label: "etc." },
];

function mapBackground(item: ApiRecord): ArtworkCard[] {
  if (!item.image) return [];
  return [
    {
      key: String(item.id),
      filter: String(item.world ?? ""),
      thumbnail: item.image,
      large: item.image_large || item.image,
      title: item.name,
      subtitle: item.world_name,
    },
  ];
}

export default function GalleryHomeBackgrounds() {
  const { t } = useLang();

  return (
    <ArtworkGallery
      resource="home-backgrounds"
      title={t("gallery.homeBackgrounds")}
      label="PAGE: GALLERY/HOME/BACKGROUND"
      mapItems={mapBackground}
      filters={WORLDS}
      perPage={200}
    />
  );
}
