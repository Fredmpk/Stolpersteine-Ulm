import Image from "next/image";

export function Header() {
  return (
    <header className="flex flex-row justify-between  sm:block mx-4 items-center pt-4">
      <div className="w-1/4 sm:w-1/5">
        <Image
          src="/header_stolpersteine_logo.png"
          alt="Stolpersteine Ulm"
          width={100}
          height={100}
          className="h-auto w-full"
        />
      </div>
      <div className="w-3/5 sm:w-full">
        <Image
          src="/banner-stolpersteine.png"
          alt="Stolpersteine Ulm"
          width={800}
          height={100}
          className="h-auto w-full sm:py-4"
        />
      </div>
    </header>
  );
}
