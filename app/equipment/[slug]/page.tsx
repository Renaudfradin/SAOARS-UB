import React from 'react';
import '../equipment.css';

export default async function Equipment({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div>
      <h1>Equipment {slug}</h1>
    </div>
  );
}
