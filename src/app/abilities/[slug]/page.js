import { notFound } from "next/navigation";
import Ability from "@pages/Ability/Ability.jsx";
import { loadDetail } from "@/api/load.js";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data } = await loadDetail("ability", slug);
  if (!data) return { title: "Not found" };
  return { title: data.name, description: data.description || data.descripton || undefined };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const { lang, data } = await loadDetail("ability", slug);
  if (!data) notFound();
  return <Ability key={`${lang}:${slug}`} data={data} />;
}
