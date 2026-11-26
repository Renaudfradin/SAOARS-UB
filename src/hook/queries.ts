import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  fetchDetail,
  fetchList,
  fetchRandomBanners,
  fetchRandomCharacter,
  fetchRandomCharacters,
  fetchStats,
} from "@/api/client";
import { useLang } from "@/context/LangContext";
import type { Locale } from "@/i18n/locale";
import type { ApiRecord, DetailResource, ListResource, Page, SiteStats } from "@/types/api";

const STALE_TIME = 5 * 60 * 1000;

const baseOptions = { staleTime: STALE_TIME, retry: false };

async function fetchAllPages<T extends ApiRecord>(resource: ListResource, lang: Locale, perPage?: number) {
  const first = await fetchList<T>(resource, 1, lang, { perPage });
  const items = [...first.data];
  const lastPage = first.meta?.last_page || 1;
  for (let page = 2; page <= lastPage; page += 1) {
    const next = await fetchList<T>(resource, page, lang, { perPage });
    items.push(...next.data);
    // Stay under the API's 60 req/min throttle on large collections (attacks).
    if (lastPage > 40 && page % 10 === 0) {
      await new Promise((resolve) => setTimeout(resolve, 1200));
    }
  }
  return items;
}

export function usePagedList<T extends ApiRecord = ApiRecord>(
  resource: ListResource,
  page: number,
  initialPage?: Page<T> | null,
  seededAt?: number,
) {
  const { lang } = useLang();
  const seeded = page === 1 && initialPage;
  return useQuery({
    queryKey: [resource, "page", page, lang],
    queryFn: () => fetchList<T>(resource, page, lang),
    placeholderData: keepPreviousData,
    ...(seeded ? { initialData: initialPage, ...(seededAt != null ? { initialDataUpdatedAt: seededAt } : {}) } : {}),
    ...baseOptions,
  });
}

export function useAllItems<T extends ApiRecord = ApiRecord>(resource: ListResource, enabled = true, perPage?: number) {
  const { lang } = useLang();
  return useQuery({
    queryKey: [resource, "all", lang, perPage ?? null],
    queryFn: () => fetchAllPages<T>(resource, lang, perPage),
    enabled,
    ...baseOptions,
    staleTime: 30 * 60 * 1000,
  });
}

export function useDetail<T extends ApiRecord = ApiRecord>(resource: DetailResource, slug?: string) {
  const { lang } = useLang();
  return useQuery({
    queryKey: [resource, "detail", slug, lang],
    queryFn: () => fetchDetail<T>(resource, slug || "", lang),
    enabled: Boolean(slug),
    ...baseOptions,
  });
}

export function useStats() {
  return useQuery<SiteStats>({ queryKey: ["stats"], queryFn: () => fetchStats(), ...baseOptions });
}

export function useRandomCharacter<T extends ApiRecord = ApiRecord>() {
  const { lang } = useLang();
  return useQuery({
    queryKey: ["character", "random", lang],
    queryFn: () => fetchRandomCharacter<T>(lang),
    ...baseOptions,
    staleTime: Infinity,
  });
}

export function useRandomCharacters<T extends ApiRecord = ApiRecord>(limit = 8) {
  const { lang } = useLang();
  return useQuery({
    queryKey: ["character", "random", limit, lang],
    queryFn: () => fetchRandomCharacters<T>(lang, limit),
    ...baseOptions,
    staleTime: Infinity,
  });
}

export function useRandomBanners<T extends ApiRecord = ApiRecord>(limit = 12) {
  const { lang } = useLang();
  return useQuery({
    queryKey: ["banner", "random", limit, lang],
    queryFn: () => fetchRandomBanners<T>(lang, limit),
    ...baseOptions,
    staleTime: Infinity,
  });
}
