import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Weapon from "@pages/Weapon/Weapon";
import { loadDetail } from "@/api/load";
import type { WeaponDetail } from "@/types/api";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await loadDetail<WeaponDetail>("weapon", slug);
  if (!data) return { title: "Not found" };
  return { title: data.name };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const { lang, data } = await loadDetail<WeaponDetail>("weapon", slug);
  if (!data) notFound();
  return <Weapon key={`${lang}:${slug}`} data={data} />;
}
