import Equipments from "@pages/Equipments/Equipments.jsx";
import { loadListPage } from "@/api/load.js";
import { getLang } from "@/i18n/getLang.js";
import { translate } from "@/i18n/ui.js";

export async function generateMetadata() {
  const lang = await getLang();
  return { title: translate(lang, "nav.equipments") };
}

export default async function Page() {
  const { lang, initialPage, seededAt } = await loadListPage("equipments");
  return <Equipments key={lang} initialPage={initialPage} seededAt={seededAt} />;
}
