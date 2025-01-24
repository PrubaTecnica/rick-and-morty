  "use client";

  import React, { useEffect, useState } from 'react';
  import Link from 'next/link';
  import { Character } from '../interfaces/types';

  const Home = () => {
    const [characters, setCharacters] = useState<Character[]>([]);

    useEffect(() => {
      const fetchCharacters = async () => {
        const response = await fetch('https://rickandmortyapi.com/api/character');
        const data = await response.json();
        setCharacters(data.results);
      };

      fetchCharacters();
    }, []);

    return (
      <div className="p-6 bg-gradient-to-r from-blue-900 via-purple-900 to-gray-900 min-h-screen">
        <h1 className="text-5xl font-extrabold text-center mb-10 text-white drop-shadow-lg">
          Rick and Morty Characters
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {characters.map((character) => (
            <div
              key={character.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl"
            >
          <img
    src={character.image}
    alt={character.name}
    className="w-full h-56 object-contain bg-gray-100"
  />
              <div className="p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{character.name}</h2>
                <p className="text-gray-600">
                  <span className="font-semibold">Status:</span> {character.status}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Species:</span> {character.species}
                </p>
                
                <Link href={`/character/${character.id}`}>
                  <button className="mt-4 w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-4 rounded-xl hover:from-green-500 hover:to-blue-600 transition duration-300">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default Home;