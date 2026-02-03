"use client";

import { ImportanceLevel } from "@/types";

interface ImportanceButtonsProps {
  value: ImportanceLevel;
  onChange: (value: ImportanceLevel) => void;
}

const levels: { value: ImportanceLevel; label: string }[] = [
  { value: "muy_importante", label: "Muy importante" },
  { value: "importante", label: "Importante" },
  { value: "normal", label: "Normal" },
  { value: "poco_importante", label: "Poco importante" },
  { value: "no_importa", label: "No importa" },
];

export default function ImportanceButtons({
  value,
  onChange,
}: ImportanceButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {levels.map((level) => (
        <button
          key={level.value}
          type="button"
          onClick={() => onChange(level.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            value === level.value
              ? "bg-[#1E3A5F] text-white"
              : "bg-gray-100 text-[#6B7280] hover:bg-gray-200"
          }`}
        >
          {level.label}
        </button>
      ))}
    </div>
  );
}
