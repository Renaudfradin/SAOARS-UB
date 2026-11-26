import type { Metadata } from "next";
import Equipments from "@pages/Equipments/Equipments";
import { loadListPage } from "@/api/load";
import { getLang } from "@/i18n/getLang";
import { translate } from "@/i18n/ui";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return { title: translate(lang, "nav.equipments") };
}

export default async function Page() {
  const { lang, initialPage, seededAt } = await loadListPage("equipments");
  return <Equipments key={lang} initialPage={initialPage} seededAt={seededAt} />;
}
