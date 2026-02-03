"use client";

import { useEffect, useState } from "react";

const loadingMessages = [
  "Analizando tus preferencias...",
  "Buscando los mejores destinos...",
  "Optimizando rutas y experiencias...",
  "Seleccionando actividades personalizadas...",
  "Calculando presupuesto optimo...",
  "Preparando tu itinerario perfecto...",
];

export default function LoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [dots, setDots] = useState("");

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 3000);

    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => {
      clearInterval(messageInterval);
      clearInterval(dotsInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E3A5F] via-[#1E3A5F] to-[#0EA5E9] flex items-center justify-center">
      <div className="text-center px-4">
        {/* Animated Logo */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-4 border-white/20 animate-spin" style={{ animationDuration: "3s" }}>
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#F97316] rounded-full" />
          </div>

          {/* Inner pulsing circle */}
          <div className="absolute inset-4 rounded-full bg-white/10 animate-pulse" />

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Pin icon */}
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>

              {/* Animated plane orbiting */}
              <div
                className="absolute -inset-8 animate-spin"
                style={{ animationDuration: "4s" }}
              >
                <svg
                  className="w-6 h-6 text-[#F97316] absolute -top-3 left-1/2 -translate-x-1/2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Logo text */}
        <h1 className="text-3xl font-bold text-white mb-2">AIMAP</h1>

        {/* Main loading text */}
        <h2 className="text-xl text-white/90 mb-4">
          Generando tu itinerario{dots}
        </h2>

        {/* Animated subtitle */}
        <p className="text-white/70 transition-opacity duration-500">
          {loadingMessages[messageIndex]}
        </p>

        {/* Progress bar */}
        <div className="mt-8 max-w-xs mx-auto">
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-[#F97316] rounded-full animate-loading-bar" />
          </div>
        </div>

        {/* Tips */}
        <p className="mt-8 text-sm text-white/50 max-w-md mx-auto">
          Tip: Podes editar el itinerario una vez generado para ajustarlo a tus preferencias
        </p>
      </div>

      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-40 h-40 bg-[#0EA5E9]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-60 h-60 bg-[#F97316]/10 rounded-full blur-3xl" />
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% {
            width: 0%;
            margin-left: 0%;
          }
          50% {
            width: 60%;
            margin-left: 20%;
          }
          100% {
            width: 0%;
            margin-left: 100%;
          }
        }
        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
