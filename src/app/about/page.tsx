import type { Metadata } from "next";
import About from "@pages/About/About";
import { getLang } from "@/i18n/getLang";
import { translate } from "@/i18n/ui";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return { title: translate(lang, "about.title"), description: translate(lang, "about.body") };
}

export default function Page() {
  return <About />;
}
