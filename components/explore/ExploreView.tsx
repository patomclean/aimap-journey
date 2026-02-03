"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";
import ContinentCarousel from "./ContinentCarousel";
import FlightCard from "./FlightCard";
import DestinationCard from "./DestinationCard";

// Mock data for flights
const cheapFlights = [
  {
    id: "1",
    destination: "Buenos Aires",
    price: 172676,
    currency: "ARS",
    tripType: "Ida y vuelta",
    stops: "Directo",
    duration: "2h 15m",
    image: "https://source.unsplash.com/400x300/?buenosaires,obelisco",
  },
  {
    id: "2",
    destination: "Neuquen",
    price: 235660,
    currency: "ARS",
    tripType: "Ida y vuelta",
    stops: "1 escala",
    duration: "3h 45m",
    image: "https://source.unsplash.com/400x300/?neuquen,patagonia",
  },
  {
    id: "3",
    destination: "Cordoba",
    price: 272552,
    currency: "ARS",
    tripType: "Ida y vuelta",
    stops: "Directo",
    duration: "1h 30m",
    image: "https://source.unsplash.com/400x300/?cordoba,argentina",
  },
  {
    id: "4",
    destination: "Tucuman",
    price: 345928,
    currency: "ARS",
    tripType: "Ida y vuelta",
    stops: "1 escala",
    duration: "4h 10m",
    image: "https://source.unsplash.com/400x300/?tucuman,mountains",
  },
];

// Mock data for international destinations
const internationalDestinations = [
  {
    id: "1",
    country: "Espana",
    price: 156789,
    currency: "ARS",
    image: "https://source.unsplash.com/400x300/?spain,barcelona",
    hasItinerary: true,
    travelers: 2340,
  },
  {
    id: "2",
    country: "Francia",
    price: 189345,
    currency: "ARS",
    image: "https://source.unsplash.com/400x300/?france,paris,eiffel",
    hasItinerary: true,
    travelers: 1890,
  },
  {
    id: "3",
    country: "Emiratos Arabes",
    price: 234567,
    currency: "ARS",
    image: "https://source.unsplash.com/400x300/?dubai,uae",
    hasItinerary: false,
    travelers: 456,
  },
  {
    id: "4",
    country: "Estados Unidos",
    price: 198234,
    currency: "ARS",
    image: "https://source.unsplash.com/400x300/?newyork,manhattan",
    hasItinerary: true,
    travelers: 3120,
  },
  {
    id: "5",
    country: "Italia",
    price: 145678,
    currency: "ARS",
    image: "https://source.unsplash.com/400x300/?italy,rome,colosseum",
    hasItinerary: true,
    travelers: 2780,
  },
  {
    id: "6",
    country: "Japon",
    price: 267890,
    currency: "ARS",
    image: "https://source.unsplash.com/400x300/?japan,tokyo,temple",
    hasItinerary: false,
    travelers: 890,
  },
];

// Mock data for recommended itineraries
const recommendedItineraries = [
  {
    id: "1",
    title: "Escapada romantica a Paris",
    destination: "Paris, Francia",
    duration: 5,
    price: 189345,
    currency: "ARS",
    image: "https://source.unsplash.com/400x300/?paris,romantic,eiffel",
    rating: 4.9,
    reviews: 156,
    tags: ["Romantico", "Cultura", "Gastronomia"],
  },
  {
    id: "2",
    title: "Aventura en la Patagonia",
    destination: "Bariloche, Argentina",
    duration: 7,
    price: 285000,
    currency: "ARS",
    image: "https://source.unsplash.com/400x300/?patagonia,mountains,lake",
    rating: 4.8,
    reviews: 234,
    tags: ["Aventura", "Naturaleza", "Trekking"],
  },
  {
    id: "3",
    title: "Tokyo para principiantes",
    destination: "Tokyo, Japon",
    duration: 10,
    price: 456000,
    currency: "ARS",
    image: "https://source.unsplash.com/400x300/?tokyo,japan,city",
    rating: 4.7,
    reviews: 89,
    tags: ["Cultura", "Gastronomia", "Tecnologia"],
  },
];

// Filter tabs
const filterTabs = [
  { id: "cheap", label: "Un mundo mas barato" },
  { id: "direct", label: "Vuelos directos" },
  { id: "suggestions", label: "Sugerencias para vos" },
  { id: "interesting", label: "Destinos interesantes" },
  { id: "beach", label: "Playa" },
  { id: "culture", label: "Arte y cultura" },
];

export default function ExploreView() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("cheap");
  const [selectedMonth] = useState("febrero");

  const handleSearch = (params: {
    destination: string;
    location: string;
    month: string;
    travelers: number;
  }) => {
    // Navigate to trip form with pre-filled data
    const queryParams = new URLSearchParams();
    if (params.destination) queryParams.set("destination", params.destination);
    if (params.location) queryParams.set("location", params.location);
    if (params.month) queryParams.set("month", params.month);
    queryParams.set("travelers", params.travelers.toString());

    router.push(`/trip-form?${queryParams.toString()}`);
  };

  const handleContinentSelect = (continentId: string) => {
    router.push(`/trip-form?region=${continentId}`);
  };

  const handleFlightClick = (flightId: string) => {
    // In production, this would redirect to affiliate link
    console.log("Flight clicked:", flightId);
  };

  const handleDestinationClick = (destinationId: string) => {
    router.push(`/trip-form?destination=${destinationId}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-10">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Continent Carousel */}
        <div className="mb-10">
          <ContinentCarousel onSelect={handleContinentSelect} />
        </div>

        {/* Cheap Flights Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-[#1E3A5F]">
                Los vuelos mas baratos
              </h2>
              <p className="text-sm text-[#6B7280]">
                Encontramos las tarifas mas bajas para tus fechas.
              </p>
            </div>
            <button className="text-[#0EA5E9] hover:text-[#0284C7] font-medium text-sm flex items-center gap-1">
              Mostrar todo
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cheapFlights.map((flight) => (
              <FlightCard
                key={flight.id}
                destination={flight.destination}
                price={flight.price}
                currency={flight.currency}
                tripType={flight.tripType}
                stops={flight.stops}
                duration={flight.duration}
                image={flight.image}
                onClick={() => handleFlightClick(flight.id)}
              />
            ))}
          </div>
        </div>

        {/* International Destinations Section */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-[#1E3A5F] mb-4">
            Busca cualquier lugar en {selectedMonth}
          </h2>

          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === tab.id
                    ? "bg-[#1E3A5F] text-white"
                    : "bg-white text-[#6B7280] hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {internationalDestinations.map((dest) => (
              <DestinationCard
                key={dest.id}
                country={dest.country}
                price={dest.price}
                currency={dest.currency}
                image={dest.image}
                hasItinerary={dest.hasItinerary}
                travelers={dest.travelers}
                onClick={() => handleDestinationClick(dest.id)}
              />
            ))}
          </div>

          {/* Show More Button */}
          <div className="text-center mt-8">
            <button className="px-8 py-3 bg-white border-2 border-[#1E3A5F] text-[#1E3A5F] font-medium rounded-full hover:bg-[#1E3A5F] hover:text-white transition-colors">
              Ver mas destinos
            </button>
          </div>
        </div>

        {/* Recommended Itineraries Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-[#1E3A5F]">
                Itinerarios recomendados para vos
              </h2>
              <p className="text-sm text-[#6B7280]">
                Basados en las preferencias de viajeros similares
              </p>
            </div>
            <button className="text-[#0EA5E9] hover:text-[#0284C7] font-medium text-sm flex items-center gap-1">
              Ver todos
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedItineraries.map((itinerary) => (
              <button
                key={itinerary.id}
                onClick={() => router.push(`/itinerario/${itinerary.id}`)}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group text-left"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundImage: `url(${itinerary.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2 py-1 bg-[#F97316] text-white text-xs font-medium rounded-full">
                      {itinerary.duration} dias
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white font-semibold text-lg line-clamp-1">
                      {itinerary.title}
                    </h3>
                    <p className="text-white/80 text-sm">{itinerary.destination}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {itinerary.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-[#F8FAFC] text-[#6B7280] text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Rating and Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-medium text-[#1E3A5F]">
                        {itinerary.rating}
                      </span>
                      <span className="text-xs text-[#6B7280]">
                        ({itinerary.reviews} reviews)
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-[#6B7280]">Desde</span>
                      <p className="text-lg font-bold text-[#1E3A5F]">
                        ${itinerary.price.toLocaleString("es-AR")}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Inspiration Section */}
        <div className="bg-gradient-to-r from-[#1E3A5F] to-[#0EA5E9] rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            No sabes a donde ir?
          </h2>
          <p className="text-white/80 mb-6 max-w-md mx-auto">
            Contanos tus preferencias y dejanos que nuestra IA te sugiera el
            destino perfecto para vos.
          </p>
          <button
            onClick={() => router.push("/trip-form")}
            className="px-8 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white font-medium rounded-full transition-colors inline-flex items-center gap-2"
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
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Descubrir con IA
          </button>
        </div>
      </div>
    </div>
  );
}
