import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Equipment from "@pages/Equipment/Equipment";
import { loadDetail } from "@/api/load";
import type { EquipmentDetail } from "@/types/api";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await loadDetail<EquipmentDetail>("equipment", slug);
  if (!data) return { title: "Not found" };
  return { title: data.name };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const { lang, data } = await loadDetail<EquipmentDetail>("equipment", slug);
  if (!data) notFound();
  return <Equipment key={`${lang}:${slug}`} data={data} />;
}
