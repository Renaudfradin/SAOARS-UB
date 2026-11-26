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
  perPage,
}: {
  resource: ListResource;
  title: string;
  label: string;
  mapItems: (item: T) => ArtworkCard[];
  filters?: { id: string; label: string }[];
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

  return (
    <Frame label={label}>
      <h1 className="home__sectionTitle">{title}</h1>
      {isLoading && <Loading label={t("list.loadingAll")} />}
      {isError && <ErrorState error={error} />}
      {!isLoading && !isError && items.length === 0 && <Empty />}
      {!isLoading && !isError && items.length > 0 && (
        <>
          {chips.length > 0 && (
            <div className="galleryFilters">
              <button type="button" className={filter === "all" ? "is-active" : ""} onClick={() => setFilter("all")}>
                {t("gallery.all")}
              </button>
              {chips.map((chip) => (
                <button
                  key={chip.id}
                  type="button"
                  className={filter === chip.id ? "is-active" : ""}
                  onClick={() => setFilter(chip.id)}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          )}
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
