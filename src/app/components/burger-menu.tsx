"use client";
import { useState } from "react";
import Link from "next/link";
import { BACKGROUNDS_QUERYResult } from "@/sanity/types";
import { Menu, X } from "lucide-react";

export function BurgerMenu({
  backgrounds,
}: {
  backgrounds: BACKGROUNDS_QUERYResult;
}) {
  const [open, setOpen] = useState(false);

  const nestedClass = "pl-6";

  return (
    <div className="sm:hidden">
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-8 right-8 z-60 p-2 rounded-lg text-black bg-[var(--color-sidebar-active)]"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-zinc-400 opacity-50 z-40"
            onClick={() => setOpen(false)}
          />

          {/* Sliding menu panel */}
          <nav className="fixed top-2 right-2 w-[60%] max-w-xs rounded-lg bg-white shadow-lg z-50 p-4 flex flex-col overflow-y-auto opacity-95 pt-20">
            <Link
              href="/eine-buerger-initiative"
              onClick={() => setOpen(false)}
            >
              Ziele der Initiative
            </Link>

            <details className="mb-2">
              <summary className="px-4 py-2 cursor-pointer text-[var(--color-sidebar-text)]">
                Termine & Nachrichten
              </summary>
              <div className={`flex flex-col ${nestedClass}`}>
                <Link href="/termine" onClick={() => setOpen(false)}>
                  Termine
                </Link>
                <Link href="/nachrichten" onClick={() => setOpen(false)}>
                  Nachrichten
                </Link>
              </div>
            </details>

            <details className="mb-2">
              <summary className="px-4 py-2 cursor-pointer text-[var(--color-sidebar-text)]">
                Spenden & Putzpat*innen
              </summary>
              <div className={`flex flex-col ${nestedClass}`}>
                <Link href="/spenden" onClick={() => setOpen(false)}>
                  Spenden
                </Link>
                <Link href="/putzpat*innen" onClick={() => setOpen(false)}>
                  Putzpat*innen
                </Link>
              </div>
            </details>

            <Link href="/verlegungen" onClick={() => setOpen(false)}>
              Bisherige Verlegungen
            </Link>

            <details className="mb-2">
              <summary className="px-4 py-2 cursor-pointer text-[var(--color-sidebar-text)]">
                Biografien, Karte & Hintergründe
              </summary>
              <div className={`flex flex-col ${nestedClass}`}>
                <Link href="/biografien" onClick={() => setOpen(false)}>
                  Biografien
                </Link>
                <Link href="/karte" onClick={() => setOpen(false)}>
                  Karte
                </Link>

                <details className="mb-2">
                  <summary className="px-4 py-2 cursor-pointer text-[var(--color-sidebar-text)]">
                    Hintergründe
                  </summary>
                  <div className={`flex flex-col ${nestedClass}`}>
                    {backgrounds.map((background) => (
                      <Link
                        key={background._id}
                        href={`/hintergruende/${background.slug}`}
                        onClick={() => setOpen(false)}
                      >
                        {background.title}
                      </Link>
                    ))}
                  </div>
                </details>
              </div>
            </details>

            <Link
              href="https://dzok-ulm.de/"
              target="_blank"
              className="px-4 py-2 text-left w-full rounded text-[var(--color-sidebar-text)]"
            >
              DZOK
            </Link>

            <details className="mb-2">
              <summary className="px-4 py-2 cursor-pointer text-[var(--color-sidebar-text)]">
                Kontakt, Impressum & Datenschutz
              </summary>
              <div className={`flex flex-col ${nestedClass}`}>
                <Link href="/kontakt" onClick={() => setOpen(false)}>
                  Kontakt
                </Link>
                <Link href="/impressum" onClick={() => setOpen(false)}>
                  Impressum
                </Link>
                <Link href="/datenschutz" onClick={() => setOpen(false)}>
                  Datenschutz
                </Link>
              </div>
            </details>
          </nav>
        </>
      )}
    </div>
  );
}
