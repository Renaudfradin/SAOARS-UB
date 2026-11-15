import Attacks from "@pages/Attacks/Attacks.jsx";
import { loadListPage } from "@/api/load.js";
import { getLang } from "@/i18n/getLang.js";
import { translate } from "@/i18n/ui.js";

export async function generateMetadata() {
  const lang = await getLang();
  return { title: translate(lang, "nav.attacks") };
}

export default async function Page() {
  const { lang, initialPage, seededAt } = await loadListPage("attacks");
  return <Attacks key={lang} initialPage={initialPage} seededAt={seededAt} />;
}
