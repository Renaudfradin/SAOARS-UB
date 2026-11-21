import type { Metadata } from "next";
import Attacks from "@pages/Attacks/Attacks";
import { loadListPage } from "@/api/load";
import { getLang } from "@/i18n/getLang";
import { translate } from "@/i18n/ui";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return { title: translate(lang, "nav.attacks") };
}

export default async function Page() {
  const { lang, initialPage, seededAt } = await loadListPage("attacks");
  return <Attacks key={lang} initialPage={initialPage} seededAt={seededAt} />;
}
