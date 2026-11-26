import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Banner from "@pages/Banner/Banner";
import { loadDetail } from "@/api/load";
import type { BannerDetail } from "@/types/api";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await loadDetail<BannerDetail>("banner", slug);
  if (!data) return { title: "Not found" };
  return { title: data.name };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const { lang, data } = await loadDetail<BannerDetail>("banner", slug);
  if (!data) notFound();
  return <Banner key={`${lang}:${slug}`} data={data} />;
}
