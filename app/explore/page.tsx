import Header from "@/components/home/Header";
import { ExploreView } from "@/components/explore";

export const metadata = {
  title: "Explorar Destinos | AIMAP",
  description: "Descubri destinos increibles y encuentra las mejores ofertas de vuelos",
};

export default function ExplorePage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Header />
      <div className="pt-16">
        <ExploreView />
      </div>
    </main>
  );
}
