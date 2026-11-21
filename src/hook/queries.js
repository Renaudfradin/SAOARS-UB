import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  fetchDetail,
  fetchList,
  fetchRandomBanners,
  fetchRandomCharacter,
  fetchRandomCharacters,
  fetchStats,
} from "@/api/client.js";
import { useLang } from "@/context/LangContext.jsx";

const STALE_TIME = 5 * 60 * 1000;

const baseOptions = { staleTime: STALE_TIME, retry: false };

async function fetchAllPages(resource, lang, perPage) {
  const first = await fetchList(resource, 1, lang, { perPage });
  const items = [...first.data];
  const lastPage = first.meta?.last_page || 1;
  for (let page = 2; page <= lastPage; page += 1) {
    const next = await fetchList(resource, page, lang, { perPage });
    items.push(...next.data);
    // Stay under the API's 60 req/min throttle on large collections (attacks).
    if (lastPage > 40 && page % 10 === 0) {
      await new Promise((resolve) => setTimeout(resolve, 1200));
    }
  }
  return items;
}

export function usePagedList(resource, page, initialPage, seededAt) {
  const { lang } = useLang();
  const seeded = page === 1 && initialPage;
  return useQuery({
    queryKey: [resource, "page", page, lang],
    queryFn: () => fetchList(resource, page, lang),
    placeholderData: keepPreviousData,
    ...(seeded ? { initialData: initialPage, initialDataUpdatedAt: seededAt } : {}),
    ...baseOptions,
  });
}

export function useAllItems(resource, enabled = true, perPage) {
  const { lang } = useLang();
  return useQuery({
    queryKey: [resource, "all", lang, perPage ?? null],
    queryFn: () => fetchAllPages(resource, lang, perPage),
    enabled,
    ...baseOptions,
    staleTime: 30 * 60 * 1000,
  });
}

export function useDetail(resource, slug) {
  const { lang } = useLang();
  return useQuery({
    queryKey: [resource, "detail", slug, lang],
    queryFn: () => fetchDetail(resource, slug, lang),
    enabled: Boolean(slug),
    ...baseOptions,
  });
}

export function useStats() {
  return useQuery({ queryKey: ["stats"], queryFn: () => fetchStats(), ...baseOptions });
}

export function useRandomCharacter() {
  const { lang } = useLang();
  return useQuery({
    queryKey: ["character", "random", lang],
    queryFn: () => fetchRandomCharacter(lang),
    ...baseOptions,
    staleTime: Infinity,
  });
}

export function useRandomCharacters(limit = 8) {
  const { lang } = useLang();
  return useQuery({
    queryKey: ["character", "random", limit, lang],
    queryFn: () => fetchRandomCharacters(lang, limit),
    ...baseOptions,
    staleTime: Infinity,
  });
}

export function useRandomBanners(limit = 12) {
  const { lang } = useLang();
  return useQuery({
    queryKey: ["banner", "random", limit, lang],
    queryFn: () => fetchRandomBanners(lang, limit),
    ...baseOptions,
    staleTime: Infinity,
  });
}
