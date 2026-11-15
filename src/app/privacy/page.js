import Privacy from "@pages/Privacy/Privacy.jsx";
import { getLang } from "@/i18n/getLang.js";
import { translate } from "@/i18n/ui.js";

export async function generateMetadata() {
  const lang = await getLang();
  return { title: translate(lang, "privacy.title"), description: translate(lang, "privacy.body") };
}

export default function Page() {
  return <Privacy />;
}
