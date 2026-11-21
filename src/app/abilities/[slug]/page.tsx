import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Ability from "@pages/Ability/Ability";
import { loadDetail } from "@/api/load";
import type { AbilityDetail } from "@/types/api";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await loadDetail<AbilityDetail>("ability", slug);
  if (!data) return { title: "Not found" };
  return { title: data.name, description: data.description || data.descripton || undefined };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const { lang, data } = await loadDetail<AbilityDetail>("ability", slug);
  if (!data) notFound();
  return <Ability key={`${lang}:${slug}`} data={data} />;
}
