import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Character from "@pages/Character/Character";
import { loadDetail } from "@/api/load";
import type { CharacterDetail } from "@/types/api";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await loadDetail<CharacterDetail>("character", slug);
  if (!data) return { title: "Not found" };
  const title = [data.name, data.description].filter(Boolean).join(" ");
  return { title, description: data.profile || undefined };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const { lang, data } = await loadDetail<CharacterDetail>("character", slug);
  if (!data) notFound();
  return <Character key={`${lang}:${slug}`} data={data} />;
}
