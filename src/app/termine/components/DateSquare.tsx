// components/DateSquare.tsx
"use client";

import React from "react";

type DateSquareProps = {
  dateString: string;
};

export default function DateSquare({ dateString }: DateSquareProps) {
  const date = new Date(dateString);

  if (!dateString) {
    return null;
  }
  // Intl gives proper localized values
  const weekday = new Intl.DateTimeFormat("de-DE", { weekday: "short" }).format(
    date
  );
  const day = new Intl.DateTimeFormat("de-DE", { day: "numeric" }).format(date);
  const month = new Intl.DateTimeFormat("de-DE", { month: "short" }).format(
    date
  );
  const year = new Intl.DateTimeFormat("de-DE", { year: "numeric" }).format(
    date
  );

  return (
    <div className="flex flex-col items-center py-1 px-6 m-2 rounded-xl shadow-md bg-zinc-200 uppercase max-h-24">
      <div className="text-sm">{weekday}</div>
      <div className=" font-bold">{day}</div>
      <div className="">{month}</div>
      <div className="text-sm text-gray-600">{year}</div>
    </div>
  );
}
