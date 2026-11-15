import { notFound } from "next/navigation";
import Character from "@pages/Character/Character.jsx";
import { loadDetail } from "@/api/load.js";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data } = await loadDetail("character", slug);
  if (!data) return { title: "Not found" };
  const title = [data.name, data.description].filter(Boolean).join(" ");
  return { title, description: data.profile || undefined };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const { lang, data } = await loadDetail("character", slug);
  if (!data) notFound();
  return <Character key={`${lang}:${slug}`} data={data} />;
}
