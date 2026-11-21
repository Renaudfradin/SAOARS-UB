import type { Metadata } from "next";
import NotFound from "@pages/404/404";
import { getLang } from "@/i18n/getLang";
import { translate } from "@/i18n/ui";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return { title: translate(lang, "notFound.title") };
}

export default function NotFoundPage() {
  return <NotFound />;
}
