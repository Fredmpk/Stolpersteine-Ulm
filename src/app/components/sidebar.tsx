"use client";
import { BACKGROUNDS_QUERYResult } from "@/sanity/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { ChevronDown } from "lucide-react";

export function Sidebar({
  backgrounds,
}: {
  backgrounds: BACKGROUNDS_QUERYResult;
}) {
  const pathname = usePathname();
  const segment = pathname.split("/")[1];

  const [openDates, setOpenDates] = useState(false);
  const [openDonations, setOpenDonations] = useState(false);
  const [openBiographies, setOpenBiographies] = useState(false);
  const [openVerlegungen, setOpenVerlegungen] = useState(false);
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

  const nestedClass = "pl-6";

  const buttonClass =
    "flex items-center justify-between px-4 py-2 text-left w-full rounded text-[var(--color-sidebar-text)] hover:cursor-pointer";

  const sidebarClass =
    pathname === "/karte"
      ? "min-w-1/3 md:min-w-1/4 flex-col pt-4 hidden xl:flex mr-4"
      : "w-1/3 md:w-1/4 lg:w-1/5 xl:1/6 flex-col pt-4 hidden sm:flex mr-4";

  return (
    <aside className={sidebarClass}>
      <Link
        href="/eine-buerger-initiative"
        className={linkClass("/eine-buerger-initiative")}
      >
        Ziele der Initiative
      </Link>

      <button onClick={() => setOpenDates(!openDates)} className={buttonClass}>
        Termine & Nachrichten
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${openDates ? "rotate-180" : ""}`}
        />
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
        className={buttonClass}
      >
        Spenden & Putzpat*innen
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${openDonations ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={openDonations ? `flex flex-col ${nestedClass}` : "hidden"}
      >
        <Link href="/spenden" className={linkClass("/spenden")}>
          Spenden
        </Link>
        <Link href="/putzpat*innen" className={linkClass("/putzpat*innen")}>
          Putzpat*innen
        </Link>
      </div>

      <button
        onClick={() => setOpenVerlegungen(!openVerlegungen)}
        className={buttonClass}
      >
        Bisherige Verlegungen
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${openVerlegungen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={openVerlegungen ? `flex flex-col ${nestedClass}` : "hidden"}
      >
        <Link
          href="/bisherige-verlegungen/verlegungsablauf"
          className={linkClass("/bisherige-verlegungen/verlegungsablauf")}
        >
          Verlegungsablauf
        </Link>
        <Link
          href="/bisherige-verlegungen/chronik"
          className={linkClass("/bisherige-verlegungen/chronik")}
        >
          Chronik
        </Link>
      </div>

      <button
        onClick={() => setOpenBiographies(!openBiographies)}
        className={buttonClass}
      >
        Biografien & Hintergründe
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${openBiographies ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={openBiographies ? `flex flex-col ${nestedClass}` : "hidden"}
      >
        <Link href="/biografien" className={linkClass("/biografien")}>
          Biografien
        </Link>

        <button
          onClick={() => setOpenBackgrounds(!openBackgrounds)}
          className={buttonClass}
        >
          Hintergründe
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${openBackgrounds ? "rotate-180" : ""}`}
          />
        </button>
        <div
          className={
            openBackgrounds ? `flex flex-col ${nestedClass} pl-6` : "hidden"
          }
        >
          {backgrounds.map((background) => (
            <Link
              key={background._id}
              href={`/hintergruende/${background.slug}`}
              className={linkClass(`/hintergruende/${background.slug}`)}
            >
              {background.title}
            </Link>
          ))}
        </div>
      </div>

      <Link href="/karte" className={linkClass("/karte")}>
        Karte
      </Link>

      <Link
        href="https://dzok-ulm.de/"
        target="_blank"
        className="block px-4 py-2 text-left w-full rounded text-[var(--color-sidebar-text)]"
      >
        DZOK
      </Link>

      <button onClick={() => setOpenLegal(!openLegal)} className={buttonClass}>
        Kontakt, Impressum & Datenschutz
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${openLegal ? "rotate-180" : ""}`}
        />
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

      <div className="flex gap-4 mt-8 ml-4">
        <Link
          href="https://www.facebook.com/stolpersteinefuerulm/"
          target="_blank"
          aria-label="Facebook"
        >
          <FaFacebook
            size={24}
            className="text-[#1877F2] hover:opacity-80 transition-opacity"
          />
        </Link>
        <Link
          href="https://www.instagram.com/stolpersteineulm/"
          target="_blank"
          aria-label="Instagram"
        >
          <FaInstagram
            size={24}
            className="text-[#E1306C] hover:opacity-80 transition-opacity"
          />
        </Link>
      </div>
    </aside>
  );
}
