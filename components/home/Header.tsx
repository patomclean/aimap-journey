"use client";

import Link from "next/link";

interface HeaderProps {
  isLoggedIn?: boolean;
  userName?: string;
}

export default function Header({ isLoggedIn = false, userName }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1E3A5F] rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
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
            </div>
            <span className="text-xl font-bold text-[#1E3A5F]">AIMAP</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/about"
              className="text-[#6B7280] hover:text-[#1E3A5F] transition-colors"
            >
              Somos AIMAP
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-[#6B7280] hover:text-[#1E3A5F] transition-colors"
                >
                  Dashboard
                </Link>
                <span className="text-[#1E3A5F] font-medium">{userName || "Usuario"}</span>
                <button className="text-[#6B7280] hover:text-[#F97316] transition-colors">
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-[#6B7280] hover:text-[#1E3A5F] transition-colors"
                >
                  Inicia Sesion
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-[#F97316] hover:bg-[#EA580C] text-white px-4 py-2 rounded-full transition-colors"
                >
                  Registrate
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-[#1E3A5F]">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
