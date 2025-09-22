import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="pt-4">
      <div className="w-1/4 sm:w-1/5 md:w-1/6 lg:w-1/7 lg:left-20 lg:absolute">
        <Link href="/">
          <Image
            src="/header_stolpersteine_logo.png"
            alt="Stolpersteine Ulm"
            width={100}
            height={100}
            className="h-auto w-full mb-2"
          />
        </Link>
      </div>
      <div className="mx-auto pt-2 w-full lg:pt-28 xl:pt-34 2xl:pt-44 lg:w-19/20">
        <Link href="/">
          <Image
            src="/banner-stolpersteine.png"
            alt="Stolpersteine Ulm"
            width={800}
            height={100}
            className="h-auto w-full sm:py-4 "
          />
        </Link>
      </div>
    </header>
  );
}
