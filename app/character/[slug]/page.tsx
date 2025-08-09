import React from 'react';
import '../character.css';

export default async function Character({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div>
      <h1>Character {slug}</h1>
    </div>
  );
}
