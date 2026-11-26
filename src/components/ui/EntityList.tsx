import React, { useMemo, useState, type ReactNode } from "react";
import { Input, Pagination, Select } from "antd";
import { useLang } from "@/context/LangContext";
import { useAllItems, usePagedList } from "@/hook/queries";
import type { ApiRecord, ListResource, Page } from "@/types/api";
import Frame from "./Frame";
import ElementFilter from "./ElementFilter";
import { Empty, ErrorState, Loading } from "./StateView";

const PAGE_SIZE = 21;

function sortItems<T extends ApiRecord>(items: T[], sort: string) {
  const copy = [...items];
  if (sort === "name") {
    copy.sort((a, b) => String(a.name || "").localeCompare(String(b.name || "")));
  } else if (sort === "old") {
    copy.sort((a, b) => Number(a.id || 0) - Number(b.id || 0));
  } else {
    copy.sort((a, b) => Number(b.id || 0) - Number(a.id || 0));
  }
  return copy;
}

export default function EntityList<T extends ApiRecord = ApiRecord>({
  resource,
  label,
  renderCard,
  elementKey,
  typeKey,
  typeOptions,
  showRarity = true,
  gridClassName = "cardGrid",
  pageSize = PAGE_SIZE,
  showFilters = true,
  initialPage,
  seededAt,
}: {
  resource: ListResource;
  label?: string;
  renderCard: (item: T) => ReactNode;
  elementKey?: keyof T & string;
  typeKey?: keyof T & string;
  typeOptions?: { value: string; label: string }[];
  showRarity?: boolean;
  gridClassName?: string;
  pageSize?: number;
  showFilters?: boolean;
  initialPage?: Page<T>;
  seededAt?: number;
}) {
  const { t } = useLang();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [element, setElement] = useState<string | null>(null);
  const [rarity, setRarity] = useState<number | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [sort, setSort] = useState("new");
  const [advanced, setAdvanced] = useState(false);

  const filtering = Boolean(search.trim() || element || rarity || type || sort !== "new");
  const paged = usePagedList<T>(resource, page, initialPage, seededAt);
  const all = useAllItems<T>(resource, filtering);

  const source = filtering ? all : paged;
  const items = useMemo(() => {
    const raw = filtering ? all.data || [] : paged.data?.data || [];
    let next = raw;
    const q = search.trim().toLowerCase();
    if (q) next = next.filter((item) => String(item.name || "").toLowerCase().includes(q));
    if (element && elementKey) next = next.filter((item) => item[elementKey] === element);
    if (rarity) next = next.filter((item) => Number(item.start) === Number(rarity));
    if (type && typeKey) next = next.filter((item) => item[typeKey] === type);
    return sortItems(next, sort);
  }, [filtering, all.data, paged.data, search, element, elementKey, rarity, type, typeKey, sort]);

  const pageItems = filtering ? items.slice((page - 1) * pageSize, page * pageSize) : items;
  const total = filtering ? items.length : paged.data?.meta?.total || 0;

  const reset = () => {
    setSearch("");
    setElement(null);
    setRarity(null);
    setType(null);
    setSort("new");
    setPage(1);
  };

  return (
    <>
      <Frame label={label}>
        {showFilters && <div className="filters">
          {elementKey && <ElementFilter value={element} onChange={(value) => { setElement(value); setPage(1); }} />}
          <button type="button" className="filters__toggle" onClick={() => setAdvanced((value) => !value)}>
            {t("list.advancedSearch")}
          </button>
          {advanced && (
            <div className="filters__row">
              <Input.Search
                className="filters__search"
                allowClear
                placeholder={t("list.search")}
                value={search}
                onChange={(event) => { setSearch(event.target.value); setPage(1); }}
              />
              {showRarity && (
                <Select
                  allowClear
                  placeholder={t("list.rarity")}
                  style={{ minWidth: 120 }}
                  value={rarity}
                  onChange={(value: number | null) => { setRarity(value ?? null); setPage(1); }}
                  options={[1, 2, 3, 4].map((n) => ({ value: n, label: `★${n}` }))}
                />
              )}
              {typeKey && typeOptions && typeOptions.length > 0 && (
                <Select
                  allowClear
                  placeholder={t("list.type")}
                  style={{ minWidth: 140 }}
                  value={type}
                  onChange={(value: string | null) => { setType(value ?? null); setPage(1); }}
                  options={typeOptions}
                />
              )}
              <Select
                style={{ minWidth: 140 }}
                value={sort}
                onChange={(value: string) => { setSort(value); setPage(1); }}
                options={[
                  { value: "new", label: t("list.sortNew") },
                  { value: "old", label: t("list.sortOld") },
                  { value: "name", label: t("list.sortName") },
                ]}
              />
              <button type="button" className="btnTag" onClick={reset}>
                {t("list.reset")}
              </button>
            </div>
          )}
        </div>}

        {source.isLoading && <Loading label={filtering ? t("list.loadingAll") : undefined} />}
        {source.isError && <ErrorState error={source.error} />}
        {!source.isLoading && !source.isError && pageItems.length === 0 && <Empty />}
        {!source.isLoading && !source.isError && pageItems.length > 0 && (
          <>
            <div className={gridClassName}>{pageItems.map((item) => renderCard(item))}</div>
            {total > pageSize && (
              <div className="pager">
                <Pagination
                  current={page}
                  pageSize={pageSize}
                  total={total}
                  showSizeChanger={false}
                  onChange={setPage}
                />
              </div>
            )}
          </>
        )}
      </Frame>
    </>
  );
}
