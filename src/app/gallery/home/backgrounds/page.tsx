import type { Metadata } from "next";
import GalleryHomeBackgrounds from "@pages/Gallery/GalleryHomeBackgrounds";
import { getLang } from "@/i18n/getLang";
import { translate } from "@/i18n/ui";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return { title: translate(lang, "gallery.homeBackgrounds") };
}

export default function Page() {
  return <GalleryHomeBackgrounds />;
}
