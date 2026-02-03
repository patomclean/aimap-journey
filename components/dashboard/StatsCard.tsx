"use client";

import { ReactElement } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactElement;
  iconBgColor: string;
}

export default function StatsCard({
  title,
  value,
  icon,
  iconBgColor,
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#6B7280] mb-1">{title}</p>
          <p className="text-3xl font-bold text-[#1E3A5F]">{value}</p>
        </div>
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBgColor}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
