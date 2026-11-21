import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Attack from "@pages/Attack/Attack";
import { loadDetail } from "@/api/load";
import type { AttackDetail } from "@/types/api";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await loadDetail<AttackDetail>("attack", slug);
  if (!data) return { title: "Not found" };
  return { title: data.name, description: data.description || undefined };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const { lang, data } = await loadDetail<AttackDetail>("attack", slug);
  if (!data) notFound();
  return <Attack key={`${lang}:${slug}`} data={data} />;
}
