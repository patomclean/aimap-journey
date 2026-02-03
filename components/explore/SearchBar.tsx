"use client";

import { useState } from "react";

interface SearchBarProps {
  onSearch: (params: SearchParams) => void;
}

interface SearchParams {
  destination: string;
  location: string;
  month: string;
  travelers: number;
}

const months = [
  { value: "", label: "Cualquier mes" },
  { value: "2025-01", label: "Enero 2025" },
  { value: "2025-02", label: "Febrero 2025" },
  { value: "2025-03", label: "Marzo 2025" },
  { value: "2025-04", label: "Abril 2025" },
  { value: "2025-05", label: "Mayo 2025" },
  { value: "2025-06", label: "Junio 2025" },
  { value: "2025-07", label: "Julio 2025" },
  { value: "2025-08", label: "Agosto 2025" },
  { value: "2025-09", label: "Septiembre 2025" },
  { value: "2025-10", label: "Octubre 2025" },
  { value: "2025-11", label: "Noviembre 2025" },
  { value: "2025-12", label: "Diciembre 2025" },
];

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [destination, setDestination] = useState("");
  const [location, setLocation] = useState("");
  const [month, setMonth] = useState("");
  const [travelers, setTravelers] = useState(1);

  const handleSearch = () => {
    onSearch({ destination, location, month, travelers });
  };

  return (
    <div className="bg-gradient-to-r from-[#1E3A5F] to-[#0EA5E9] rounded-2xl p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Destination Input */}
        <div className="lg:col-span-2">
          <label className="block text-white/80 text-sm mb-2">Destino</label>
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Busca destinos"
              className="w-full pl-10 pr-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F97316]"
            />
          </div>
        </div>

        {/* Location Select */}
        <div>
          <label className="block text-white/80 text-sm mb-2">Ubicacion</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F97316] appearance-none cursor-pointer"
          >
            <option value="">Cualquier lugar</option>
            <option value="south-america">America del Sur</option>
            <option value="north-america">America del Norte</option>
            <option value="europe">Europa</option>
            <option value="asia">Asia</option>
            <option value="africa">Africa</option>
            <option value="oceania">Oceania</option>
          </select>
        </div>

        {/* Month Select */}
        <div>
          <label className="block text-white/80 text-sm mb-2">Fecha</label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F97316] appearance-none cursor-pointer"
          >
            {months.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        {/* Travelers */}
        <div>
          <label className="block text-white/80 text-sm mb-2">Viajeros</label>
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <select
              value={travelers}
              onChange={(e) => setTravelers(parseInt(e.target.value))}
              className="w-full pl-10 pr-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F97316] appearance-none cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "Adulto" : "Adultos"}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Search Button */}
      <div className="mt-4 flex justify-center lg:justify-end">
        <button
          onClick={handleSearch}
          className="w-full lg:w-auto px-8 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Buscar destinos
        </button>
      </div>
    </div>
  );
}
