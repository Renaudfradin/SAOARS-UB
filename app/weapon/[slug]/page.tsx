import React from 'react';
import '../weapon.css';

export default async function Weapon({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div>
      <h1>Weapon {slug}</h1>
    </div>
  );
}
