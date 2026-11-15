import { notFound } from "next/navigation";
import Imagination from "@pages/Imagination/Imagination.jsx";
import { loadDetail } from "@/api/load.js";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data } = await loadDetail("imagination", slug);
  if (!data) return { title: "Not found" };
  return { title: data.name, description: data.description || undefined };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const { lang, data } = await loadDetail("imagination", slug);
  if (!data) notFound();
  return <Imagination key={`${lang}:${slug}`} data={data} />;
}
