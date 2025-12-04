"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  const showHeaderImage = pathname === "/karte" ? "hidden xl:flex" : "flex";
  return (
    <header className="py-4 xl:py-8">
      <div className="w-1/4 sm:w-1/5 md:w-1/6 lg:w-1/7 lg:left-32 xl:left-44 2xl:left-52 lg:absolute">
        <Link href="/">
          <Image
            src="/header_stolpersteine_logo.png"
            alt="Stolpersteine Ulm"
            width={100}
            height={100}
            className="h-auto w-full mb-2 xl:mb-8"
          />
        </Link>
      </div>
      <div className="mx-auto pt-2 w-full lg:pt-28 xl:pt-34 2xl:pt-44 lg:w-19/20">
        <Link href="/">
          <div className={showHeaderImage}>
            <Image
              src="/banner-stolpersteine.png"
              alt="Stolpersteine Ulm"
              width={800}
              height={100}
              className="h-auto w-full sm:py-4 xl:py-8"
            />
          </div>
        </Link>
      </div>
    </header>
  );
}
