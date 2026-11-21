"use client";

import React from "react";
import { useLang } from "@/context/LangContext";
import ArtworkGallery from "./ArtworkGallery";
import type { ApiRecord, ArtworkCard } from "@/types/api";

function mapCharacter(item: ApiRecord): ArtworkCard[] {
  if (!item.artwork_thumbnail && !item.artwork) return [];
  const cards = [
    {
      key: String(item.id),
      filter: item.name,
      filterLabel: item.name,
      thumbnail: item.artwork_thumbnail || item.artwork,
      large: item.artwork_large || item.artwork,
      title: item.name,
      subtitle: item.description,
    },
  ];
  if (item.artwork_limit_break) {
    cards.push({
      key: `${item.id}-lb`,
      filter: item.name,
      filterLabel: item.name,
      thumbnail: item.artwork_limit_break_thumbnail || item.artwork_limit_break,
      large: item.artwork_limit_break,
      title: item.name,
      subtitle: item.description,
    });
  }
  return cards;
}

export default function GalleryCharacters() {
  const { t } = useLang();

  return (
    <ArtworkGallery
      resource="characters"
      title={t("gallery.title")}
      label="PAGE: GALLERY/CHARACTER"
      mapItems={mapCharacter}
    />
  );
}
