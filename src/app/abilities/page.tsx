import type { Metadata } from "next";
import Abilities from "@pages/Abilities/Abilities";
import { loadListPage } from "@/api/load";
import { getLang } from "@/i18n/getLang";
import { translate } from "@/i18n/ui";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return { title: translate(lang, "nav.abilities") };
}

export default async function Page() {
  const { lang, initialPage, seededAt } = await loadListPage("abilities");
  return <Abilities key={lang} initialPage={initialPage} seededAt={seededAt} />;
}
