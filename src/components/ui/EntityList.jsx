import React, { useMemo, useState } from "react";
import { Input, Pagination, Select } from "antd";
import { useLang } from "@/context/LangContext.jsx";
import { useAllItems, usePagedList } from "@/hook/queries.js";
import Frame from "./Frame.jsx";
import ElementFilter from "./ElementFilter.jsx";
import { Empty, ErrorState, Loading } from "./StateView.jsx";
import Seo from "./Seo.jsx";

const PAGE_SIZE = 21;

function sortItems(items, sort) {
  const copy = [...items];
  if (sort === "name") {
    copy.sort((a, b) => String(a.name || "").localeCompare(String(b.name || "")));
  } else if (sort === "old") {
    copy.sort((a, b) => (a.id || 0) - (b.id || 0));
  } else {
    copy.sort((a, b) => (b.id || 0) - (a.id || 0));
  }
  return copy;
}

export default function EntityList({
  resource,
  label,
  title,
  renderCard,
  elementKey,
  typeKey,
  typeOptions,
  showRarity = true,
  gridClassName = "cardGrid",
  pageSize = PAGE_SIZE,
}) {
  const { t } = useLang();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [element, setElement] = useState(null);
  const [rarity, setRarity] = useState(null);
  const [type, setType] = useState(null);
  const [sort, setSort] = useState("new");
  const [advanced, setAdvanced] = useState(false);

  const filtering = Boolean(search.trim() || element || rarity || type || sort !== "new");
  const paged = usePagedList(resource, page);
  const all = useAllItems(resource, filtering);

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
      <Seo title={title} />
      <Frame label={label}>
        <div className="filters">
          {elementKey && <ElementFilter value={element} onChange={(value) => { setElement(value); setPage(1); }} />}
          <button type="button" className="filters__toggle" onClick={() => setAdvanced((v) => !v)}>
            {t("list.advancedSearch")}
          </button>
          {advanced && (
            <div className="filters__row">
              <Input.Search
                className="filters__search"
                allowClear
                placeholder={t("list.search")}
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              />
              {showRarity && (
                <Select
                  allowClear
                  placeholder={t("list.rarity")}
                  style={{ minWidth: 120 }}
                  value={rarity}
                  onChange={(value) => { setRarity(value ?? null); setPage(1); }}
                  options={[1, 2, 3, 4].map((n) => ({ value: n, label: `★${n}` }))}
                />
              )}
              {typeKey && typeOptions?.length > 0 && (
                <Select
                  allowClear
                  placeholder={t("list.type")}
                  style={{ minWidth: 140 }}
                  value={type}
                  onChange={(value) => { setType(value ?? null); setPage(1); }}
                  options={typeOptions}
                />
              )}
              <Select
                style={{ minWidth: 140 }}
                value={sort}
                onChange={(value) => { setSort(value); setPage(1); }}
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
        </div>

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
