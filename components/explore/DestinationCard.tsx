"use client";

interface DestinationCardProps {
  country: string;
  price: number;
  currency: string;
  image: string;
  hasItinerary?: boolean;
  travelers?: number;
  onClick: () => void;
}

export default function DestinationCard({
  country,
  price,
  currency,
  image,
  hasItinerary = false,
  travelers,
  onClick,
}: DestinationCardProps) {
  const formatPrice = (value: number) => {
    return value.toLocaleString("es-AR");
  };

  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group text-left w-full"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Itinerary Badge */}
        {hasItinerary && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 bg-[#22C55E] text-white text-xs font-medium rounded-full flex items-center gap-1">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Itinerario listo
            </span>
          </div>
        )}

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-semibold text-lg mb-1">{country}</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-white/80 text-sm">Desde</span>
              <span className="text-white font-bold">
                ${formatPrice(price)} {currency}
              </span>
            </div>
            {travelers && travelers > 0 && (
              <div className="flex items-center gap-1 text-white/80 text-xs">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                {travelers.toLocaleString("es-AR")}+ viajaron
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
