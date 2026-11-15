import { notFound } from "next/navigation";
import Attack from "@pages/Attack/Attack.jsx";
import { loadDetail } from "@/api/load.js";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data } = await loadDetail("attack", slug);
  if (!data) return { title: "Not found" };
  return { title: data.name, description: data.description || undefined };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const { lang, data } = await loadDetail("attack", slug);
  if (!data) notFound();
  return <Attack key={`${lang}:${slug}`} data={data} />;
}
