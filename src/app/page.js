import Home from "@pages/Home/Home.jsx";
import { getLang } from "@/i18n/getLang.js";
import { SITE_NAME } from "@/i18n/site.js";
import { translate } from "@/i18n/ui.js";

export async function generateMetadata() {
  const lang = await getLang();
  const title = translate(lang, "nav.home");
  return {
    title: { absolute: `${title} - ${SITE_NAME}` },
    description: translate(lang, "home.intro"),
  };
}

export default function Page() {
  return <Home />;
}
