"use client";

import { SpecialEvent, Currency } from "@/types";

interface SpecialEventsCardProps {
  events: SpecialEvent[];
}

const eventTypeIcons: Record<string, string> = {
  music: "🎵",
  art: "🎨",
  sports: "🎾",
  festival: "🎪",
  theater: "🎭",
  other: "🎫",
};

export default function SpecialEventsCard({ events }: SpecialEventsCardProps) {
  if (!events || events.length === 0) return null;

  const formatPrice = (price: number, currency: Currency) => {
    return `$${price.toLocaleString()} ${currency}`;
  };

  return (
    <div className="bg-[#FEF3C7] rounded-xl border border-[#F59E0B]/30 p-5 mt-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🎫</span>
        <div>
          <h3 className="font-semibold text-[#92400E]">
            Eventos especiales para este dia
          </h3>
          <p className="text-sm text-[#A16207]">
            Basado en tus intereses, encontramos estos eventos disponibles
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg p-4 border border-[#F59E0B]/20"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{eventTypeIcons[event.type]}</span>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-[#1E3A5F] truncate">
                  {event.name}
                </h4>
                <div className="mt-2 space-y-1 text-sm text-[#6B7280]">
                  <p className="flex items-center gap-1">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Hoy, {event.time}</span>
                  </p>
                  <p className="flex items-center gap-1">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span className="truncate">{event.location}</span>
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-bold text-[#1E3A5F]">
                    {formatPrice(event.price, event.currency)}
                  </span>
                  {event.ticketUrl && (
                    <a
                      href={event.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-[#F97316] text-white text-sm font-medium rounded-lg hover:bg-[#EA580C] transition-colors flex items-center gap-1"
                    >
                      Ver entradas
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
    </div>
  );
}
