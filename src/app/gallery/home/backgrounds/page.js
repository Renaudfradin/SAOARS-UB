import GalleryHomeBackgrounds from "@pages/Gallery/GalleryHomeBackgrounds.jsx";
import { getLang } from "@/i18n/getLang.js";
import { translate } from "@/i18n/ui.js";

export async function generateMetadata() {
  const lang = await getLang();
  return { title: translate(lang, "gallery.homeBackgrounds") };
}

export default function Page() {
  return <GalleryHomeBackgrounds />;
}
