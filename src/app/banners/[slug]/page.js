import { notFound } from "next/navigation";
import Banner from "@pages/Banner/Banner.jsx";
import { loadDetail } from "@/api/load.js";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data } = await loadDetail("banner", slug);
  if (!data) return { title: "Not found" };
  return { title: data.name };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const { lang, data } = await loadDetail("banner", slug);
  if (!data) notFound();
  return <Banner key={`${lang}:${slug}`} data={data} />;
}
