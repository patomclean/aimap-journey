"use client";

const steps = [
  {
    number: 1,
    icon: "location",
    title: "Elegi tu destino",
    description: "Selecciona el lugar que queres visitar y contanos tus preferencias de viaje.",
  },
  {
    number: 2,
    icon: "sparkles",
    title: "IA personaliza tu viaje",
    description: "Nuestra inteligencia artificial crea un itinerario unico adaptado a tus intereses y presupuesto.",
  },
  {
    number: 3,
    icon: "calendar",
    title: "Revisa y ajusta",
    description: "Explora tu itinerario detallado dia por dia y hace los cambios que necesites.",
  },
  {
    number: 4,
    icon: "plane",
    title: "Empeza tu aventura!",
    description: "Descarga tu itinerario y disfruta de un viaje perfectamente planificado.",
  },
];

const iconComponents: Record<string, React.ReactNode> = {
  location: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  sparkles: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  calendar: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  plane: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  ),
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A5F] mb-4">
            Como funciona AIMAP?
          </h2>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
            Planifica tu viaje perfecto en simples pasos
          </p>
        </div>

        {/* Timeline Steps */}
        <div className="relative">
          {/* Vertical line for desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#0EA5E9]/30 -translate-x-1/2" />

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`relative lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center ${
                  index > 0 ? "lg:mt-16" : ""
                }`}
              >
                {/* Step content - alternating sides */}
                <div
                  className={`lg:text-${index % 2 === 0 ? "right" : "left"} ${
                    index % 2 === 0 ? "lg:pr-16" : "lg:pl-16 lg:col-start-2"
                  }`}
                >
                  <div
                    className={`bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow ${
                      index % 2 === 0 ? "lg:ml-auto" : "lg:mr-auto"
                    } max-w-md`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-[#F97316] rounded-full flex items-center justify-center text-white shrink-0">
                        {iconComponents[step.icon]}
                      </div>
                      <h3 className="text-xl font-semibold text-[#1E3A5F]">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-[#6B7280]">{step.description}</p>
                  </div>
                </div>

                {/* Center dot - only visible on desktop */}
                <div
                  className={`hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center ${
                    index % 2 === 0 ? "" : "lg:col-start-1 lg:row-start-1"
                  }`}
                >
                  <div className="w-10 h-10 bg-[#F97316] rounded-full flex items-center justify-center text-white font-bold text-lg border-4 border-white shadow-md">
                    {step.number}
                  </div>
                </div>

                {/* Empty column for grid alignment */}
                {index % 2 === 0 ? (
                  <div className="hidden lg:block" />
                ) : (
                  <div className="hidden lg:block lg:col-start-1 lg:row-start-1" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
