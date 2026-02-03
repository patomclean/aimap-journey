"use client";

import { useState, ReactElement } from "react";
import { ItineraryEvent, EventOption, Currency } from "@/types";

interface EventCardProps {
  event: ItineraryEvent;
  onSelectOption: (eventId: string, optionId: string) => void;
  onAddCustomOption: (eventId: string, customText: string) => void;
  onRemoveEvent: (eventId: string) => void;
}

const eventIcons: Record<string, ReactElement> = {
  flight: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
  ),
  hotel_checkin: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  hotel_checkout: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  meal: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  activity: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  custom: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
};

const eventColors: Record<string, string> = {
  flight: "bg-blue-50 border-blue-200 text-blue-700",
  hotel_checkin: "bg-purple-50 border-purple-200 text-purple-700",
  hotel_checkout: "bg-purple-50 border-purple-200 text-purple-700",
  meal: "bg-orange-50 border-orange-200 text-orange-700",
  activity: "bg-green-50 border-green-200 text-green-700",
  custom: "bg-yellow-50 border-yellow-200 text-yellow-700",
};

export default function EventCard({
  event,
  onSelectOption,
  onAddCustomOption,
  onRemoveEvent,
}: EventCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [customInput, setCustomInput] = useState("");

  const handleAddCustom = () => {
    if (customInput.trim()) {
      onAddCustomOption(event.id, customInput.trim());
      setCustomInput("");
    }
  };

  const renderStars = (count: number) => {
    return Array.from({ length: count }).map((_, i) => (
      <span key={i} className="text-yellow-400">★</span>
    ));
  };

  const formatPrice = (price: number, currency: Currency) => {
    return `$${price.toLocaleString()} ${currency}`;
  };

  return (
    <div className="relative">
      {/* Main Event Card */}
      <div
        className={`bg-white rounded-xl shadow-sm border overflow-hidden transition-all ${
          isExpanded ? "ring-2 ring-[#0EA5E9]" : ""
        }`}
      >
        {/* Event Header */}
        <div
          className="p-4 cursor-pointer"
          onClick={() => event.options && event.options.length > 0 && setIsExpanded(!isExpanded)}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              {/* Time badge */}
              <div className="flex-shrink-0 px-3 py-1 bg-[#1E3A5F] text-white text-sm font-medium rounded-lg">
                {event.time}
              </div>

              {/* Event info */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`p-1.5 rounded-lg ${eventColors[event.type]}`}
                  >
                    {eventIcons[event.type]}
                  </span>
                  <h3 className="font-semibold text-[#1E3A5F]">{event.title}</h3>
                </div>
                <p className="text-sm text-[#6B7280] mt-1 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {event.location}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {event.isRemovable && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveEvent(event.id);
                  }}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              {event.options && event.options.length > 0 && (
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Expanded Options */}
        {isExpanded && event.options && event.options.length > 0 && (
          <div className="border-t border-gray-100 p-4 bg-[#F8FAFC]">
            <p className="text-sm text-[#6B7280] mb-4">
              Aqui tienes algunas recomendaciones. Podes agregar tu propia opcion sin descartar estas sugerencias.
            </p>

            {/* Options Grid */}
            <div className="space-y-3">
              {event.options.map((option) => (
                <div
                  key={option.id}
                  className={`bg-white rounded-lg border p-4 transition-all ${
                    event.selectedOptionId === option.id
                      ? "border-[#22C55E] ring-2 ring-[#22C55E]/20"
                      : "border-gray-200 hover:border-[#0EA5E9]"
                  }`}
                >
                  <div className="flex gap-4">
                    {/* Option Image */}
                    {option.image && (
                      <div className="flex-shrink-0 w-24 h-24 rounded-lg bg-gray-100 overflow-hidden">
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${option.image})` }}
                        />
                      </div>
                    )}

                    {/* Option Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-medium text-[#1E3A5F]">
                            {option.name}
                          </h4>
                          {option.description && (
                            <p className="text-sm text-[#6B7280] mt-0.5">
                              {option.description}
                            </p>
                          )}
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="font-bold text-[#1E3A5F]">
                            {formatPrice(option.price, option.currency)}
                          </div>
                          {option.priceRange && (
                            <div className="text-xs text-[#6B7280]">
                              {option.priceRange}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Rating */}
                      {option.rating && (
                        <div className="flex items-center gap-1 mt-2 text-sm">
                          <span className="text-yellow-400">★</span>
                          <span className="text-[#1E3A5F] font-medium">
                            {option.rating}
                          </span>
                        </div>
                      )}

                      {/* Details */}
                      {option.details && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {Object.entries(option.details).map(([key, value]) => (
                            <span
                              key={key}
                              className="text-xs px-2 py-1 bg-gray-100 text-[#6B7280] rounded"
                            >
                              {value}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Action Button */}
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          onClick={() => onSelectOption(event.id, option.id)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            event.selectedOptionId === option.id
                              ? "bg-[#22C55E] text-white"
                              : "bg-[#3B82F6] hover:bg-[#2563EB] text-white"
                          }`}
                        >
                          {event.selectedOptionId === option.id ? (
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Seleccionado
                            </span>
                          ) : (
                            "Seleccionar"
                          )}
                        </button>
                        {option.affiliateUrl && (
                          <a
                            href={option.affiliateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 border border-[#0EA5E9] text-[#0EA5E9] rounded-lg text-sm font-medium hover:bg-[#0EA5E9]/10 transition-colors flex items-center gap-1"
                          >
                            {option.affiliateName || "Ver mas"}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Option Input */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-[#6B7280] mb-2">
                O agrega tu propia opcion
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder={
                    event.type === "flight" || event.type.includes("hotel")
                      ? "Introducir URL de opcion propia"
                      : "Escribe aqui tu plan personalizado..."
                  }
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent"
                />
                <button
                  onClick={handleAddCustom}
                  className="px-4 py-2 bg-[#1E3A5F] text-white rounded-lg hover:bg-[#152a45] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Travel Time Indicator */}
      {event.travelTime && (
        <div className="flex items-center gap-2 ml-6 my-2 text-sm text-[#6B7280]">
          <div className="w-px h-4 bg-gray-300" />
          <span className="flex items-center gap-1">
            {event.travelTime.mode === "walking" ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            )}
            {event.travelTime.minutes} minutos
          </span>
        </div>
      )}
    </div>
  );
}
