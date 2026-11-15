import { fetchDetail, fetchList } from "./client.js";
import { getLang } from "@/i18n/getLang.js";

export async function loadListPage(resource) {
  const lang = await getLang();
  const initialPage = await fetchList(resource, 1, lang, { revalidate: true });
  return { lang, initialPage, seededAt: Date.now() };
}

export async function loadDetail(resource, slug) {
  const lang = await getLang();
  try {
    const data = await fetchDetail(resource, slug, lang, { revalidate: true });
    return { lang, data: data || null };
  } catch (error) {
    if (error?.response?.status === 404) return { lang, data: null };
    throw error;
  }
}
