"use client";

import { EVENT_YEARS_QUERYResult } from "@/sanity/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function YearsList({
  years,
}: {
  years: EVENT_YEARS_QUERYResult;
}) {
  const pathname = usePathname(); // current URL, e.g. "/termine/2024"

  const yearLinks = Array.from(
    new Set(years?.map((y) => y.year?.slice(0, 4)))
  ).sort((a, b) => Number(a) - Number(b));

  const links = [
    { label: "Alle", href: "/termine/alle" },
    { label: "Anstehende", href: "/termine" },
    ...yearLinks.map((year) => ({ label: year, href: `/termine/${year}` })),
  ];

  return (
    <div className="ml-4">
      <h1 className="text-2xl md:text-4xl text-[var(--color-heading)] my-6">
        Termine
      </h1>
      <ul className="flex flex-row gap-2 text-sm lg:text-base">
        {links.map((link, idx) => {
          const isActive = pathname.startsWith(link.href); // highlight if URL matches
          return (
            <li key={link.href} className="flex items-center">
              <Link
                href={link.href}
                className={`hover:underline ${
                  isActive
                    ? "font-bold text-blue-900"
                    : "text-[var(--color-blue-link)]"
                }`}
              >
                {link.label}
              </Link>
              {idx < links.length - 1 && (
                <span className="text-black mx-1">|</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
