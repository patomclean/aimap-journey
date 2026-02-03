"use client";

import { useState, ReactElement } from "react";

interface InterestSliderProps {
  label: string;
  icon: ReactElement;
  value: number;
  comment: string;
  onChange: (value: number, comment: string) => void;
}

export default function InterestSlider({
  label,
  icon,
  value,
  comment,
  onChange,
}: InterestSliderProps) {
  const [showComment, setShowComment] = useState(false);

  return (
    <div className="py-4 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-10 h-10 rounded-full bg-[#F8FAFC] flex items-center justify-center text-[#1E3A5F]">
          {icon}
        </div>
        <span className="font-medium text-[#1E3A5F] flex-1">{label}</span>
        <span className="text-2xl font-bold text-[#F97316] w-8 text-center">
          {value}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs text-[#6B7280]">1</span>
        <input
          type="range"
          min="1"
          max="10"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value), comment)}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#F97316]"
          style={{
            background: `linear-gradient(to right, #F97316 0%, #F97316 ${
              ((value - 1) / 9) * 100
            }%, #E5E7EB ${((value - 1) / 9) * 100}%, #E5E7EB 100%)`,
          }}
        />
        <span className="text-xs text-[#6B7280]">10</span>
      </div>

      <button
        type="button"
        onClick={() => setShowComment(!showComment)}
        className="mt-3 text-sm text-[#0EA5E9] hover:text-[#0284C7] flex items-center gap-1"
      >
        <svg className={`w-4 h-4 transition-transform ${showComment ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        Algo que deseo comentar
      </button>

      {showComment && (
        <textarea
          value={comment}
          onChange={(e) => onChange(value, e.target.value)}
          placeholder="Escribe tu comentario..."
          className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent resize-none"
          rows={2}
        />
      )}
    </div>
  );
}
