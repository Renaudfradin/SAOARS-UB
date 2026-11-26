import type { Metadata } from "next";
import GalleryCharacters from "@pages/Gallery/GalleryCharacters";
import { getLang } from "@/i18n/getLang";
import { translate } from "@/i18n/ui";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return { title: translate(lang, "gallery.title") };
}

export default function Page() {
  return <GalleryCharacters />;
}
