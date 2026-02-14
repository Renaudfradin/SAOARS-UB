import React from "react";
import Image from 'next/image';
import Link from 'next/link';
import { callApi } from '@/utils/api';
import { CharacterData } from '@/types';

type StatsData = {
  Character: number;
  Weapon: number;
  Attack: number;
  Banner: number;
  Equipment: number;
  Imagination: number;
  Ability: number;
};

export default async function Home() {
  let randomCharacter: CharacterData | null = null;
  let stats: StatsData | null = null;

  // Appel pour le personnage aléatoire
  try {
    const response: CharacterData | { data: CharacterData } = await callApi(
      '/api/character/random',
    );
    if ('data' in response) {
      randomCharacter = response.data;
    } else {
      randomCharacter = response;
    }
  } catch (e) {
    console.error(e);
    randomCharacter = null;
  }

  // Appel pour les statistiques
  try {
    const response: StatsData | { data: StatsData } = await callApi(
      '/api/stats',
    );
    if ('data' in response) {
      stats = response.data;
    } else {
      stats = response;
    }
  } catch (e) {
    console.error(e);
    stats = null;
  }

  return (
    <div>
      <h1>Home</h1>
      
      {stats && (
        <div>
          <h2>Statistiques de la base de données</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', margin: '20px 0' }}>
            <div>
              <h3>Personnages</h3>
              <p>{stats.Character}</p>
            </div>
            <div>
              <h3>Bannières</h3>
              <p>{stats.Banner}</p>
            </div>
            <div>
              <h3>Armes</h3>
              <p>{stats.Weapon}</p>
            </div>
            <div>
              <h3>Équipements</h3>
              <p>{stats.Equipment}</p>
            </div>
          </div>
        </div>
      )}
      
      {randomCharacter && (
        <div>
          <h2>Personnage du jour</h2>
          <Link href={`/character/${randomCharacter.slug}`}>
            <div>
              {randomCharacter.image && (
                <Image
                  src={randomCharacter.image}
                  alt={randomCharacter.name}
                  width={200}
                  height={200}
                />
              )}
              <h3>{randomCharacter.name}</h3>
              {randomCharacter.element && (
                <p>Élément: {randomCharacter.element}</p>
              )}
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
