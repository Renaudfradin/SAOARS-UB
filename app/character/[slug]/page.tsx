import React from 'react';
import '../character.css';

export default function Character({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Character {params.slug}</h1>
    </div>
  );
}
