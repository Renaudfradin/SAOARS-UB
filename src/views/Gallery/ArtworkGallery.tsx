"use client";

import React, { useMemo, useState } from "react";
import { Image } from "antd";
import { useLang } from "@/context/LangContext";
import { useAllItems } from "@/hook/queries";
import Frame from "@components/ui/Frame";
import { Empty, ErrorState, Loading } from "@components/ui/StateView";
import type { ApiRecord, ArtworkCard, ListResource } from "@/types/api";

export default function ArtworkGallery<T extends ApiRecord = ApiRecord>({
  resource,
  title,
  label,
  mapItems,
  filters,
  filtersVariant,
  perPage,
}: {
  resource: ListResource;
  title: string;
  label: string;
  mapItems: (item: T) => ArtworkCard[];
  filters?: { id: string; label: string }[];
  filtersVariant?: "worlds" | "persons";
  perPage?: number;
}) {
  const { t } = useLang();
  const [filter, setFilter] = useState("all");
  const [preview, setPreview] = useState<ArtworkCard | null>(null);
  const { data, isLoading, isError, error } = useAllItems<T>(resource, true, perPage);

  const items = useMemo(() => (data || []).flatMap(mapItems), [data, mapItems]);
  const chips = useMemo(() => {
    if (filters) return filters;
    const seen = new Map();
    items.forEach((item) => {
      if (!item.filter || seen.has(item.filter)) return;
      seen.set(item.filter, item.filterLabel || item.title || item.filter);
    });
    return [...seen.entries()]
      .map(([id, label]) => ({ id, label }))
      .sort((a, b) => String(a.label).localeCompare(String(b.label)));
  }, [filters, items]);
  const visible = filter === "all" ? items : items.filter((item) => item.filter === filter);

  const named = filtersVariant === "persons" || filtersVariant === "worlds";
  const buttons = (
    <>
      {!named && (
        <button type="button" className={filter === "all" ? "is-active" : ""} onClick={() => setFilter("all")}>
          {t("gallery.all")}
        </button>
      )}
      {chips.map((chip) => (
        <button
          key={chip.id}
          type="button"
          aria-pressed={filter === chip.id}
          className={filter === chip.id ? "is-active" : ""}
          onClick={() => setFilter((current) => (named && current === chip.id ? "all" : chip.id))}
        >
          {chip.label}
        </button>
      ))}
    </>
  );
  const filterBar =
    chips.length > 0 ? (
      <div
        className={`galleryFilters${filtersVariant ? ` galleryFilters--${filtersVariant}` : ""}`}
        role="group"
      >
        {filtersVariant === "persons" && (
          <>
            <span className="galleryFilters__edge galleryFilters__edge--left" aria-hidden="true" />
            <span className="galleryFilters__edge galleryFilters__edge--right" aria-hidden="true" />
          </>
        )}
        {filtersVariant === "persons" ? <div className="galleryFilters__track">{buttons}</div> : buttons}
      </div>
    ) : null;

  return (
    <Frame label={label}>
      <h1 className="home__sectionTitle">{title}</h1>
      {named && filterBar}
      {isLoading && <Loading label={t("list.loadingAll")} />}
      {isError && <ErrorState error={error} />}
      {!isLoading && !isError && items.length === 0 && <Empty />}
      {!isLoading && !isError && items.length > 0 && (
        <>
          {!named && filterBar}
          <div className="cardGrid cardGrid--gallery">
            {visible.map((item) => (
              <figure key={item.key} className="galleryCard">
                <button type="button" className="galleryShot" onClick={() => setPreview(item)}>
                  <img src={item.thumbnail || ""} alt={item.title || ""} loading="lazy" decoding="async" />
                </button>
                <figcaption className="galleryCard__name">
                  {item.title}
                  {item.subtitle ? <span>{item.subtitle}</span> : null}
                </figcaption>
              </figure>
            ))}
            {preview && (
              <Image
                src={preview.large || preview.thumbnail || ""}
                alt={preview.title || ""}
                styles={{ root: { display: "none" } }}
                preview={{
                  open: true,
                  src: preview.large || preview.thumbnail || "",
                  onOpenChange: (open) => {
                    if (!open) setPreview(null);
                  },
                }}
              />
            )}
          </div>
          {visible.length === 0 && <Empty />}
        </>
      )}
    </Frame>
  );
}
