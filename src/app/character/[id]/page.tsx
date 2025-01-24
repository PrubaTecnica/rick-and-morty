"use client";

import React from 'react';
import { useParams } from 'next/navigation';

const CharacterDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Detalles del Personaje</h1>
      <p>{id}</p>
    </div>
  );
};

export default CharacterDetails;