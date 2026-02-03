"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Itinerary, ItineraryEvent, Trip } from "@/types";
import ItineraryHeader from "./ItineraryHeader";
import InspirationGallery from "./InspirationGallery";
import DayCard from "./DayCard";

interface ItineraryViewProps {
  trip: Trip;
  itinerary: Itinerary;
  onUpdate: (itinerary: Itinerary) => void;
}

export default function ItineraryView({
  trip,
  itinerary: initialItinerary,
  onUpdate,
}: ItineraryViewProps) {
  const router = useRouter();
  const [itinerary, setItinerary] = useState<Itinerary>(initialItinerary);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSelectOption = (eventId: string, optionId: string) => {
    const updatedDays = itinerary.days.map((day) => ({
      ...day,
      events: day.events.map((event) =>
        event.id === eventId
          ? { ...event, selectedOptionId: optionId }
          : event
      ),
    }));
    const updated = { ...itinerary, days: updatedDays };
    setItinerary(updated);
    onUpdate(updated);
    showNotification("Opcion seleccionada");
  };

  const handleAddCustomOption = (eventId: string, customText: string) => {
    const updatedDays = itinerary.days.map((day) => ({
      ...day,
      events: day.events.map((event) =>
        event.id === eventId
          ? { ...event, customOption: customText }
          : event
      ),
    }));
    const updated = { ...itinerary, days: updatedDays };
    setItinerary(updated);
    onUpdate(updated);
    showNotification("Opcion personalizada agregada");
  };

  const handleRemoveEvent = (eventId: string) => {
    const updatedDays = itinerary.days.map((day) => ({
      ...day,
      events: day.events.filter((event) => event.id !== eventId),
    }));
    const updated = { ...itinerary, days: updatedDays };
    setItinerary(updated);
    onUpdate(updated);
    showNotification("Actividad eliminada");
  };

  const handleAddActivity = (
    dayNumber: number,
    activity: Partial<ItineraryEvent>
  ) => {
    const updatedDays = itinerary.days.map((day) => {
      if (day.dayNumber === dayNumber) {
        const newEvent: ItineraryEvent = {
          id: activity.id || `custom-${Date.now()}`,
          type: activity.type || "custom",
          time: activity.time || "12:00",
          title: activity.title || "Nueva actividad",
          location: activity.location || "Ubicacion por definir",
          isRemovable: true,
        };
        // Insert event and sort by time
        const events = [...day.events, newEvent].sort((a, b) =>
          a.time.localeCompare(b.time)
        );
        return { ...day, events };
      }
      return day;
    });
    const updated = { ...itinerary, days: updatedDays };
    setItinerary(updated);
    onUpdate(updated);
    showNotification("Actividad agregada");
  };

  const handleDownloadPDF = () => {
    // TODO: Implement PDF generation
    showNotification("Funcion de descarga en desarrollo");
  };

  const handleEditForm = () => {
    router.push(`/trip-form?edit=${trip.id}`);
  };

  const handleConfirmAndDownload = () => {
    // TODO: Check if user is logged in, show auth modal if not
    handleDownloadPDF();
  };

  // Calculate total estimated cost
  const calculateTotalCost = () => {
    let total = 0;
    itinerary.days.forEach((day) => {
      day.events.forEach((event) => {
        if (event.selectedOptionId && event.options) {
          const selectedOption = event.options.find(
            (opt) => opt.id === event.selectedOptionId
          );
          if (selectedOption) {
            total += selectedOption.price;
          }
        }
      });
    });
    return total || itinerary.totalEstimatedCost;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-32">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <ItineraryHeader
          itinerary={itinerary}
          onDownloadPDF={handleDownloadPDF}
        />

        {/* Inspiration Gallery */}
        <InspirationGallery
          images={itinerary.inspirationImages}
          destination={itinerary.destination}
        />

        {/* Day by Day Itinerary */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#1E3A5F] mb-6">
            Itinerario dia por dia
          </h2>

          {itinerary.days.map((day) => (
            <DayCard
              key={day.dayNumber}
              day={day}
              onSelectOption={handleSelectOption}
              onAddCustomOption={handleAddCustomOption}
              onRemoveEvent={handleRemoveEvent}
              onAddActivity={handleAddActivity}
            />
          ))}
        </div>

        {/* Total Cost Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="text-center">
            <h3 className="text-lg font-medium text-[#6B7280] mb-2">
              Costo total estimado
            </h3>
            <div className="text-4xl font-bold text-[#1E3A5F]">
              ${calculateTotalCost().toLocaleString()} {itinerary.currency}
            </div>
            <p className="text-sm text-[#6B7280] mt-2">
              * Las comidas y actividades son costos aproximados variables
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                // TODO: Share functionality
                showNotification("Funcion de compartir en desarrollo");
              }}
              className="p-3 border border-gray-300 rounded-full text-[#6B7280] hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleEditForm}
              className="px-6 py-3 border-2 border-[#1E3A5F] text-[#1E3A5F] font-medium rounded-full hover:bg-[#1E3A5F] hover:text-white transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Editar formulario
            </button>

            <button
              onClick={handleConfirmAndDownload}
              className="px-8 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white font-medium rounded-full transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Confirmar y descargar
            </button>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-24 right-4 bg-[#22C55E] text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
          <div className="w-2 h-2 bg-white rounded-full" />
          {toastMessage}
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
