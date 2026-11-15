import About from "@pages/About/About.jsx";
import { getLang } from "@/i18n/getLang.js";
import { translate } from "@/i18n/ui.js";

export async function generateMetadata() {
  const lang = await getLang();
  return { title: translate(lang, "about.title"), description: translate(lang, "about.body") };
}

export default function Page() {
  return <About />;
}
