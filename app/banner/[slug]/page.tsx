import React from 'react';
import Image from 'next/image';
import { callApi } from '@/utils/api';
import Link from 'next/link';
import '../banner.css';

type Character = {
  name: string;
  slug: string;
  image2: string;
};

type BannerData = {
  id: string;
  name: string;
  slug: string;
  image: string;
  created_at: string;
  updated_at: string;
  from: string;
  to: string;
  characters: Character[];
};

export default async function Banner({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let banner: BannerData | null = null;
  try {
    const response: BannerData | { data: BannerData } = await callApi(
      `/api/banner/${slug}`,
    );
    if ('data' in response) {
      banner = response.data;
    } else {
      banner = response;
    }
  } catch (e) {
    console.error(e);
    banner = null;
  }

  if (!banner) {
    return <div>banner non trouvée</div>;
  }

  return (
    <div>
      <h1>{banner.name}</h1>
      <div>
        <Image
          src={banner.image}
          alt={banner.name}
          width={325}
          height={125}
          className="banner-image"
        />
        <p>{banner.created_at}</p>
      </div>

      <div>
        <h2>Images</h2>
        <ul>
          {banner.characters.map((character: Character, index: number) => (
            <li key={`character-${index}`}>
              <Link href={`/character/${character.slug}`}>
              <Image
                src={character.image2}
                alt={character.name}
                width={325}
                height={125}
                className="banner-image"
                />
                </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>From</h2>
        <p>{banner.from}</p>
      </div>

      <div>
        <h2>To</h2>
        <p>{banner.to}</p>
      </div>
    </div>
  );
}
