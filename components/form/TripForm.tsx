"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  TripFormData,
  FormSection as FormSectionType,
  ImportanceLevel,
  Currency,
  TravelWith,
  Destination,
} from "@/types";
import { supabase } from "@/lib/supabase";
import FormSection from "./FormSection";
import ProgressNav from "./ProgressNav";
import ImportanceButtons from "./ImportanceButtons";
import InterestSlider from "./InterestSlider";

// Initial form data
const initialFormData: TripFormData = {
  tripName: "",
  originCity: "",
  destinations: [],
  dateType: "specific",
  startDate: null,
  endDate: null,
  flexibleMonth: "",
  budgetMin: null,
  budgetMax: null,
  currency: "USD",
  priorities: {
    flights: {
      importance: "normal",
      noPreference: false,
      directFlight: false,
      personalBagOnly: false,
      privateTransport: false,
      preferredTimeSlot: "",
      avoid: [],
    },
    accommodation: {
      importance: "normal",
      type: [],
      breakfastIncluded: false,
      freeCancellation: false,
      noSelfCheckIn: false,
      petFriendly: false,
      amenities: [],
    },
    meals: {
      importance: "normal",
      localFood: false,
      restaurants: false,
      streetFood: false,
      supermarket: false,
      fastFood: false,
      dietaryRestrictions: [],
      otherRestriction: "",
    },
    activities: {
      importance: "normal",
      freeActivitiesOnly: false,
      nightlife: false,
      culturalTours: false,
      outdoorSports: false,
      avoid: [],
    },
  },
  numberOfPeople: 1,
  ageRangeMin: 18,
  ageRangeMax: 65,
  travelWith: "solo",
  companionNotes: "",
  interests: {
    history: { value: 5, comment: "" },
    artCulture: { value: 5, comment: "" },
    nature: { value: 5, comment: "" },
    entertainment: { value: 5, comment: "" },
    sports: { value: 5, comment: "" },
    gastronomy: { value: 5, comment: "" },
    shopping: { value: 5, comment: "" },
    adventure: { value: 5, comment: "" },
  },
  additionalNotes: "",
};

// Form sections configuration
const formSections: FormSectionType[] = [
  { id: "name", name: "Nombre", icon: "edit", status: "pending" },
  { id: "places", name: "Lugares", icon: "pin", status: "pending" },
  { id: "dates", name: "Fechas", icon: "calendar", status: "pending" },
  { id: "budget", name: "Presupuesto", icon: "money", status: "pending" },
  { id: "priorities", name: "Prioridades", icon: "star", status: "pending" },
  { id: "companions", name: "Acompanantes", icon: "users", status: "pending" },
  { id: "interests", name: "Intereses", icon: "heart", status: "pending" },
  { id: "additional", name: "Adicionales", icon: "chat", status: "pending" },
];

export default function TripForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<TripFormData>(initialFormData);
  const [sections, setSections] = useState<FormSectionType[]>(formSections);
  const [currentSection, setCurrentSection] = useState("name");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [destinationInput, setDestinationInput] = useState("");

  // Update section status based on form data
  useEffect(() => {
    const updatedSections = sections.map((section) => {
      let isComplete = false;
      switch (section.id) {
        case "name":
          isComplete = formData.tripName.trim().length > 0;
          break;
        case "places":
          isComplete =
            formData.originCity.trim().length > 0 &&
            formData.destinations.length > 0;
          break;
        case "dates":
          isComplete =
            formData.dateType === "flexible"
              ? !!formData.flexibleMonth
              : !!formData.startDate && !!formData.endDate;
          break;
        case "budget":
          isComplete =
            formData.budgetMin !== null && formData.budgetMax !== null;
          break;
        case "priorities":
          isComplete = true; // Always has defaults
          break;
        case "companions":
          isComplete = formData.numberOfPeople > 0;
          break;
        case "interests":
          isComplete = true; // Always has defaults
          break;
        case "additional":
          isComplete = true; // Optional section
          break;
      }
      return {
        ...section,
        status: isComplete ? ("completed" as const) : section.status,
      };
    });
    setSections(updatedSections);
  }, [formData]);

  const handleSectionClick = (sectionId: string) => {
    setCurrentSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const addDestination = () => {
    if (destinationInput.trim()) {
      const newDestination: Destination = {
        id: Date.now().toString(),
        name: destinationInput.trim(),
        country: "",
      };
      setFormData({
        ...formData,
        destinations: [...formData.destinations, newDestination],
      });
      setDestinationInput("");
    }
  };

  const removeDestination = (id: string) => {
    setFormData({
      ...formData,
      destinations: formData.destinations.filter((d) => d.id !== id),
    });
  };

  const calculateDays = () => {
    if (!formData.startDate || !formData.endDate) return 0;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.tripName.trim()) {
      alert("Por favor ingresa un nombre para tu viaje");
      return;
    }

    if (!formData.originCity.trim() || formData.destinations.length === 0) {
      alert("Por favor ingresa tu ciudad de origen y al menos un destino");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from("trips")
        .insert([
          {
            trip_name: formData.tripName,
            form_data: formData,
            status: "generating",
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Error saving trip:", error);
        alert("Error al guardar el viaje. Por favor intenta de nuevo.");
        return;
      }

      // Redirect to itinerary generation page
      router.push(`/itinerario/${data.id}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Error al procesar el formulario. Por favor intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Progress Navigation */}
      <ProgressNav
        sections={sections}
        currentSection={currentSection}
        onSectionClick={handleSectionClick}
      />

      {/* Form Container */}
      <div className="max-w-3xl mx-auto px-4 py-8 lg:ml-64">
        {/* Page Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-2">
            Planifica tu viaje
          </h1>
          <p className="text-[#6B7280]">
            Responde cada pregunta para generar tu itinerario personalizado
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Trip Name */}
          <FormSection
            id="name"
            title="Nombre del viaje"
            subtitle="Dale un nombre memorable a tu aventura"
            required
          >
            <input
              type="text"
              value={formData.tripName}
              onChange={(e) =>
                setFormData({ ...formData, tripName: e.target.value })
              }
              placeholder="Ej: Aventura en Europa 2025"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent"
            />
          </FormSection>

          {/* Section 2: Places */}
          <FormSection
            id="places"
            title="Que lugares queres visitar?"
            subtitle="Contanos tus destinos sonados (podes elegir mas de uno)"
            required
          >
            {/* Origin City */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#1E3A5F] mb-2">
                Ciudad de origen
              </label>
              <input
                type="text"
                value={formData.originCity}
                onChange={(e) =>
                  setFormData({ ...formData, originCity: e.target.value })
                }
                placeholder="Ej: Buenos Aires, Argentina"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent"
              />
            </div>

            {/* Destinations */}
            <div>
              <label className="block text-sm font-medium text-[#1E3A5F] mb-2">
                Destinos
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={destinationInput}
                  onChange={(e) => setDestinationInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addDestination())}
                  placeholder="Buscar continente, pais, provincia, ciudad o lugares"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={addDestination}
                  className="px-4 py-3 bg-[#0EA5E9] text-white rounded-lg hover:bg-[#0284C7] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>

              {/* Destination Tags */}
              {formData.destinations.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.destinations.map((dest) => (
                    <span
                      key={dest.id}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1E3A5F] text-white rounded-full text-sm"
                    >
                      {dest.name}
                      <button
                        type="button"
                        onClick={() => removeDestination(dest.id)}
                        className="hover:text-[#F97316]"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </FormSection>

          {/* Section 3: Dates */}
          <FormSection
            id="dates"
            title="Cuando planeas viajar?"
            subtitle="Elegi las fechas de tu viaje"
            required
          >
            {/* Date Type Toggle */}
            <div className="flex gap-2 mb-6">
              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, dateType: "specific" })
                }
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                  formData.dateType === "specific"
                    ? "bg-[#1E3A5F] text-white"
                    : "bg-gray-100 text-[#6B7280] hover:bg-gray-200"
                }`}
              >
                Fechas especificas
              </button>
              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, dateType: "flexible" })
                }
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                  formData.dateType === "flexible"
                    ? "bg-[#1E3A5F] text-white"
                    : "bg-gray-100 text-[#6B7280] hover:bg-gray-200"
                }`}
              >
                Fechas flexibles
              </button>
            </div>

            {formData.dateType === "specific" ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1E3A5F] mb-2">
                      Fecha de inicio
                    </label>
                    <input
                      type="date"
                      value={formData.startDate || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, startDate: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1E3A5F] mb-2">
                      Fecha de fin
                    </label>
                    <input
                      type="date"
                      value={formData.endDate || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, endDate: e.target.value })
                      }
                      min={formData.startDate || ""}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Date Summary */}
                {formData.startDate && formData.endDate && (
                  <div className="flex items-center justify-center gap-4 p-4 bg-[#F8FAFC] rounded-lg">
                    <span className="px-4 py-2 bg-[#1E3A5F] text-white rounded-lg font-medium">
                      {new Date(formData.startDate).toLocaleDateString("es-AR", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                    <span className="text-[#6B7280]">-</span>
                    <span className="px-4 py-2 bg-[#1E3A5F] text-white rounded-lg font-medium">
                      {new Date(formData.endDate).toLocaleDateString("es-AR", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                    <span className="px-4 py-2 bg-[#F97316] text-white rounded-lg font-medium">
                      {calculateDays()} {calculateDays() === 1 ? "Dia" : "Dias"}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          startDate: null,
                          endDate: null,
                        })
                      }
                      className="p-2 text-[#6B7280] hover:text-[#EF4444]"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-[#1E3A5F] mb-2">
                  Mes aproximado de viaje
                </label>
                <select
                  value={formData.flexibleMonth || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, flexibleMonth: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent"
                >
                  <option value="">Selecciona un mes</option>
                  <option value="2025-01">Enero 2025</option>
                  <option value="2025-02">Febrero 2025</option>
                  <option value="2025-03">Marzo 2025</option>
                  <option value="2025-04">Abril 2025</option>
                  <option value="2025-05">Mayo 2025</option>
                  <option value="2025-06">Junio 2025</option>
                  <option value="2025-07">Julio 2025</option>
                  <option value="2025-08">Agosto 2025</option>
                  <option value="2025-09">Septiembre 2025</option>
                  <option value="2025-10">Octubre 2025</option>
                  <option value="2025-11">Noviembre 2025</option>
                  <option value="2025-12">Diciembre 2025</option>
                  <option value="2026-01">Enero 2026</option>
                  <option value="2026-02">Febrero 2026</option>
                  <option value="2026-03">Marzo 2026</option>
                </select>
              </div>
            )}
          </FormSection>

          {/* Section 4: Budget */}
          <FormSection
            id="budget"
            title="Cual es tu presupuesto?"
            subtitle="Defini tu rango de inversion"
            required
          >
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1E3A5F] mb-2">
                  Minimo
                </label>
                <input
                  type="number"
                  value={formData.budgetMin || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      budgetMin: e.target.value ? parseInt(e.target.value) : null,
                    })
                  }
                  placeholder="0"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E3A5F] mb-2">
                  Maximo
                </label>
                <input
                  type="number"
                  value={formData.budgetMax || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      budgetMax: e.target.value ? parseInt(e.target.value) : null,
                    })
                  }
                  placeholder="5000"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E3A5F] mb-2">
                  Moneda
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currency: e.target.value as Currency,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="ARS">ARS</option>
                  <option value="BRL">BRL</option>
                  <option value="MXN">MXN</option>
                  <option value="CLP">CLP</option>
                  <option value="COP">COP</option>
                </select>
              </div>
            </div>
          </FormSection>

          {/* Section 5: Spending Priorities */}
          <FormSection
            id="priorities"
            title="Prioridades de gasto"
            subtitle="Contanos como valoras los siguientes aspectos"
          >
            {/* 5.1 Flights */}
            <div className="mb-8 pb-8 border-b border-gray-100">
              <h3 className="text-lg font-medium text-[#1E3A5F] mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Pasajes y Traslados
              </h3>
              <ImportanceButtons
                value={formData.priorities.flights.importance}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    priorities: {
                      ...formData.priorities,
                      flights: { ...formData.priorities.flights, importance: value },
                    },
                  })
                }
              />
              <div className="mt-4 space-y-2">
                {[
                  { key: "noPreference", label: "No tengo preferencia" },
                  { key: "directFlight", label: "Deseo que sea vuelo directo" },
                  { key: "personalBagOnly", label: "Viajo solo con bolso/mochila personal" },
                  { key: "privateTransport", label: "Prefiero trasladarme en transporte privado" },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.priorities.flights[key as keyof typeof formData.priorities.flights] as boolean}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          priorities: {
                            ...formData.priorities,
                            flights: {
                              ...formData.priorities.flights,
                              [key]: e.target.checked,
                            },
                          },
                        })
                      }
                      className="w-5 h-5 rounded border-gray-300 text-[#0EA5E9] focus:ring-[#0EA5E9]"
                    />
                    <span className="text-[#6B7280]">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 5.2 Accommodation */}
            <div className="mb-8 pb-8 border-b border-gray-100">
              <h3 className="text-lg font-medium text-[#1E3A5F] mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Alojamiento
              </h3>
              <ImportanceButtons
                value={formData.priorities.accommodation.importance}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    priorities: {
                      ...formData.priorities,
                      accommodation: {
                        ...formData.priorities.accommodation,
                        importance: value,
                      },
                    },
                  })
                }
              />
              <div className="mt-4">
                <label className="block text-sm font-medium text-[#1E3A5F] mb-2">
                  Tipo de alojamiento preferido
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: "hotel", label: "Hotel" },
                    { value: "hostel", label: "Hostel" },
                    { value: "apartment", label: "Departamento" },
                    { value: "house", label: "Casa" },
                    { value: "resort", label: "Resort All Inclusive" },
                    { value: "cabin", label: "Cabana" },
                  ].map(({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => {
                        const types = formData.priorities.accommodation.type;
                        const newTypes = types.includes(value as typeof types[number])
                          ? types.filter((t) => t !== value)
                          : [...types, value as typeof types[number]];
                        setFormData({
                          ...formData,
                          priorities: {
                            ...formData.priorities,
                            accommodation: {
                              ...formData.priorities.accommodation,
                              type: newTypes,
                            },
                          },
                        });
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        formData.priorities.accommodation.type.includes(value as typeof formData.priorities.accommodation.type[number])
                          ? "bg-[#0EA5E9] text-white"
                          : "bg-gray-100 text-[#6B7280] hover:bg-gray-200"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {[
                  { key: "breakfastIncluded", label: "Deseo que tenga desayuno incluido" },
                  { key: "freeCancellation", label: "Cancelacion gratuita" },
                  { key: "noSelfCheckIn", label: "No quiero self-check in" },
                  { key: "petFriendly", label: "Pet friendly" },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.priorities.accommodation[key as keyof typeof formData.priorities.accommodation] as boolean}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          priorities: {
                            ...formData.priorities,
                            accommodation: {
                              ...formData.priorities.accommodation,
                              [key]: e.target.checked,
                            },
                          },
                        })
                      }
                      className="w-5 h-5 rounded border-gray-300 text-[#0EA5E9] focus:ring-[#0EA5E9]"
                    />
                    <span className="text-[#6B7280]">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 5.3 Meals */}
            <div className="mb-8 pb-8 border-b border-gray-100">
              <h3 className="text-lg font-medium text-[#1E3A5F] mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Comidas
              </h3>
              <ImportanceButtons
                value={formData.priorities.meals.importance}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    priorities: {
                      ...formData.priorities,
                      meals: { ...formData.priorities.meals, importance: value },
                    },
                  })
                }
              />
              <div className="mt-4 space-y-2">
                {[
                  { key: "localFood", label: "Priorizo probar la comida local" },
                  { key: "restaurants", label: "Comer en restaurantes" },
                  { key: "streetFood", label: "Comida de paso (street food)" },
                  { key: "supermarket", label: "Comprar en supermercado" },
                  { key: "fastFood", label: "Comida rapida" },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.priorities.meals[key as keyof typeof formData.priorities.meals] as boolean}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          priorities: {
                            ...formData.priorities,
                            meals: {
                              ...formData.priorities.meals,
                              [key]: e.target.checked,
                            },
                          },
                        })
                      }
                      className="w-5 h-5 rounded border-gray-300 text-[#0EA5E9] focus:ring-[#0EA5E9]"
                    />
                    <span className="text-[#6B7280]">{label}</span>
                  </label>
                ))}
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-[#1E3A5F] mb-2">
                  Restricciones alimentarias
                </label>
                <select
                  multiple
                  value={formData.priorities.meals.dietaryRestrictions}
                  onChange={(e) => {
                    const selected = Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    );
                    setFormData({
                      ...formData,
                      priorities: {
                        ...formData.priorities,
                        meals: {
                          ...formData.priorities.meals,
                          dietaryRestrictions: selected,
                        },
                      },
                    });
                  }}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent"
                >
                  <option value="ninguna">Ninguna</option>
                  <option value="vegetariano">Vegetariano</option>
                  <option value="vegano">Vegano</option>
                  <option value="celiaco">Celiaco</option>
                  <option value="diabetico">Diabetico</option>
                  <option value="kosher">Kosher</option>
                  <option value="halal">Halal</option>
                  <option value="sin_lactosa">Sin Lactosa</option>
                </select>
                <p className="text-xs text-[#6B7280] mt-1">
                  Mantene presionado Ctrl para seleccionar multiples opciones
                </p>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-[#1E3A5F] mb-2">
                  Otra restriccion alimentaria
                </label>
                <input
                  type="text"
                  value={formData.priorities.meals.otherRestriction}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      priorities: {
                        ...formData.priorities,
                        meals: {
                          ...formData.priorities.meals,
                          otherRestriction: e.target.value,
                        },
                      },
                    })
                  }
                  placeholder="Especificar..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent"
                />
              </div>
            </div>

            {/* 5.4 Activities */}
            <div>
              <h3 className="text-lg font-medium text-[#1E3A5F] mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Actividades
              </h3>
              <ImportanceButtons
                value={formData.priorities.activities.importance}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    priorities: {
                      ...formData.priorities,
                      activities: {
                        ...formData.priorities.activities,
                        importance: value,
                      },
                    },
                  })
                }
              />
              <div className="mt-4 space-y-2">
                {[
                  { key: "freeActivitiesOnly", label: "Me interesa realizar solo actividades gratuitas" },
                  { key: "nightlife", label: "Actividades nocturnas" },
                  { key: "culturalTours", label: "Excursiones culturales" },
                  { key: "outdoorSports", label: "Deportes al aire libre" },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.priorities.activities[key as keyof typeof formData.priorities.activities] as boolean}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          priorities: {
                            ...formData.priorities,
                            activities: {
                              ...formData.priorities.activities,
                              [key]: e.target.checked,
                            },
                          },
                        })
                      }
                      className="w-5 h-5 rounded border-gray-300 text-[#0EA5E9] focus:ring-[#0EA5E9]"
                    />
                    <span className="text-[#6B7280]">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </FormSection>

          {/* Section 6: Companions */}
          <FormSection
            id="companions"
            title="Acompanantes"
            subtitle="Contanos sobre quienes viajan"
            required
          >
            {/* Number of people */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#1E3A5F] mb-2">
                Cuantas personas son? *
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      numberOfPeople: Math.max(1, formData.numberOfPeople - 1),
                    })
                  }
                  className="w-12 h-12 rounded-full bg-gray-100 text-[#1E3A5F] hover:bg-gray-200 flex items-center justify-center text-2xl font-medium"
                >
                  -
                </button>
                <span className="text-3xl font-bold text-[#1E3A5F] w-12 text-center">
                  {formData.numberOfPeople}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      numberOfPeople: formData.numberOfPeople + 1,
                    })
                  }
                  className="w-12 h-12 rounded-full bg-[#0EA5E9] text-white hover:bg-[#0284C7] flex items-center justify-center text-2xl font-medium"
                >
                  +
                </button>
              </div>
            </div>

            {/* Age range */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#1E3A5F] mb-2">
                Rango de edades
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={formData.ageRangeMin}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ageRangeMin: parseInt(e.target.value) || 0,
                    })
                  }
                  min="0"
                  max="120"
                  className="w-20 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent text-center"
                />
                <span className="text-[#6B7280]">a</span>
                <input
                  type="number"
                  value={formData.ageRangeMax}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ageRangeMax: parseInt(e.target.value) || 0,
                    })
                  }
                  min="0"
                  max="120"
                  className="w-20 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent text-center"
                />
                <span className="text-[#6B7280]">anos</span>
              </div>
            </div>

            {/* Travel with */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#1E3A5F] mb-2">
                Con quien viajas? *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { value: "familia", label: "Familia", icon: "👨‍👩‍👧‍👦" },
                  { value: "amigos", label: "Amigos", icon: "👥" },
                  { value: "pareja", label: "Pareja", icon: "💑" },
                  { value: "solo", label: "Solo", icon: "🧳" },
                ].map(({ value, label, icon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        travelWith: value as TravelWith,
                      })
                    }
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.travelWith === value
                        ? "border-[#0EA5E9] bg-[#0EA5E9]/10"
                        : "border-gray-200 hover:border-[#0EA5E9]/50"
                    }`}
                  >
                    <div className="text-3xl mb-2">{icon}</div>
                    <div
                      className={`text-sm font-medium ${
                        formData.travelWith === value
                          ? "text-[#0EA5E9]"
                          : "text-[#6B7280]"
                      }`}
                    >
                      {label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Companion notes */}
            <div>
              <label className="block text-sm font-medium text-[#1E3A5F] mb-2">
                Hay algo que debamos tener en cuenta sobre alguno de los viajeros?
              </label>
              <textarea
                value={formData.companionNotes}
                onChange={(e) =>
                  setFormData({ ...formData, companionNotes: e.target.value })
                }
                placeholder="Algun viajero con movilidad reducida, alergias o limitaciones, etc."
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent resize-none"
              />
            </div>
          </FormSection>

          {/* Section 7: Interests */}
          <FormSection
            id="interests"
            title="Cuales son tus mayores intereses y preferencias?"
            subtitle="Califica del 1 al 10 segun tu nivel de interes"
            required
          >
            <div className="space-y-2">
              <InterestSlider
                label="Historia"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                }
                value={formData.interests.history.value}
                comment={formData.interests.history.comment}
                onChange={(value, comment) =>
                  setFormData({
                    ...formData,
                    interests: {
                      ...formData.interests,
                      history: { value, comment },
                    },
                  })
                }
              />
              <InterestSlider
                label="Arte y Cultura"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                }
                value={formData.interests.artCulture.value}
                comment={formData.interests.artCulture.comment}
                onChange={(value, comment) =>
                  setFormData({
                    ...formData,
                    interests: {
                      ...formData.interests,
                      artCulture: { value, comment },
                    },
                  })
                }
              />
              <InterestSlider
                label="Naturaleza"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                }
                value={formData.interests.nature.value}
                comment={formData.interests.nature.comment}
                onChange={(value, comment) =>
                  setFormData({
                    ...formData,
                    interests: {
                      ...formData.interests,
                      nature: { value, comment },
                    },
                  })
                }
              />
              <InterestSlider
                label="Entretenimiento"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                value={formData.interests.entertainment.value}
                comment={formData.interests.entertainment.comment}
                onChange={(value, comment) =>
                  setFormData({
                    ...formData,
                    interests: {
                      ...formData.interests,
                      entertainment: { value, comment },
                    },
                  })
                }
              />
              <InterestSlider
                label="Deporte"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                value={formData.interests.sports.value}
                comment={formData.interests.sports.comment}
                onChange={(value, comment) =>
                  setFormData({
                    ...formData,
                    interests: {
                      ...formData.interests,
                      sports: { value, comment },
                    },
                  })
                }
              />
              <InterestSlider
                label="Gastronomia"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                }
                value={formData.interests.gastronomy.value}
                comment={formData.interests.gastronomy.comment}
                onChange={(value, comment) =>
                  setFormData({
                    ...formData,
                    interests: {
                      ...formData.interests,
                      gastronomy: { value, comment },
                    },
                  })
                }
              />
              <InterestSlider
                label="Shopping"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                }
                value={formData.interests.shopping.value}
                comment={formData.interests.shopping.comment}
                onChange={(value, comment) =>
                  setFormData({
                    ...formData,
                    interests: {
                      ...formData.interests,
                      shopping: { value, comment },
                    },
                  })
                }
              />
              <InterestSlider
                label="Aventura"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                  </svg>
                }
                value={formData.interests.adventure.value}
                comment={formData.interests.adventure.comment}
                onChange={(value, comment) =>
                  setFormData({
                    ...formData,
                    interests: {
                      ...formData.interests,
                      adventure: { value, comment },
                    },
                  })
                }
              />
            </div>
          </FormSection>

          {/* Section 8: Additional */}
          <FormSection
            id="additional"
            title="Hay algo mas que quieras que sepamos?"
            subtitle="Menciona lo que quieras para personalizar aun mas tu viaje"
          >
            <textarea
              value={formData.additionalNotes}
              onChange={(e) =>
                setFormData({ ...formData, additionalNotes: e.target.value })
              }
              placeholder="Ej: Voy de luna de miel, es un viaje familiar por los 80 de una abuela, me gusta tener tiempo libre para no hacer nada, quiero tener un ritmo de viaje tranquilo o mas bien rapido, lugares que quieras evitar, X dia tenemos un cumpleanos y queremos festejarlo comiendo en un restaurante por la noche..."
              rows={5}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent resize-none"
            />
          </FormSection>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-4 bg-[#3B82F6] text-white text-lg font-medium rounded-full hover:bg-[#2563EB] transition-all flex items-center gap-2 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Generando...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Generar Itinerario
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
