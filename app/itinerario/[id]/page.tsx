"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/home/Header";
import { LoadingScreen, ItineraryView } from "@/components/itinerary";
import { supabase } from "@/lib/supabase";
import { Trip, Itinerary, ItineraryDay, ItineraryEvent, SpecialEvent } from "@/types";

// Mock function to generate itinerary - replace with actual AI call
function generateMockItinerary(trip: Trip): Itinerary {
  const formData = trip.form_data;
  const destination = formData.destinations[0]?.name || "Destino";
  const country = formData.destinations[0]?.country || "Pais";

  const startDate = formData.startDate || new Date().toISOString().split("T")[0];
  const endDate = formData.endDate || startDate;

  const start = new Date(startDate);
  const end = new Date(endDate);
  const totalDays = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1);

  // Generate days
  const days: ItineraryDay[] = [];

  for (let i = 0; i < totalDays; i++) {
    const currentDate = new Date(start);
    currentDate.setDate(start.getDate() + i);
    const dateStr = currentDate.toISOString().split("T")[0];

    const events: ItineraryEvent[] = [];

    // Day 1: Add flight arrival
    if (i === 0) {
      events.push({
        id: `flight-arrival-${i}`,
        type: "flight",
        time: "10:00",
        title: "Pasaje de ida",
        location: formData.originCity,
        options: [
          {
            id: "flight-1",
            name: "LATAM Airlines",
            description: "Vuelo directo",
            price: 850,
            currency: formData.currency,
            image: "https://source.unsplash.com/100x100/?airplane",
            details: {
              departure: "08:00",
              arrival: "14:00",
              type: "Vuelo directo",
              baggage: "Equipaje de mano incluido",
            },
            affiliateUrl: "https://www.latam.com",
            affiliateName: "LATAM",
          },
          {
            id: "flight-2",
            name: "Aerolineas Argentinas",
            description: "1 escala",
            price: 650,
            currency: formData.currency,
            image: "https://source.unsplash.com/100x100/?flight",
            details: {
              departure: "06:00",
              arrival: "16:00",
              type: "1 escala",
              baggage: "Solo equipaje de mano",
            },
            affiliateUrl: "https://www.aerolineas.com.ar",
            affiliateName: "Aerolineas",
          },
          {
            id: "flight-3",
            name: "Copa Airlines",
            description: "2 escalas - Economico",
            price: 480,
            currency: formData.currency,
            image: "https://source.unsplash.com/100x100/?plane",
            details: {
              departure: "23:00",
              arrival: "18:00 +1",
              type: "2 escalas",
              baggage: "Solo mochila personal",
            },
            affiliateUrl: "https://www.copaair.com",
            affiliateName: "Copa",
          },
        ],
      });

      events.push({
        id: `hotel-checkin-${i}`,
        type: "hotel_checkin",
        time: "15:00",
        title: "Check-in hotel",
        location: "Centro historico",
        options: [
          {
            id: "hotel-1",
            name: "Boutique Hotel Centro",
            description: "Suite con vista",
            price: 280,
            currency: formData.currency,
            priceRange: "$$$$",
            rating: 4.8,
            image: "https://source.unsplash.com/200x150/?hotel,luxury",
            details: {
              stars: "5 estrellas",
              room: "Suite con vista",
              amenities: "Spa, Gimnasio, Piscina",
            },
            affiliateUrl: "https://www.booking.com",
            affiliateName: "Booking",
          },
          {
            id: "hotel-2",
            name: "Hotel Clasico",
            description: "Habitacion doble",
            price: 150,
            currency: formData.currency,
            priceRange: "$$$",
            rating: 4.5,
            image: "https://source.unsplash.com/200x150/?hotel,room",
            details: {
              stars: "4 estrellas",
              room: "Habitacion doble",
              amenities: "Desayuno incluido",
            },
            affiliateUrl: "https://www.booking.com",
            affiliateName: "Booking",
          },
          {
            id: "hotel-3",
            name: "Hostel Viajero",
            description: "Habitacion privada",
            price: 45,
            currency: formData.currency,
            priceRange: "$",
            rating: 4.2,
            image: "https://source.unsplash.com/200x150/?hostel",
            details: {
              stars: "3 estrellas",
              room: "Habitacion privada",
              amenities: "Wifi, Cocina compartida",
            },
            affiliateUrl: "https://www.hostelworld.com",
            affiliateName: "Hostelworld",
          },
        ],
      });
    }

    // Add lunch
    events.push({
      id: `lunch-${i}`,
      type: "meal",
      time: "13:00",
      title: i === 0 ? "Almuerzo local" : "Almuerzo",
      location: "Zona gastronomica",
      isRemovable: true,
      travelTime: { minutes: 10, mode: "walking" },
      options: [
        {
          id: `restaurant-lunch-1-${i}`,
          name: "Restaurante Gourmet",
          description: "Cocina de autor",
          price: 85,
          currency: formData.currency,
          priceRange: "$$$$",
          rating: 4.9,
          image: "https://source.unsplash.com/200x150/?restaurant,gourmet",
          affiliateUrl: "https://www.thefork.com",
          affiliateName: "TheFork",
        },
        {
          id: `restaurant-lunch-2-${i}`,
          name: "Trattoria Local",
          description: "Cocina tradicional",
          price: 35,
          currency: formData.currency,
          priceRange: "$$",
          rating: 4.6,
          image: "https://source.unsplash.com/200x150/?restaurant,italian",
          affiliateUrl: "https://www.google.com/maps",
          affiliateName: "Google Maps",
        },
        {
          id: `restaurant-lunch-3-${i}`,
          name: "Street Food Market",
          description: "Comida de paso",
          price: 15,
          currency: formData.currency,
          priceRange: "$",
          rating: 4.3,
          image: "https://source.unsplash.com/200x150/?streetfood",
        },
      ],
    });

    // Add afternoon activity
    events.push({
      id: `activity-${i}`,
      type: "activity",
      time: "15:30",
      title: i === 0 ? "Tour ciudad" : `Actividad del dia ${i + 1}`,
      location: "Puntos turisticos",
      isRemovable: true,
      travelTime: { minutes: 20, mode: "transit" },
      options: [
        {
          id: `tour-1-${i}`,
          name: "Tour Premium",
          description: "Guia privado + transporte",
          price: 120,
          currency: formData.currency,
          rating: 4.9,
          image: "https://source.unsplash.com/200x150/?tour,guide",
          details: {
            duration: "4 horas",
            includes: "Guia privado, Transporte, Entradas",
          },
          affiliateUrl: "https://www.civitatis.com",
          affiliateName: "Civitatis",
        },
        {
          id: `tour-2-${i}`,
          name: "Tour Grupal",
          description: "Grupo pequeno",
          price: 65,
          currency: formData.currency,
          rating: 4.7,
          image: "https://source.unsplash.com/200x150/?tour,group",
          details: {
            duration: "3 horas",
            includes: "Guia en espanol, Entradas",
          },
          affiliateUrl: "https://www.getyourguide.com",
          affiliateName: "GetYourGuide",
        },
        {
          id: `tour-3-${i}`,
          name: "Tour Libre",
          description: "Auto-guiado",
          price: 25,
          currency: formData.currency,
          rating: 4.4,
          image: "https://source.unsplash.com/200x150/?walking,city",
          details: {
            duration: "2 horas",
            includes: "Audioguia, Mapa",
          },
          affiliateUrl: "https://www.viator.com",
          affiliateName: "Viator",
        },
      ],
    });

    // Add dinner
    events.push({
      id: `dinner-${i}`,
      type: "meal",
      time: "20:00",
      title: "Cena",
      location: "Zona de restaurantes",
      isRemovable: true,
      travelTime: { minutes: 15, mode: "walking" },
      options: [
        {
          id: `restaurant-dinner-1-${i}`,
          name: "Restaurante Panoramico",
          description: "Vista a la ciudad",
          price: 95,
          currency: formData.currency,
          priceRange: "$$$$",
          rating: 4.8,
          image: "https://source.unsplash.com/200x150/?restaurant,view",
          affiliateUrl: "https://www.thefork.com",
          affiliateName: "TheFork",
        },
        {
          id: `restaurant-dinner-2-${i}`,
          name: "Taberna Tipica",
          description: "Cocina regional",
          price: 40,
          currency: formData.currency,
          priceRange: "$$",
          rating: 4.5,
          image: "https://source.unsplash.com/200x150/?tavern,food",
        },
      ],
    });

    // Last day: Add checkout and return flight
    if (i === totalDays - 1) {
      // Insert checkout before lunch
      events.splice(0, 0, {
        id: `hotel-checkout-${i}`,
        type: "hotel_checkout",
        time: "11:00",
        title: "Check-out",
        location: "Hotel",
      });

      // Add return flight at the end
      events.push({
        id: `flight-return-${i}`,
        type: "flight",
        time: "22:00",
        title: "Vuelo de regreso",
        location: "Aeropuerto",
        options: [
          {
            id: "flight-return-1",
            name: "LATAM Airlines",
            description: "Vuelo directo",
            price: 820,
            currency: formData.currency,
            details: {
              departure: "22:00",
              arrival: "06:00 +1",
              type: "Vuelo directo",
            },
            affiliateUrl: "https://www.latam.com",
            affiliateName: "LATAM",
          },
          {
            id: "flight-return-2",
            name: "Aerolineas Argentinas",
            description: "1 escala",
            price: 620,
            currency: formData.currency,
            details: {
              departure: "18:00",
              arrival: "08:00 +1",
              type: "1 escala",
            },
            affiliateUrl: "https://www.aerolineas.com.ar",
            affiliateName: "Aerolineas",
          },
        ],
      });
    }

    // Add special events for some days
    const specialEvents: SpecialEvent[] = [];
    if (i === 0 || i === Math.floor(totalDays / 2)) {
      specialEvents.push(
        {
          id: `special-1-${i}`,
          type: "music",
          name: "Concierto de Jazz en vivo",
          date: dateStr,
          time: "21:00 - 23:30",
          location: "Blue Note Club",
          price: 45,
          currency: formData.currency,
          ticketUrl: "https://www.ticketmaster.com",
        },
        {
          id: `special-2-${i}`,
          type: "art",
          name: "Exposicion de Arte Contemporaneo",
          date: dateStr,
          time: "10:00 - 20:00",
          location: "Museo de Arte Moderno",
          price: 25,
          currency: formData.currency,
          ticketUrl: "https://www.eventbrite.com",
        }
      );
    }

    days.push({
      dayNumber: i + 1,
      date: dateStr,
      events: events.sort((a, b) => a.time.localeCompare(b.time)),
      specialEvents: specialEvents.length > 0 ? specialEvents : undefined,
    });
  }

  return {
    destination,
    country,
    totalDays,
    startDate,
    endDate,
    budgetMin: formData.budgetMin || 0,
    budgetMax: formData.budgetMax || 5000,
    currency: formData.currency,
    inspirationImages: [],
    days,
    totalEstimatedCost: 1890,
  };
}

export default function ItineraryPage() {
  const params = useParams();
  const tripId = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTrip() {
      try {
        // Fetch trip from Supabase
        const { data: tripData, error: fetchError } = await supabase
          .from("trips")
          .select("*")
          .eq("id", tripId)
          .single();

        if (fetchError) {
          console.error("Error fetching trip:", fetchError);
          setError("No se pudo cargar el viaje");
          setIsLoading(false);
          return;
        }

        setTrip(tripData as Trip);

        // Check if itinerary already exists
        if (tripData.itinerary_data) {
          setItinerary(tripData.itinerary_data as Itinerary);
          setIsLoading(false);
          return;
        }

        // Generate itinerary (simulate delay for demo)
        await new Promise((resolve) => setTimeout(resolve, 4000));

        const generatedItinerary = generateMockItinerary(tripData as Trip);

        // Save itinerary to Supabase
        const { error: updateError } = await supabase
          .from("trips")
          .update({
            itinerary_data: generatedItinerary,
            status: "completed",
          })
          .eq("id", tripId);

        if (updateError) {
          console.error("Error saving itinerary:", updateError);
        }

        setItinerary(generatedItinerary);
        setIsLoading(false);
      } catch (err) {
        console.error("Error:", err);
        setError("Ocurrio un error inesperado");
        setIsLoading(false);
      }
    }

    loadTrip();
  }, [tripId]);

  const handleUpdateItinerary = async (updatedItinerary: Itinerary) => {
    setItinerary(updatedItinerary);

    // Save to Supabase
    await supabase
      .from("trips")
      .update({ itinerary_data: updatedItinerary })
      .eq("id", tripId);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error || !trip || !itinerary) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-[#1E3A5F] mb-2">
            {error || "No se encontro el itinerario"}
          </h1>
          <p className="text-[#6B7280] mb-6">
            Por favor, intenta crear un nuevo viaje
          </p>
          <a
            href="/trip-form"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#F97316] text-white rounded-full hover:bg-[#EA580C] transition-colors"
          >
            Crear nuevo viaje
          </a>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Header />
      <div className="pt-16">
        <ItineraryView
          trip={trip}
          itinerary={itinerary}
          onUpdate={handleUpdateItinerary}
        />
      </div>
    </main>
  );
}
