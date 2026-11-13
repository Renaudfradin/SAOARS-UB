import { useQuery } from "@tanstack/react-query";
import { fetchDetail, fetchList, fetchRandomCharacter, fetchStats } from "@/api/client.js";
import { useLang } from "@/context/LangContext.jsx";

const STALE_TIME = 5 * 60 * 1000;

function shouldRetry(failureCount, error) {
  const status = error?.response?.status;
  if (status === 429) return failureCount < 4;
  if (status && status < 500) return false;
  return failureCount < 1;
}

function retryDelay(attempt, error) {
  const retryAfter = Number(error?.response?.headers?.["retry-after"]);
  if (retryAfter) return retryAfter * 1000;
  return Math.min(2000 * 2 ** attempt, 15000);
}

const baseOptions = { staleTime: STALE_TIME, retry: shouldRetry, retryDelay };

export function usePagedList(resource, page) {
  const { lang } = useLang();
  return useQuery({
    queryKey: [resource, "page", page, lang],
    queryFn: () => fetchList(resource, page, lang),
    keepPreviousData: true,
    ...baseOptions,
  });
}

async function fetchAllPages(resource, lang) {
  const first = await fetchList(resource, 1, lang);
  const items = [...first.data];
  const lastPage = first.meta?.last_page || 1;
  for (let page = 2; page <= lastPage; page += 1) {
    const next = await fetchList(resource, page, lang);
    items.push(...next.data);
    // Stay under the API's 60 req/min throttle on large collections (attacks).
    if (lastPage > 40 && page % 10 === 0) {
      await new Promise((resolve) => setTimeout(resolve, 1200));
    }
  }
  return items;
}

export function useAllItems(resource, enabled = true) {
  const { lang } = useLang();
  return useQuery({
    queryKey: [resource, "all", lang],
    queryFn: () => fetchAllPages(resource, lang),
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
  return useQuery({ queryKey: ["stats"], queryFn: fetchStats, ...baseOptions });
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
