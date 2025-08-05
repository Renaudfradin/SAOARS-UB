import React from 'react';
import '../weapon.css';

export default function Weapon({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Weapon {params.slug}</h1>
    </div>
  );
}
