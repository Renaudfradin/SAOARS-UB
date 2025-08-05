import React from 'react';
import '../equipment.css';

export default function Equipment({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Equipment {params.slug}</h1>
    </div>
  );
}
