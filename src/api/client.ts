import { ApiError, type ApiRecord, type DetailResource, type ListResource, type Page, type SiteStats } from "@/types/api";
import { type Locale } from "@/i18n/locale";

const REVALIDATE_SECONDS = 300;

export { DEFAULT_LOCALE, LOCALES } from "@/i18n/locale";

type RequestOptions = {
  lang?: Locale;
  page?: number;
  limit?: number;
  perPage?: number;
  revalidate?: boolean;
};

type Retryable = {
  response?: { status?: number; headers?: { "retry-after"?: string } };
};

function baseUrl() {
  const value = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!value) throw new Error("NEXT_PUBLIC_BACKEND_URL is not set");
  return value.replace(/\/$/, "");
}

function asRetryable(error: unknown): Retryable {
  if (typeof error === "object" && error && "response" in error) return error as Retryable;
  return {};
}

function shouldRetry(failureCount: number, error: unknown) {
  const status = asRetryable(error).response?.status;
  if (status === 429) return failureCount < 4;
  if (status && status < 500) return false;
  return failureCount < 1;
}

function retryDelay(attempt: number, error: unknown) {
  const retryAfter = Number(asRetryable(error).response?.headers?.["retry-after"]);
  if (retryAfter) return retryAfter * 1000;
  return Math.min(2000 * 2 ** attempt, 15000);
}

async function request<T>(path: string, { lang, page, limit, perPage, revalidate = false }: RequestOptions = {}): Promise<T> {
  const url = new URL(`${baseUrl()}${path}`);
  if (lang) url.searchParams.set("lang", lang);
  if (page != null) url.searchParams.set("page", String(page));
  if (limit != null) url.searchParams.set("limit", String(limit));
  if (perPage != null) url.searchParams.set("per_page", String(perPage));

  let attempt = 0;
  while (true) {
    const init: RequestInit & { next?: { revalidate: number } } = { headers: { Accept: "application/json" } };
    if (typeof window === "undefined" && revalidate && attempt === 0) {
      init.next = { revalidate: REVALIDATE_SECONDS };
    } else {
      init.cache = "no-store";
    }

    let response: Response;
    try {
      response = await fetch(url, init);
    } catch (cause) {
      const error = new Error(cause instanceof Error ? cause.message : "Network error");
      error.cause = cause;
      if (!shouldRetry(attempt, error)) throw error;
      await new Promise((resolve) => setTimeout(resolve, retryDelay(attempt, error)));
      attempt += 1;
      continue;
    }

    if (response.ok) return response.json() as Promise<T>;
    const error = new ApiError(response.status, response.headers);
    if (!shouldRetry(attempt, error)) throw error;
    await new Promise((resolve) => setTimeout(resolve, retryDelay(attempt, error)));
    attempt += 1;
  }
}

export async function fetchList<T extends ApiRecord = ApiRecord>(
  resource: ListResource,
  page = 1,
  lang?: Locale,
  { revalidate = false, perPage }: { revalidate?: boolean; perPage?: number } = {},
) {
  return request<Page<T>>(`/${resource}`, { lang, page, perPage, revalidate });
}

export async function fetchDetail<T extends ApiRecord = ApiRecord>(
  resource: DetailResource,
  slug: string,
  lang?: Locale,
  { revalidate = false }: { revalidate?: boolean } = {},
) {
  const data = await request<{ data: T }>(`/${resource}/${encodeURIComponent(slug)}`, { lang, revalidate });
  return data.data;
}

export async function fetchStats({ revalidate = false }: { revalidate?: boolean } = {}) {
  const data = await request<{ data: SiteStats }>("/stats", { revalidate });
  return data.data;
}

export async function fetchRandomCharacter<T extends ApiRecord = ApiRecord>(
  lang?: Locale,
  { revalidate = false }: { revalidate?: boolean } = {},
) {
  const data = await request<{ data: T }>("/character/random", { lang, revalidate });
  return data.data;
}

export async function fetchRandomCharacters<T extends ApiRecord = ApiRecord>(
  lang?: Locale,
  limit = 8,
  { revalidate = false }: { revalidate?: boolean } = {},
) {
  const data = await request<{ data?: T | T[] | null }>("/character/random", { lang, limit, revalidate });
  if (Array.isArray(data.data)) return data.data;
  return data.data ? [data.data] : [];
}

export async function fetchRandomBanners<T extends ApiRecord = ApiRecord>(
  lang?: Locale,
  limit = 12,
  { revalidate = false }: { revalidate?: boolean } = {},
) {
  const data = await request<{ data?: T[] | null }>("/banners/random", { lang, limit, revalidate });
  return data.data ?? [];
}
