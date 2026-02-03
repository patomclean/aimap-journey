"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/home/Header";
import { DashboardView } from "@/components/dashboard";
import { supabase } from "@/lib/supabase";
import { Trip } from "@/types";

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("Usuario");
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        // Check authentication status
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          setIsLoggedIn(true);
          setUserName(
            session.user.user_metadata?.full_name ||
              session.user.email?.split("@")[0] ||
              "Usuario"
          );

          // Fetch user's trips
          const { data: tripsData, error } = await supabase
            .from("trips")
            .select("*")
            .eq("user_id", session.user.id)
            .order("created_at", { ascending: false });

          if (!error && tripsData) {
            setTrips(tripsData as Trip[]);
          }
        } else {
          // For demo purposes, load all trips without user filter
          // In production, redirect to login
          const { data: tripsData, error } = await supabase
            .from("trips")
            .select("*")
            .is("user_id", null)
            .order("created_at", { ascending: false });

          if (!error && tripsData) {
            setTrips(tripsData as Trip[]);
          }
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const handleDeleteTrip = async (id: string) => {
    try {
      const { error } = await supabase.from("trips").delete().eq("id", id);

      if (error) {
        console.error("Error deleting trip:", error);
        return;
      }

      // Update local state
      setTrips((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#F8FAFC]">
        <Header isLoggedIn={isLoggedIn} userName={userName} />
        <div className="pt-16 flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 border-4 border-[#0EA5E9] border-t-transparent rounded-full animate-spin" />
            <p className="text-[#6B7280]">Cargando tu dashboard...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Header isLoggedIn={isLoggedIn} userName={userName} />
      <div className="pt-16">
        <DashboardView
          userName={userName}
          trips={trips}
          onDeleteTrip={handleDeleteTrip}
        />
      </div>
    </main>
  );
}
