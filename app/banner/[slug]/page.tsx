import React from 'react';
import '../banner.css';

export default function Banner({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Banner {params.slug}</h1>
    </div>
  );
}
