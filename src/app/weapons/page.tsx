import type { Metadata } from "next";
import Weapons from "@pages/Weapons/Weapons";
import { loadListPage } from "@/api/load";
import { getLang } from "@/i18n/getLang";
import { translate } from "@/i18n/ui";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return { title: translate(lang, "nav.weapons") };
}

export default async function Page() {
  const { lang, initialPage, seededAt } = await loadListPage("weapons");
  return <Weapons key={lang} initialPage={initialPage} seededAt={seededAt} />;
}
