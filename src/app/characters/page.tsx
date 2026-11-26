import type { Metadata } from "next";
import Characters from "@pages/Characters/Characters";
import { loadListPage } from "@/api/load";
import { getLang } from "@/i18n/getLang";
import { translate } from "@/i18n/ui";
import type { CharacterListItem } from "@/types/api";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return { title: translate(lang, "nav.characters") };
}

export default async function Page() {
  const { lang, initialPage, seededAt } = await loadListPage<CharacterListItem>("characters");
  return <Characters key={lang} initialPage={initialPage} seededAt={seededAt} />;
}
