import React from 'react';
import Image from 'next/image';
import { callApi } from '@/utils/api';
import Link from 'next/link';
import { Metadata } from 'next';
import { CharacterData, CharactersApiResponse, PaginationMeta } from '@/types';
import Pagination from '@/app/components/pagination/Pagination';
import './character.css';

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const currentPage = resolvedSearchParams?.page ? parseInt(resolvedSearchParams.page) : 1;

  return {
    title: `List Characters - Sword Art Online : Unleash Blading - Database`,
    description: `Découvrez tous les personnages de Sword Art Online Alicization Rising Steel`,
    keywords: [
      'SAO ARS',
      'Sword Art Online',
      'Alicization Rising Steel',
      'personnages',
      'characters',
      'héros',
      'unités',
    ],
    openGraph: {
      title: `List Characters - Sword Art Online : Unleash Blading - Database`,
      description: `Découvrez tous les personnages de Sword Art Online Alicization Rising Steel. Page ${currentPage}.`,
      type: 'website',
      locale: 'fr_FR',
    },
    twitter: {
      card: 'summary_large_image',
      title: `List Characters - Sword Art Online : Unleash Blading - Database`,
      description: `Découvrez tous les personnages de Sword Art Online Alicization Rising Steel.`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Character({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  let characters: CharacterData[] = [];
  let meta: PaginationMeta | null = null;

  const resolvedSearchParams = await searchParams;
  const currentPage = resolvedSearchParams?.page ? parseInt(resolvedSearchParams.page) : 1;

  try {
    const response: CharactersApiResponse = await callApi(
      `/api/characters?page=${currentPage}`,
    );
    if (Array.isArray(response)) {
      characters = response;
    } else if (response && 'data' in response) {
      characters = response.data;
      meta = response.meta;
    }
  } catch (e) {
    console.error(e);
    characters = [];
  }
  return (
    <div className="characters">
      <div className="characters-grid">
        {characters.map((character: CharacterData) => (
          <div className="character-card" key={character.id}>
            <Link href={`/character/${character.slug}`}>
              <div className="character-image-wrapper">
                {character.image && (
                  <Image
                    src={character.image}
                    alt={character.name}
                    width={200}
                    height={200}
                    className="character-image"
                  />
                )}
              </div>
              <div className="character-title">{character.name}</div>
              {character.rarity && (
                <div className="character-rarity">★{character.rarity}</div>
              )}
              {character.element && (
                <div className="character-element">{character.element}</div>
              )}
            </Link>
          </div>
        ))}
      </div>

      {meta && (
        <Pagination meta={meta} basePath="/character" itemName="personnages" />
      )}
    </div>
  );
}
