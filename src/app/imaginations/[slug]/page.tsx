import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Imagination from "@pages/Imagination/Imagination";
import { loadDetail } from "@/api/load";
import type { ImaginationDetail } from "@/types/api";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await loadDetail<ImaginationDetail>("imagination", slug);
  if (!data) return { title: "Not found" };
  return { title: data.name, description: data.description || undefined };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const { lang, data } = await loadDetail<ImaginationDetail>("imagination", slug);
  if (!data) notFound();
  return <Imagination key={`${lang}:${slug}`} data={data} />;
}
