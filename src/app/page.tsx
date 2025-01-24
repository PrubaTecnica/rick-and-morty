"use client";

import React, { useEffect, useState } from "react";
import CharacterCard from '../components/CharacterCard';
import { Character } from "../interfaces/types";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Home = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [status, setStatus] = useState<string>("");
  const [species, setSpecies] = useState<string>("");
  const [origin, setOrigin] = useState<string>("");
  const [originData, setOriginData] = useState<{ [key: string]: number }>({});
  const [showChart, setShowChart] = useState<boolean>(false); 

  const fetchCharacters = async (status?: string, species?: string, origin?: string) => {
    let url = "https://rickandmortyapi.com/api/character?";
    if (status) url += `status=${status}&`;
    if (species) url += `species=${species}&`;

    const response = await fetch(url);
    const data = await response.json();

    if (origin) {
      const filteredCharacters = data.results?.filter(
        (character: Character) =>
          character.origin.name.toLowerCase() === origin.toLowerCase()
      );
      setCharacters(filteredCharacters || []);
    } else {
      setCharacters(data.results || []);
    }

    const originCounts: { [key: string]: number } = {};
    data.results?.forEach((character: Character) => {
      const originName = character.origin.name;
      originCounts[originName] = (originCounts[originName] || 0) + 1;
    });
    setOriginData(originCounts);
  };

  useEffect(() => {
    fetchCharacters(status, species, origin);
  }, [status, species, origin]);

  const chartData = {
    labels: Object.keys(originData),
    datasets: [
      {
        label: 'Number of Characters',
        data: Object.values(originData),
        backgroundColor: "#4BC0C0",
        borderColor: "#36A2EB",
        borderWidth: 1,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: "'Roboto', sans-serif",
            weight: 'bold',
          },
          color: '#fff',
        },
      },
      title: {
        display: true,
        text: 'Characters by Origin',
        font: {
          size: 20,
          family: "'Roboto', sans-serif",
          weight: 'bold',
        },
        color: '#fff',
        padding: { top: 20, bottom: 30 },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Origin',
          font: {
            size: 16,
            family: "'Roboto', sans-serif",
            weight: 'bold',
          },
          color: '#fff',
        },
        ticks: {
          font: {
            size: 12,
            family: "'Roboto', sans-serif",
          },
          color: '#ccc',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Characters',
          font: {
            size: 16,
            family: "'Roboto', sans-serif",
            weight: 'bold',
          },
          color: '#fff',
        },
        ticks: {
          font: {
            size: 12,
            family: "'Roboto', sans-serif",
          },
          color: '#ccc',
          beginAtZero: true,
        },
      },
    },
    layout: {
      padding: { left: 20, right: 20, top: 20, bottom: 20 },
    },
  };
  
  return (
    <div className="p-6 bg-gradient-to-r from-blue-900 via-purple-900 to-gray-900 min-h-screen">
      <h1 className="text-5xl font-extrabold text-center mb-10 text-white drop-shadow-lg">
        Rick and Morty Characters
      </h1>

      {/* Filters Section */}
      <div className="mb-8 flex flex-wrap justify-center gap-4">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white focus:ring focus:ring-purple-500"
        >
          <option value="">All Status</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>

        <select
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white focus:ring focus:ring-purple-500"
        >
          <option value="">All Species</option>
          <option value="human">Human</option>
          <option value="alien">Alien</option>
          <option value="robot">Robot</option>
        </select>

        <select
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white focus:ring focus:ring-purple-500"
        >
          <option value="">All Origins</option>
          <option value="Earth (C-137)">Earth (C-137)</option>
          <option value="Earth (Replacement)">Earth (Replacement)</option>
          <option value="Abadango">Abadango</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      {/* Chart Section */}
      <div className="mb-10 text-center">
        <button
          onClick={() => setShowChart(!showChart)}
          className="p-3 rounded bg-purple-700 text-white font-bold hover:bg-purple-800"
        >
          {showChart ? "Hide Chart" : "Show Chart"}
        </button>
        {showChart && (
          <div className="mt-6 w-full max-w-4xl mx-auto h-[400px]">
            <Bar data={chartData} options={options} />
          </div>
        )}
      </div>

      {/* Characters Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
};

export default Home;
