"use client";
import { useState } from "react";
import Link from "next/link";
import { BACKGROUNDS_QUERYResult } from "@/sanity/types";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export function BurgerMenu({
  backgrounds,
}: {
  backgrounds: BACKGROUNDS_QUERYResult;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const nestedClass = "pl-6";

  const burgerMenuClass = pathname === "/karte" ? " xl:hidden " : "sm:hidden";

  return (
    <div className={` ${burgerMenuClass} relative z-[9999]`}>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-8 right-8 p-2 rounded-lg text-black bg-sidebar-active z-50"
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
          <nav className="fixed top-2 right-2 w-[60%] max-w-xs rounded-lg bg-white shadow-lg z-50 p-4 flex flex-col overflow-y-auto opacity-95 pt-20 gap-2">
            <Link
              href="/eine-buerger-initiative"
              onClick={() => setOpen(false)}
            >
              Ziele der Initiative
            </Link>

            <details>
              <summary className=" text-black">Termine & Nachrichten</summary>
              <div className={`flex flex-col gap-2 mt-2 ${nestedClass}`}>
                <Link href="/termine" onClick={() => setOpen(false)}>
                  Termine
                </Link>
                <Link href="/nachrichten" onClick={() => setOpen(false)}>
                  Nachrichten
                </Link>
              </div>
            </details>

            <details open>
              <summary className="text-black">Spenden & Putzpat*innen</summary>
              <div className={`flex flex-col gap-2 mt-2 ${nestedClass}`}>
                <Link href="/spenden" onClick={() => setOpen(false)}>
                  Spenden
                </Link>
                <Link href="/putzpat*innen" onClick={() => setOpen(false)}>
                  Putzpat*innen
                </Link>
              </div>
            </details>

            <details>
              <summary className="text-black">Bisherige Verlegungen</summary>
              <div className={`flex flex-col gap-2 mt-2 ${nestedClass}`}>
                <Link href="/bisherige-verlegungen/verlegungsablauf" onClick={() => setOpen(false)}>
                  Verlegungsablauf
                </Link>
                <Link href="/bisherige-verlegungen/chronik" onClick={() => setOpen(false)}>
                  Chronik
                </Link>
              </div>
            </details>

            <details open>
              <summary className="text-black">
                Biografien & Hintergründe
              </summary>
              <div className={`flex flex-col gap-2 mt-2 ${nestedClass}`}>
                <Link href="/biografien" onClick={() => setOpen(false)}>
                  Biografien
                </Link>
                <Link href="/karte" onClick={() => setOpen(false)}>
                  Karte
                </Link>

                <details>
                  <summary className="text-black">Hintergründe</summary>
                  <div className={`flex flex-col gap-2 ${nestedClass}`}>
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
            <Link href="/karte" onClick={() => setOpen(false)}>
              Karte
            </Link>

            <Link
              href="https://dzok-ulm.de/"
              target="_blank"
              className="text-left text-black"
            >
              DZOK
            </Link>

            <details>
              <summary className="text-black ">
                Kontakt, Impressum & Datenschutz
              </summary>
              <div className={`flex flex-col gap-2 mt-2 ${nestedClass}`}>
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
