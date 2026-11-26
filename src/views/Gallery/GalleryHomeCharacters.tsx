"use client";

import React from "react";
import { useLang } from "@/context/LangContext";
import ArtworkGallery from "./ArtworkGallery";
import type { ApiRecord, ArtworkCard } from "@/types/api";

function mapHomeCharacter(item: ApiRecord): ArtworkCard[] {
  if (!item.image) return [];
  return [
    {
      key: String(item.id),
      filter: item.person_key,
      filterLabel: item.person,
      thumbnail: item.image,
      large: item.image_large || item.image,
      title: item.person,
      subtitle: item.name,
    },
  ];
}

export default function GalleryHomeCharacters() {
  const { t } = useLang();

  return (
    <ArtworkGallery
      resource="home-characters"
      title={t("gallery.homeCharacters")}
      label="PAGE: GALLERY/HOME/CHARACTER"
      mapItems={mapHomeCharacter}
      filtersVariant="persons"
    />
  );
}
