import React from 'react';
import Link from 'next/link';
import { Character } from '../interfaces/types';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl">
      <img
        src={character.image}
        alt={character.name}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{character.name}</h2>
        <p className="text-gray-600">
          <span className="font-semibold">Status:</span> {character.status}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Species:</span> {character.species}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Gender:</span> {character.gender}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Origin:</span> {character.origin.name}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Location:</span> {character.location.name}
        </p>
        <Link href={`/character/${character.id}`}>
          <button className="mt-4 w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-4 rounded-xl hover:from-green-500 hover:to-blue-600 transition duration-300">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CharacterCard;