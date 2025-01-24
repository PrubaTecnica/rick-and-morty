"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Character, EpisodeDetails } from "../../../interfaces/types";

const CharacterDetails = () => {
  const { id } = useParams();
  const router = useRouter();

  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [episodes, setEpisodes] = useState<string[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState<string>("");
  const [episodeDetails, setEpisodeDetails] = useState<EpisodeDetails | null>(
    null
  );

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        if (!response.ok) {
          throw new Error("No se pudo obtener el personaje");
        }
        const data = await response.json();
        setCharacter(data);
        setEpisodes(data.episode); // Almacenar los episodios en el estado
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  const handleEpisodeChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const episodeUrl = event.target.value;
    setSelectedEpisode(episodeUrl);

    try {
      const response = await fetch(episodeUrl);
      if (!response.ok) {
        throw new Error("No se pudo obtener el episodio");
      }
      const episodeData = await response.json();
      setEpisodeDetails(episodeData);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const handleBack = () => {
    router.push("/"); // Redirige al inicio o a una página previa
  };

  if (loading) {
    return <p className="text-white text-center text-lg">Cargando...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center text-lg">{error}</p>;
  }

  if (!character) {
    return (
      <p className="text-red-500 text-center text-lg">
        No se encontró el personaje.
      </p>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-r from-blue-900 via-purple-900 to-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Imagen de portada */}
        <div
          className="w-full h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${character.image})` }}
        ></div>

        {/* Contenedor de la información del perfil */}
        <div className="p-8 relative">
          {/* Avatar */}
          <div className="absolute -top-24 left-1/2 transform -translate-x-1/2">
            <img
              src={character.image}
              alt={character.name}
              className="w-32 h-32 object-cover rounded-full border-4 border-white"
            />
          </div>

          {/* Nombre y detalles del personaje */}
          <div className="text-center mt-16">
            <h1 className="text-4xl font-extrabold text-gray-800">
              {character.name}
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              {character.species} - {character.gender}
            </p>

            <div className="mt-6">
              <p className="text-gray-700">
                <span className="font-semibold">Status:</span>{" "}
                {character.status}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Origin:</span>{" "}
                {character.origin.name}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Location:</span>{" "}
                {character.location.name}
              </p>

              <div className="mt-4">
                <span className="font-semibold text-gray-700">
                  Select Episode:
                </span>
                <select
  value={selectedEpisode}
  onChange={handleEpisodeChange}
  className="mt-2 p-2 w-full rounded border border-gray-300 bg-gray-800 text-white focus:ring focus:ring-purple-500 focus:outline-none transition duration-300"
>
  <option value="" className="bg-gray-700 text-white">
    Selecciona un episodio
  </option>
  {episodes.map((episodeUrl, index) => (
    <option
      key={index}
      value={episodeUrl}
      className="bg-gray-700 text-white hover:bg-purple-500"
    >
      Episodio {index + 1}
    </option>
  ))}
</select>

                {episodeDetails && (
                  <div className="mt-6 p-4 border rounded-lg bg-blue-50 shadow">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Detalles del Episodio
                    </h2>
                    <p className="text-gray-700 mt-2">
                      <span className="font-semibold">Nombre:</span>{" "}
                      {episodeDetails.name}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Código:</span>{" "}
                      {episodeDetails.episode}
                    </p>
                  </div>
                )}
              </div>

              <p className="text-gray-700 mt-4">
                <span className="font-semibold">Created At:</span>{" "}
                {new Date(character.created).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Botón de Regresar */}
        <div className="text-center mb-8">
          <button
            onClick={handleBack}
            className="bg-blue-500 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300"
          >
            Regresar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
