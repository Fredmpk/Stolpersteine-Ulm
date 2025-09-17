import Image from "next/image";

export function Header() {
  return (
    <header className=" pt-4">
      <div className="w-1/4 sm:w-1/5">
        <Image
          src="/header_stolpersteine_logo.png"
          alt="Stolpersteine Ulm"
          width={100}
          height={100}
          className="h-auto w-full"
        />
      </div>
      <div className="mx-auto pt-2 w-7/8 sm:w-full">
        <Image
          src="/banner-stolpersteine.png"
          alt="Stolpersteine Ulm"
          width={800}
          height={100}
          className="h-auto w-full sm:py-4 "
        />
      </div>
    </header>
  );
}
