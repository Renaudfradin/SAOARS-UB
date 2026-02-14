import React from 'react';
import Image from 'next/image';
import { callApi } from '@/utils/api';
import '../equipment.css';

type EquipmentData = {
  id: string;
  name: string;
  slug: string;
  image: string;
  created_at: string;
  type: string;
  type_equipment: string;
  hp: string;
  mp: string;
  atk: string;
  matk: string;
  def: string;
  mdef: string;
  crit: string;
  spd: string;
  effect_1: string;
  effect_2: string;
  image2: string;
  start: string;
};

export default async function Equipment({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let equipment: EquipmentData | null = null;
  try {
    const response: EquipmentData | { data: EquipmentData } = await callApi(
      `/api/equipment/${slug}`,
    );
    if ('data' in response) {
      equipment = response.data;
    } else {
      equipment = response;
    }
  } catch (e) {
    console.error(e);
    equipment = null;
  }

  if (!equipment) {
    return <div>equipment non trouvée</div>;
  }

  return (
    <div>
      <p>{equipment.id}</p>
      <h1>{equipment.name}</h1>
      <p>{equipment.slug}</p>
      <p>{equipment.type}</p>
      <p>{equipment.type_equipment}</p>
      <p>{equipment.hp}</p>
      <p>{equipment.mp}</p>
      <p>{equipment.atk}</p>
      <p>{equipment.matk}</p>
      <p>{equipment.def}</p>
      <p>{equipment.mdef}</p>
      <p>{equipment.crit}</p>
      <p>{equipment.spd}</p>
      <p>{equipment.effect_1}</p>
      <p>{equipment.effect_2}</p>
      <p>{equipment.image}</p>
      <p>{equipment.image2}</p>
      <p>{equipment.start}</p>
      <p>{equipment.created_at}</p>


      <div>
        <Image
          src={equipment.image}
          alt={equipment.name}
          width={325}
          height={125}
          className="equipment-image"
        />
        <p>{equipment.created_at}</p>
      </div>
    </div>
  );
}