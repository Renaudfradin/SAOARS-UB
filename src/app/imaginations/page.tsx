import type { Metadata } from "next";
import Imaginations from "@pages/Imaginations/Imaginations";
import { loadListPage } from "@/api/load";
import { getLang } from "@/i18n/getLang";
import { translate } from "@/i18n/ui";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return { title: translate(lang, "nav.imaginations") };
}

export default async function Page() {
  const { lang, initialPage, seededAt } = await loadListPage("imaginations");
  return <Imaginations key={lang} initialPage={initialPage} seededAt={seededAt} />;
}
