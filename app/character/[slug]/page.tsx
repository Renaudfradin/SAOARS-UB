import React from 'react';
import Image from 'next/image';
import { callApi } from '@/utils/api';
import '../character.css';

type Atk = {
  id: string;
  name: string;
  slug: string;
  description: string;
  mp_cost: string;
  type_atk: string;
  created_at: string;
  updated_at: string;
}

type Partner = {
  id: string;
  name: string;
  slug: string;
  image: string;
  created_at: string;
  updated_at: string;
}

type CharacterData = {
  id: string;
  name: string;
  slug: string;
  image: string;
  image2: string;
  profile: string;
  description: string;
  element: string;
  atk1: Atk;
  atk2: Atk;
  atk3: Atk;
  hp: string;
  mp: string;
  atk: string;
  matk: string;
  def: string;
  mdef: string;
  crit: string;
  spd: string;
  ultime: string;
  ultime_description: string;
  enhance: string;
  enhance_atk: string;
  enhance_atk2: string;
  start: string;
  cost: string;
  special_partner: Partner;
  created_at: string;
  updated_at: string;
};


export default async function Character({ params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let character: CharacterData | null = null;
  try {
    const response: CharacterData | { data: CharacterData } = await callApi(
      `/api/character/${slug}`,
    );
    if ('data' in response) {
      character = response.data;
    } else {
      character = response;
    }
  } catch (e) {
    console.error(e);
    character = null;
  }

  if (!character) {
    return <div>character non trouvée</div>;
  }
  return (
    <div>
      <h1>Character {slug}</h1>
      <div>
        <Image
          src={character.image}
          alt={character.name}
          width={200}
          height={200}
          className="character-image"
        />
      </div>
      <p>{character.id}</p>
      <p>{character.name}</p>
      <p>{character.slug}</p>
      <p>{character.profile}</p>
      <p>{character.description}</p>
      <p>{character.element}</p>
      <p>{character.atk1.name}</p>
      <p>{character.atk2.name}</p>
      <p>{character.atk3.name}</p>
      <p>{character.hp}</p>
      <p>{character.mp}</p>
      <p>{character.atk}</p>
      <p>{character.matk}</p>
      <p>{character.def}</p>
      <p>{character.mdef}</p>
      <p>{character.crit}</p>
      <p>{character.spd}</p>
      <p>{character.ultime}</p>
      <p>{character.ultime_description}</p>
      <p>{character.enhance}</p>
      <p>{character.enhance_atk}</p>
      <p>{character.enhance_atk2}</p>
      <p>{character.start}</p>
      <p>{character.cost}</p>
      <p>{character.special_partner.name}</p>
      <p>{character.special_partner.image}</p>
      <p>{character.special_partner.slug}</p>
      <p>{character.image}</p>
      <p>{character.image2}</p>
      <p>{character.created_at}</p>
      <p>{character.updated_at}</p>
      
    </div>
  );
}
