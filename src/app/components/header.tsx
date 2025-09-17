import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className=" pt-4">
      <div className="w-1/4 sm:w-1/5">
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
      <div className="mx-auto pt-2 w-full">
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
