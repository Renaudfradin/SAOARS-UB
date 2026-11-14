import axios from "axios";

export const LOCALES = ["fr", "en", "zh", "ko", "ja", "de", "es"];
export const DEFAULT_LOCALE = "fr";

let currentLang = DEFAULT_LOCALE;

export function setApiLang(lang) {
  currentLang = lang;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: { Accept: "application/json" },
});

api.interceptors.request.use((config) => {
  config.params = { lang: currentLang, ...config.params };
  return config;
});

export async function fetchList(resource, page = 1, lang) {
  const { data } = await api.get(`/${resource}`, { params: { page, lang } });
  return data;
}

export async function fetchDetail(resource, slug, lang) {
  const { data } = await api.get(`/${resource}/${encodeURIComponent(slug)}`, { params: { lang } });
  return data.data;
}

export async function fetchStats() {
  const { data } = await api.get("/stats");
  return data.data;
}

export async function fetchRandomCharacter(lang) {
  const { data } = await api.get("/character/random", { params: { lang } });
  return data.data;
}

export default api;
