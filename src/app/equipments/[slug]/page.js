import { notFound } from "next/navigation";
import Equipment from "@pages/Equipment/Equipment.jsx";
import { loadDetail } from "@/api/load.js";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data } = await loadDetail("equipment", slug);
  if (!data) return { title: "Not found" };
  return { title: data.name };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const { lang, data } = await loadDetail("equipment", slug);
  if (!data) notFound();
  return <Equipment key={`${lang}:${slug}`} data={data} />;
}
