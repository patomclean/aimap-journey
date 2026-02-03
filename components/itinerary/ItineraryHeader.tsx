"use client";

import { Itinerary } from "@/types";

interface ItineraryHeaderProps {
  itinerary: Itinerary;
  onDownloadPDF: () => void;
}

export default function ItineraryHeader({
  itinerary,
  onDownloadPDF,
}: ItineraryHeaderProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("es-AR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1E3A5F]">
            {itinerary.destination}, {itinerary.country}
          </h1>
          <p className="text-[#6B7280] mt-1">
            {itinerary.totalDays} {itinerary.totalDays === 1 ? "dia" : "dias"},{" "}
            desde el {formatDate(itinerary.startDate)} hasta el{" "}
            {formatDate(itinerary.endDate)} •{" "}
            <span className="text-[#1E3A5F] font-medium">
              ${itinerary.budgetMin.toLocaleString()} - $
              {itinerary.budgetMax.toLocaleString()} {itinerary.currency}
            </span>
          </p>
        </div>

        <button
          onClick={onDownloadPDF}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white font-medium rounded-full transition-colors"
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
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Descargar PDF
        </button>
      </div>
    </div>
  );
}
