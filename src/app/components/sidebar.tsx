"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Sidebar() {
  const pathname = usePathname();
  const segment = pathname.split("/")[1];

  const [openDates, setOpenDates] = useState(false);
  const [openDonations, setOpenDonations] = useState(false);
  const [openBiographies, setOpenBiographies] = useState(false);
  const [openBackgrounds, setOpenBackgrounds] = useState(false);
  const [openLegal, setOpenLegal] = useState(false);

  function isActiveLink(href: string) {
    const hrefSegment = href.replace("/", "");
    return segment === hrefSegment;
  }

  const linkClass = (href: string) =>
    `block pl-4 py-2 text-left w-full rounded ${
      isActiveLink(href)
        ? "bg-[var(--color-sidebar-active)] text-[var(--color-sidebar-text-active)]"
        : "text-[var(--color-sidebar-text)]"
    }`;

  const nestedClass = "pl-6"; // indentation for nested links

  return (
    <aside className="min-w-1/3 md:min-w-1/4 flex flex-col pt-4">
      <Link
        href="/eine-buerger-initiative"
        className={linkClass("/eine-buerger-initiative")}
      >
        Ziele der Initiative
      </Link>

      <button
        onClick={() => setOpenDates(!openDates)}
        className="block px-4 py-2 text-left w-full rounded text-[var(--color-sidebar-text)] hover:cursor-pointer"
      >
        Termine & Nachrichten
      </button>
      <div className={openDates ? `flex flex-col ${nestedClass}` : "hidden"}>
        <Link href="/termine" className={linkClass("/termine")}>
          Termine
        </Link>
        <Link href="/nachrichten" className={linkClass("/nachrichten")}>
          Nachrichten
        </Link>
      </div>

      <button
        onClick={() => setOpenDonations(!openDonations)}
        className="block px-4 py-2 text-left w-full rounded text-[var(--color-sidebar-text)] hover:cursor-pointer"
      >
        Spenden & Putzpat*innen
      </button>
      <div
        className={openDonations ? `flex flex-col ${nestedClass}` : "hidden"}
      >
        <Link href="/spenden" className={linkClass("/spenden")}>
          Spenden & Putzpat*innen
        </Link>
        <Link href="/putzpatinnen" className={linkClass("/putzpatinnen")}>
          Putzpat*innen
        </Link>
      </div>

      <Link href="/verlegungen" className={linkClass("/verlegungen")}>
        Bisherige Verlegungen
      </Link>

      <button
        onClick={() => setOpenBiographies(!openBiographies)}
        className="block px-4 py-2 text-left w-full rounded text-[var(--color-sidebar-text)] hover:cursor-pointer"
      >
        Biografien, Karte & Hintergründe
      </button>
      <div
        className={openBiographies ? `flex flex-col ${nestedClass}` : "hidden"}
      >
        <Link href="/biografien" className={linkClass("/biografien")}>
          Biografien
        </Link>
        <Link href="/karte" className={linkClass("/karte")}>
          Karte
        </Link>

        <button
          onClick={() => setOpenBackgrounds(!openBackgrounds)}
          className="block px-4 py-2 text-left w-full rounded text-[var(--color-sidebar-text)] hover:cursor-pointer"
        >
          Hintergründe
        </button>
        <div
          className={
            openBackgrounds ? `flex flex-col ${nestedClass} pl-6` : "hidden"
          }
        >
          <Link
            href="/verfolgung-der-juden-in-ulm"
            className={linkClass("/verfolgung-der-juden-in-ulm")}
          >
            Verfolgung der Juden in Ulm
          </Link>
          <Link href="/aktion-t4" className={linkClass("/aktion-t4")}>
            Aktion T4 - Krankenmorde
          </Link>
        </div>
      </div>

      <Link
        href="https://dzok-ulm.de/"
        target="_blank"
        className="block px-4 py-2 text-left w-full rounded text-[var(--color-sidebar-text)]"
      >
        DZOK
      </Link>

      <button
        onClick={() => setOpenLegal(!openLegal)}
        className="block px-4 py-2 text-left w-full rounded text-[var(--color-sidebar-text)] hover:cursor-pointer"
      >
        Kontakt, Impressum & Datenschutz
      </button>
      <div className={openLegal ? `flex flex-col ${nestedClass}` : "hidden"}>
        <Link href="/kontakt" className={linkClass("/kontakt")}>
          Kontakt
        </Link>
        <Link href="/impressum" className={linkClass("/impressum")}>
          Impressum
        </Link>
        <Link href="/datenschutz" className={linkClass("/datenschutz")}>
          Datenschutz
        </Link>
      </div>
    </aside>
  );
}
