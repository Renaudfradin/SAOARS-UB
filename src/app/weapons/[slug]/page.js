import { notFound } from "next/navigation";
import Weapon from "@pages/Weapon/Weapon.jsx";
import { loadDetail } from "@/api/load.js";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data } = await loadDetail("weapon", slug);
  if (!data) return { title: "Not found" };
  return { title: data.name };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const { lang, data } = await loadDetail("weapon", slug);
  if (!data) notFound();
  return <Weapon key={`${lang}:${slug}`} data={data} />;
}
