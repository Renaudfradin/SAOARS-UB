import type { Metadata } from "next";
import Home from "@pages/Home/Home";
import { getLang } from "@/i18n/getLang";
import { SITE_NAME } from "@/i18n/site";
import { translate } from "@/i18n/ui";

export async function generateMetadata(): Promise<Metadata> {
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
