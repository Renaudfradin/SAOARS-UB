import type { Metadata } from "next";
import Privacy from "@pages/Privacy/Privacy";
import { getLang } from "@/i18n/getLang";
import { translate } from "@/i18n/ui";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return { title: translate(lang, "privacy.title"), description: translate(lang, "privacy.body") };
}

export default function Page() {
  return <Privacy />;
}
