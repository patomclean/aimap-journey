"use client";

import Link from "next/link";
import Button from "../ui/Button";

const stats = [
  { value: "10K+", label: "Viajes creados" },
  { value: "150+", label: "Destinos" },
  { value: "4.9", label: "Rating promedio" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background Placeholder */}
      <div className="absolute inset-0 z-0">
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A5F]/70 via-[#1E3A5F]/50 to-[#1E3A5F]/70 z-10" />

        {/* Placeholder background - replace with video later */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%231E3A5F'/%3E%3Cstop offset='50%25' style='stop-color:%230EA5E9'/%3E%3Cstop offset='100%25' style='stop-color:%231E3A5F'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23grad)' width='1920' height='1080'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Video element - uncomment when you have a video file */}
        {/*
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
        */}
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          Comenza a planificar tu nuevo viaje
        </h1>

        <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-10">
          Crea itinerarios personalizados con IA. Optimiza tu presupuesto y descubri experiencias unicas.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/trip-form">
            <Button variant="primary" size="lg" icon={<ArrowRight />}>
              Crea tu viaje
            </Button>
          </Link>
          <Link href="/explore">
            <Button variant="secondary" size="lg">
              Explorar
            </Button>
          </Link>
        </div>

        {/* Social Proof Stats */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#how-it-works" className="text-white/70 hover:text-white transition-colors">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

function ArrowRight() {
  return (
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
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
  );
}
