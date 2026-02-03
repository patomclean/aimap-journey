"use client";

import Link from "next/link";
import { Trip, Currency } from "@/types";

interface TripCardProps {
  trip: Trip;
  onDelete: (id: string) => void;
}

const statusLabels: Record<string, { label: string; color: string }> = {
  draft: { label: "Borrador", color: "bg-gray-100 text-gray-600" },
  generating: { label: "Generando", color: "bg-yellow-100 text-yellow-700" },
  completed: { label: "Completado", color: "bg-[#0EA5E9]/10 text-[#0EA5E9]" },
};

export default function TripCard({ trip, onDelete }: TripCardProps) {
  const formData = trip.form_data;
  const destination = formData.destinations[0]?.name || "Sin destino";

  const calculateDays = () => {
    if (!formData.startDate || !formData.endDate) return null;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("es-AR", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  };

  const formatBudget = (min: number | null, max: number | null, currency: Currency) => {
    if (min === null && max === null) return "Sin definir";
    const minStr = min !== null ? `$${min.toLocaleString()}` : "$0";
    const maxStr = max !== null ? `$${max.toLocaleString()}` : "...";
    return `${minStr} - ${maxStr} ${currency}`;
  };

  const days = calculateDays();
  const status = statusLabels[trip.status] || statusLabels.draft;

  // Generate placeholder image based on destination
  const imageUrl = `https://source.unsplash.com/400x200/?${encodeURIComponent(
    destination
  )},travel,city`;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative h-40 bg-gray-100">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Delete button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete(trip.id);
          }}
          className="absolute top-3 right-3 p-2 bg-white/90 rounded-full text-gray-500 hover:text-red-500 hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
        >
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Destination name overlay */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white font-semibold text-lg truncate">
            {destination}
          </h3>
        </div>
      </div>

      {/* Content */}
      <Link href={`/itinerario/${trip.id}`}>
        <div className="p-4">
          {/* Trip name and status */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <h4 className="font-medium text-[#1E3A5F] truncate">
              {trip.trip_name}
            </h4>
            <span
              className={`flex-shrink-0 px-2 py-1 rounded-full text-xs font-medium ${status.color}`}
            >
              {status.label}
            </span>
          </div>

          {/* Details */}
          <div className="space-y-2 text-sm text-[#6B7280]">
            {/* Duration */}
            {days && (
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>
                  {days} {days === 1 ? "dia" : "dias"}
                </span>
              </div>
            )}

            {/* Budget */}
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                {formatBudget(formData.budgetMin, formData.budgetMax, formData.currency)}
              </span>
            </div>

            {/* Created date */}
            <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
              <span className="text-xs">
                Creado el {formatDate(trip.created_at)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
