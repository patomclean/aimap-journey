"use client";

import { useState } from "react";
import { ItineraryDay, ItineraryEvent } from "@/types";
import EventCard from "./EventCard";
import SpecialEventsCard from "./SpecialEventsCard";

interface DayCardProps {
  day: ItineraryDay;
  onSelectOption: (eventId: string, optionId: string) => void;
  onAddCustomOption: (eventId: string, customText: string) => void;
  onRemoveEvent: (eventId: string) => void;
  onAddActivity: (dayNumber: number, activity: Partial<ItineraryEvent>) => void;
}

export default function DayCard({
  day,
  onSelectOption,
  onAddCustomOption,
  onRemoveEvent,
  onAddActivity,
}: DayCardProps) {
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [newActivityTitle, setNewActivityTitle] = useState("");
  const [newActivityTime, setNewActivityTime] = useState("");

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("es-AR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  const handleAddActivity = () => {
    if (newActivityTitle.trim() && newActivityTime.trim()) {
      onAddActivity(day.dayNumber, {
        id: `custom-${Date.now()}`,
        type: "custom",
        title: newActivityTitle.trim(),
        time: newActivityTime.trim(),
        location: "Actividad personalizada",
        isRemovable: true,
      });
      setNewActivityTitle("");
      setNewActivityTime("");
      setShowAddActivity(false);
    }
  };

  return (
    <div className="mb-8">
      {/* Day Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#1E3A5F] text-white flex flex-col items-center justify-center">
          <span className="text-xs font-medium">Dia</span>
          <span className="text-xl font-bold leading-none">{day.dayNumber}</span>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-[#1E3A5F] capitalize">
            {formatDate(day.date)}
          </h2>
        </div>
      </div>

      {/* Events Timeline */}
      <div className="relative ml-7 pl-7 border-l-2 border-gray-200">
        <div className="space-y-4">
          {day.events.map((event, index) => (
            <div key={event.id} className="relative">
              {/* Timeline dot */}
              <div className="absolute -left-[33px] top-4 w-4 h-4 rounded-full bg-white border-4 border-[#0EA5E9]" />

              <EventCard
                event={event}
                onSelectOption={onSelectOption}
                onAddCustomOption={onAddCustomOption}
                onRemoveEvent={onRemoveEvent}
              />

              {/* Add activity button between events */}
              {index < day.events.length - 1 && (
                <div className="my-2 flex justify-center">
                  <button
                    onClick={() => setShowAddActivity(true)}
                    className="text-sm text-[#0EA5E9] hover:text-[#0284C7] flex items-center gap-1 py-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Agregar actividad
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Add activity at end */}
          <div className="relative">
            <div className="absolute -left-[33px] top-4 w-4 h-4 rounded-full bg-white border-4 border-dashed border-gray-300" />

            {showAddActivity ? (
              <div className="bg-white rounded-xl shadow-sm border border-[#0EA5E9] p-4">
                <div className="space-y-3">
                  <input
                    type="time"
                    value={newActivityTime}
                    onChange={(e) => setNewActivityTime(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent"
                  />
                  <input
                    type="text"
                    value={newActivityTitle}
                    onChange={(e) => setNewActivityTitle(e.target.value)}
                    placeholder="Nombre de la actividad"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddActivity}
                      className="flex-1 px-4 py-2 bg-[#22C55E] text-white rounded-lg hover:bg-[#16A34A] transition-colors"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => {
                        setShowAddActivity(false);
                        setNewActivityTitle("");
                        setNewActivityTime("");
                      }}
                      className="flex-1 px-4 py-2 bg-gray-100 text-[#6B7280] rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAddActivity(true)}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-[#6B7280] hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Agregar actividad
              </button>
            )}
          </div>
        </div>

        {/* Special Events */}
        {day.specialEvents && day.specialEvents.length > 0 && (
          <SpecialEventsCard events={day.specialEvents} />
        )}
      </div>
    </div>
  );
}
