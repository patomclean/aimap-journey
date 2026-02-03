import Header from "@/components/home/Header";
import TripForm from "@/components/form/TripForm";

export const metadata = {
  title: "Planifica tu viaje | AIMAP",
  description: "Crea tu itinerario personalizado con inteligencia artificial",
};

export default function TripFormPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Header />
      <div className="pt-16">
        <TripForm />
      </div>
    </main>
  );
}
