const REVALIDATE_SECONDS = 300;

export { DEFAULT_LOCALE, LOCALES } from "@/i18n/locale.js";

function baseUrl() {
  const value = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!value) throw new Error("NEXT_PUBLIC_BACKEND_URL is not set");
  return value.replace(/\/$/, "");
}

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

function apiError(status, headers) {
  const error = new Error(`HTTP ${status}`);
  error.response = {
    status,
    headers: {
      "retry-after": headers.get("retry-after") || "",
    },
  };
  return error;
}

async function request(path, { lang, page, limit, perPage, revalidate = false } = {}) {
  const url = new URL(`${baseUrl()}${path}`);
  if (lang) url.searchParams.set("lang", lang);
  if (page != null) url.searchParams.set("page", String(page));
  if (limit != null) url.searchParams.set("limit", String(limit));
  if (perPage != null) url.searchParams.set("per_page", String(perPage));

  let attempt = 0;
  while (true) {
    const init = { headers: { Accept: "application/json" } };
    if (typeof window === "undefined" && revalidate && attempt === 0) {
      init.next = { revalidate: REVALIDATE_SECONDS };
    } else {
      init.cache = "no-store";
    }

    let response;
    try {
      response = await fetch(url, init);
    } catch (cause) {
      const error = new Error(cause?.message || "Network error");
      error.cause = cause;
      if (!shouldRetry(attempt, error)) throw error;
      await new Promise((resolve) => setTimeout(resolve, retryDelay(attempt, error)));
      attempt += 1;
      continue;
    }

    if (response.ok) return response.json();
    const error = apiError(response.status, response.headers);
    if (!shouldRetry(attempt, error)) throw error;
    await new Promise((resolve) => setTimeout(resolve, retryDelay(attempt, error)));
    attempt += 1;
  }
}

export async function fetchList(resource, page = 1, lang, { revalidate = false, perPage } = {}) {
  return request(`/${resource}`, { lang, page, perPage, revalidate });
}

export async function fetchDetail(resource, slug, lang, { revalidate = false } = {}) {
  const data = await request(`/${resource}/${encodeURIComponent(slug)}`, { lang, revalidate });
  return data.data;
}

export async function fetchStats({ revalidate = false } = {}) {
  const data = await request("/stats", { revalidate });
  return data.data;
}

export async function fetchRandomCharacter(lang, { revalidate = false } = {}) {
  const data = await request("/character/random", { lang, revalidate });
  return data.data;
}

export async function fetchRandomCharacters(lang, limit = 8, { revalidate = false } = {}) {
  const data = await request("/character/random", { lang, limit, revalidate });
  if (Array.isArray(data.data)) return data.data;
  return data.data ? [data.data] : [];
}

export async function fetchRandomBanners(lang, limit = 12, { revalidate = false } = {}) {
  const data = await request("/banners/random", { lang, limit, revalidate });
  return data.data ?? [];
}
