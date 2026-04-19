"use client";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { BIOGRAPHY_LIST_QUERYResult } from "@/sanity/types";

type FlatEntry = {
  name: string;
  slug: string;
  adress: string | null;
  id: string;
  date: string | null;
  uniqueKey: string;
};

export default function BiografienClient({
  bios,
}: {
  bios: BIOGRAPHY_LIST_QUERYResult;
}) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const flatList: FlatEntry[] = bios
    .filter((b) => !!b.slug)
    .flatMap((b) => {
      const nameList =
        b.names && b.names.length > 0 ? b.names : [b.title ?? "Untitled"];
      return nameList.map((name, nameIndex) => ({
        name,
        slug: b.slug as string,
        adress: b.adress ?? null,
        id: b._id,
        date: b.date ?? null,
        uniqueKey: `${b._id}-${nameIndex}-${name}`,
      }));
    })
    .sort((a, b) => a.name.localeCompare(b.name, "de"));

  const grouped: Record<string, FlatEntry[]> = {};
  for (const entry of flatList) {
    const firstChar = entry.name.trim()[0];
    if (!firstChar) continue;
    const letter = firstChar.toUpperCase();
    if (!grouped[letter]) {
      grouped[letter] = [];
    }
    grouped[letter].push(entry);
  }

  const availableLetters = Object.keys(grouped).sort((a, b) =>
    a.localeCompare(b, "de"),
  );

  const alphabet: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <main className="ml-4">
      {/* Alphabet Navigation */}
      <div className="flex flex-wrap gap-1 mb-8 sticky top-0 bg-white py-2 z-10 border-b border-gray-200 shadow-sm">
        {alphabet.map((letter) => {
          const isAvailable = availableLetters.includes(letter);
          return isAvailable ? (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="w-7 h-7 flex items-center justify-center rounded font-bold text-sm text-[var(--color-blue-link)] hover:bg-[var(--color-sidebar-active)] hover:text-[var(--color-sidebar-text-active)] transition-colors"
            >
              {letter}
            </a>
          ) : (
            <span
              key={letter}
              className="w-7 h-7 flex items-center justify-center rounded text-sm text-gray-300 cursor-default"
            >
              {letter}
            </span>
          );
        })}
      </div>

      {/* Biography List grouped by letter */}
      <div className="flex flex-col gap-6">
        {availableLetters.map((letter) => {
          const entries = grouped[letter];
          if (!entries || entries.length === 0) return null;
          return (
            <section
              key={`section-${letter}`}
              id={`letter-${letter}`}
              className="scroll-mt-12"
            >
              <h2 className="text-2xl font-bold border-b border-gray-300 mb-2 pb-1">
                {letter}
              </h2>
              <ul>
                {entries.map((entry) => (
                  <li
                    key={entry.uniqueKey}
                    className="grid grid-cols-[1.5fr_2fr] gap-x-8 items-start py-2"
                  >
                    <div>
                      <a href={`/biografien/${entry.slug}`}>
                        <p className="text-blue-800 hover:underline hover:text-blue-900">
                          {entry.name}
                        </p>
                      </a>
                    </div>
                    <div>
                      <p className="text-sm">{entry.adress ?? ""}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-[var(--color-blue-link)] text-white p-3 rounded-full shadow-lg hover:opacity-80 transition-opacity z-50"
          aria-label="Zurück nach oben"
        >
          <ArrowUp size={22} />
        </button>
      )}
    </main>
  );
}
