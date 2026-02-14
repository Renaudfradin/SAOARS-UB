import React from 'react';
import Image from 'next/image';
import { callApi } from '@/utils/api';
import Link from 'next/link';
import { Metadata } from 'next';
import { BannerData, BannersApiResponse, PaginationMeta } from '@/types';
import Pagination from '@/app/components/pagination/Pagination';
import './banner.css';

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const currentPage = resolvedSearchParams?.page ? parseInt(resolvedSearchParams.page) : 1;

  return {
    title: `List Banners - Sword Art Online : Unleash Blading - Database`,
    description: `Découvrez toutes les bannières de recrutement de Sword Art Online Alicization Rising Steel`,
    keywords: [
      'SAO ARS',
      'Sword Art Online',
      'Alicization Rising Steel',
      'bannières',
      'recrutement',
      'gacha',
      'personnages',
    ],
    openGraph: {
      title: `List Banners - Sword Art Online : Unleash Blading - Database`,
      description: `Découvrez toutes les bannières de recrutement de Sword Art Online Alicization Rising Steel. Page ${currentPage}.`,
      type: 'website',
      locale: 'fr_FR',
    },
    twitter: {
      card: 'summary_large_image',
      title: `List Banners - Sword Art Online : Unleash Blading - Database`,
      description: `Découvrez toutes les bannières de recrutement de Sword Art Online Alicization Rising Steel.`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Banner({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  let banners: BannerData[] = [];
  let meta: PaginationMeta | null = null;

  const resolvedSearchParams = await searchParams;
  const currentPage = resolvedSearchParams?.page ? parseInt(resolvedSearchParams.page) : 1;

  try {
    const response: BannersApiResponse = await callApi(
      `/api/banners?page=${currentPage}`,
    );
    if (Array.isArray(response)) {
      banners = response;
    } else if (response && 'data' in response) {
      banners = response.data;
      meta = response.meta;
    }
  } catch (e) {
    console.error(e);
    banners = [];
  }
  return (
    <div className="banners">
      <div className="banners-grid">
        {banners.map((banner: BannerData) => (
          <div className="banner-card" key={banner.id}>
            <Link href={`/banner/${banner.slug}`}>
              <div className="banner-image-wrapper">
                <Image
                  src={banner.image}
                  alt={banner.name}
                  width={325}
                  height={125}
                  className="banner-image"
                />
              </div>
              <div className="banner-title">{banner.name}</div>
            </Link>
          </div>
        ))}
      </div>

      {meta && (
        <Pagination meta={meta} basePath="/banner" itemName="bannières" />
      )}
    </div>
  );
}
