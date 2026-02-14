import React from 'react';
import Image from 'next/image';
import { callApi } from '@/utils/api';
import Link from 'next/link';
import { Metadata } from 'next';
import { WeaponData, WeaponsApiResponse, PaginationMeta } from '@/types';
import Pagination from '@/app/components/pagination/Pagination';
import './weapon.css';

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const currentPage = resolvedSearchParams?.page ? parseInt(resolvedSearchParams.page) : 1;

  return {
    title: `List Weapons - Sword Art Online : Unleash Blading - Database`,
    description: `Découvrez toutes les armes de Sword Art Online Alicization Rising Steel`,
    keywords: [
      'SAO ARS',
      'Sword Art Online',
      'Alicization Rising Steel',
      'armes',
      'weapons',
      'épées',
      'équipement',
    ],
    openGraph: {
      title: `List Weapons - Sword Art Online : Unleash Blading - Database`,
      description: `Découvrez toutes les armes de Sword Art Online Alicization Rising Steel. Page ${currentPage}.`,
      type: 'website',
      locale: 'fr_FR',
    },
    twitter: {
      card: 'summary_large_image',
      title: `List Weapons - Sword Art Online : Unleash Blading - Database`,
      description: `Découvrez toutes les armes de Sword Art Online Alicization Rising Steel.`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Weapon({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  let weapons: WeaponData[] = [];
  let meta: PaginationMeta | null = null;

  const resolvedSearchParams = await searchParams;
  const currentPage = resolvedSearchParams?.page ? parseInt(resolvedSearchParams.page) : 1;

  try {
    const response: WeaponsApiResponse = await callApi(
      `/api/weapons?page=${currentPage}`,
    );
    if (Array.isArray(response)) {
      weapons = response;
    } else if (response && 'data' in response) {
      weapons = response.data;
      meta = response.meta;
    }
  } catch (e) {
    console.error(e);
    weapons = [];
  }
  return (
    <div className="weapons">
      <div className="weapons-grid">
        {weapons.map((weapon: WeaponData) => (
          <div className="weapon-card" key={weapon.id}>
            <Link href={`/weapon/${weapon.slug}`}>
              <div className="weapon-image-wrapper">
                {weapon.image && (
                  <Image
                    src={weapon.image}
                    alt={weapon.name}
                    width={200}
                    height={200}
                    className="weapon-image"
                  />
                )}
              </div>
              <div className="weapon-title">{weapon.name}</div>
              {weapon.rarity && (
                <div className="weapon-rarity">★{weapon.rarity}</div>
              )}
              {weapon.type && (
                <div className="weapon-type">{weapon.type}</div>
              )}
            </Link>
          </div>
        ))}
      </div>

      {meta && (
        <Pagination meta={meta} basePath="/weapon" itemName="armes" />
      )}
    </div>
  );
}
