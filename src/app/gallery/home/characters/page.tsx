import type { Metadata } from "next";
import GalleryHomeCharacters from "@pages/Gallery/GalleryHomeCharacters";
import { getLang } from "@/i18n/getLang";
import { translate } from "@/i18n/ui";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return { title: translate(lang, "gallery.homeCharacters") };
}

export default function Page() {
  return <GalleryHomeCharacters />;
}
