"use client";

import { useState, useRef } from "react";

interface Continent {
  id: string;
  name: string;
  image: string;
}

const continents: Continent[] = [
  {
    id: "south-america",
    name: "America del Sur",
    image: "https://source.unsplash.com/400x300/?patagonia,mountains",
  },
  {
    id: "europe",
    name: "Europa",
    image: "https://source.unsplash.com/400x300/?paris,europe",
  },
  {
    id: "north-america",
    name: "America del Norte",
    image: "https://source.unsplash.com/400x300/?newyork,usa",
  },
  {
    id: "asia",
    name: "Asia",
    image: "https://source.unsplash.com/400x300/?tokyo,japan",
  },
  {
    id: "africa",
    name: "Africa",
    image: "https://source.unsplash.com/400x300/?safari,africa",
  },
  {
    id: "oceania",
    name: "Oceania",
    image: "https://source.unsplash.com/400x300/?sydney,australia",
  },
];

interface ContinentCarouselProps {
  onSelect: (continentId: string) => void;
}

export default function ContinentCarousel({ onSelect }: ContinentCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="relative">
      <h2 className="text-xl font-bold text-[#1E3A5F] mb-4">
        Busca en todo el mundo
      </h2>

      <div className="relative group">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-[#1E3A5F] hover:bg-gray-50 transition-colors -ml-5"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-[#1E3A5F] hover:bg-gray-50 transition-colors -mr-5"
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}

        {/* Carousel */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide scroll-smooth"
        >
          {continents.map((continent) => (
            <button
              key={continent.id}
              onClick={() => onSelect(continent.id)}
              className="flex-shrink-0 relative w-64 h-40 rounded-xl overflow-hidden group/card"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover/card:scale-110"
                style={{ backgroundImage: `url(${continent.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-semibold text-lg">
                  {continent.name}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
