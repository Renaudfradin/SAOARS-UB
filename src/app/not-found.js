import NotFound from "@pages/404/404.jsx";
import { getLang } from "@/i18n/getLang.js";
import { translate } from "@/i18n/ui.js";

export async function generateMetadata() {
  const lang = await getLang();
  return { title: translate(lang, "notFound.title") };
}

export default function NotFoundPage() {
  return <NotFound />;
}
