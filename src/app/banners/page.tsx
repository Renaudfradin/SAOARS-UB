import type { Metadata } from "next";
import Banners from "@pages/Banners/Banners";
import { loadListPage } from "@/api/load";
import { getLang } from "@/i18n/getLang";
import { translate } from "@/i18n/ui";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return { title: translate(lang, "nav.banners") };
}

export default async function Page() {
  const { lang, initialPage, seededAt } = await loadListPage("banners");
  return <Banners key={lang} initialPage={initialPage} seededAt={seededAt} />;
}
