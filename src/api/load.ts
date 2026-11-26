import { ApiError, type ApiRecord, type DetailResource, type ListResource } from "@/types/api";
import { fetchDetail, fetchList } from "./client";
import { getLang } from "@/i18n/getLang";

export async function loadListPage<T extends ApiRecord = ApiRecord>(resource: ListResource) {
  const lang = await getLang();
  const initialPage = await fetchList<T>(resource, 1, lang, { revalidate: true });
  return { lang, initialPage, seededAt: Date.now() };
}

export async function loadDetail<T extends ApiRecord = ApiRecord>(resource: DetailResource, slug: string) {
  const lang = await getLang();
  try {
    const data = await fetchDetail<T>(resource, slug, lang, { revalidate: true });
    return { lang, data: data || null };
  } catch (error) {
    if (error instanceof ApiError && error.response.status === 404) return { lang, data: null };
    throw error;
  }
}
