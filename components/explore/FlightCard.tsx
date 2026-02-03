"use client";

interface FlightCardProps {
  destination: string;
  price: number;
  currency: string;
  tripType: string;
  stops: string;
  duration: string;
  image: string;
  onClick: () => void;
}

export default function FlightCard({
  destination,
  price,
  currency,
  tripType,
  stops,
  duration,
  image,
  onClick,
}: FlightCardProps) {
  const formatPrice = (value: number) => {
    return value.toLocaleString("es-AR");
  };

  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group text-left w-full"
    >
      {/* Image */}
      <div className="relative h-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <h3 className="text-white font-semibold">{destination}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-[#6B7280]">{tripType}</span>
          <span className="text-lg font-bold text-[#1E3A5F]">
            ${formatPrice(price)} <span className="text-sm font-normal">{currency}</span>
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-[#6B7280]">
          <span className="flex items-center gap-1">
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
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
            {stops}
          </span>
          <span className="flex items-center gap-1">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {duration}
          </span>
        </div>
      </div>
    </button>
  );
}
