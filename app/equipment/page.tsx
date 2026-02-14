import React from 'react';
import Image from 'next/image';
import { callApi } from '@/utils/api';
import Link from 'next/link';
import { Metadata } from 'next';
import { EquipmentData, EquipmentApiResponse, PaginationMeta } from '@/types';
import Pagination from '@/app/components/pagination/Pagination';
import './equipment.css';

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const currentPage = resolvedSearchParams?.page ? parseInt(resolvedSearchParams.page) : 1;

  return {
    title: `List Equipment - Sword Art Online : Unleash Blading - Database`,
    description: `Découvrez tous les équipements de Sword Art Online Alicization Rising Steel`,
    keywords: [
      'SAO ARS',
      'Sword Art Online',
      'Alicization Rising Steel',
      'équipements',
      'equipment',
      'accessoires',
      'armures',
    ],
    openGraph: {
      title: `List Equipment - Sword Art Online : Unleash Blading - Database`,
      description: `Découvrez tous les équipements de Sword Art Online Alicization Rising Steel. Page ${currentPage}.`,
      type: 'website',
      locale: 'fr_FR',
    },
    twitter: {
      card: 'summary_large_image',
      title: `List Equipment - Sword Art Online : Unleash Blading - Database`,
      description: `Découvrez tous les équipements de Sword Art Online Alicization Rising Steel.`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Equipment({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  let equipment: EquipmentData[] = [];
  let meta: PaginationMeta | null = null;

  const resolvedSearchParams = await searchParams;
  const currentPage = resolvedSearchParams?.page ? parseInt(resolvedSearchParams.page) : 1;

  try {
    const response: EquipmentApiResponse = await callApi(
      `/api/equipments?page=${currentPage}`,
    );
    if (Array.isArray(response)) {
      equipment = response;
    } else if (response && 'data' in response) {
      equipment = response.data;
      meta = response.meta;
    }
  } catch (e) {
    console.error(e);
    equipment = [];
  }
  return (
    <div className="equipment">
      <div className="equipment-grid">
        {equipment.map((item: EquipmentData) => (
          <div className="equipment-card" key={item.id}>
            <Link href={`/equipment/${item.slug}`}>
              <div className="equipment-image-wrapper">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={200}
                    height={200}
                    className="equipment-image"
                  />
                )}
              </div>
              <div className="equipment-title">{item.name}</div>
              {item.rarity && (
                <div className="equipment-rarity">★{item.rarity}</div>
              )}
              {item.type && (
                <div className="equipment-type">{item.type}</div>
              )}
            </Link>
          </div>
        ))}
      </div>

      {meta && (
        <Pagination meta={meta} basePath="/equipment" itemName="équipements" />
      )}
    </div>
  );
}
