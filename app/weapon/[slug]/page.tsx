import React from 'react';
import Image from 'next/image';
import { callApi } from '@/utils/api';
import '../weapon.css';

type WeaponData = {
  id: string,
  name: string,
  slug: string,
  type: string,
  element_weapons: string,
  hp: string,
  mp: string,
  atk: string,
  matk: string,
  def: string,
  mdef: string,
  crit: string,
  spd: string,
  effect_1: string,
  effect_2: string,
  effect_3: string,
  image: string,
  image2: string,
  created_at: string,
  updated_at: string,
};

export default async function Weapon({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let weapon: WeaponData | null = null;
  try {
    const response: WeaponData | { data: WeaponData } = await callApi(
      `/api/weapon/${slug}`,
    );
    if ('data' in response) {
      weapon = response.data;
    } else {
      weapon = response;
    }
  } catch (e) {
    console.error(e);
    weapon = null;
  }

  if (!weapon) {
    return <div>weapon non trouvée</div>;
  }

  return (
    <div>
      <p>{weapon.id}</p>
      <h1>{weapon.name}</h1>
      <p>{weapon.slug}</p>
      <p>{weapon.type}</p>
      <p>{weapon.hp}</p>
      <p>{weapon.mp}</p>
      <p>{weapon.atk}</p>
      <p>{weapon.matk}</p>
      <p>{weapon.def}</p>
      <p>{weapon.mdef}</p>
      <p>{weapon.crit}</p>
      <p>{weapon.spd}</p>
      <p>{weapon.effect_1}</p>
      <p>{weapon.effect_2}</p>
      <p>{weapon.image}</p>
      <p>{weapon.image2}</p>
      <p>{weapon.created_at}</p>


      <div>
        <Image
          src={weapon.image}
          alt={weapon.name}
          width={325}
          height={125}
          className="weapon-image"
        />
        <p>{weapon.created_at}</p>
      </div>
    </div>
  );
}
