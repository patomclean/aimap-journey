"use client";

import { ReactNode } from "react";

interface FormSectionProps {
  id: string;
  title: string;
  subtitle?: string;
  required?: boolean;
  children: ReactNode;
}

export default function FormSection({
  id,
  title,
  subtitle,
  required,
  children,
}: FormSectionProps) {
  return (
    <section
      id={id}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 scroll-mt-24"
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#1E3A5F] flex items-center gap-2">
          {title}
          {required && <span className="text-[#F97316]">*</span>}
        </h2>
        {subtitle && (
          <p className="text-[#6B7280] mt-1">{subtitle}</p>
        )}
      </div>
      {children}
    </section>
  );
}
