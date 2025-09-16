import Image from "next/image";

export function Header() {
  return (
    <header>
      <Image
        src="/header_stolpersteine_logo.png"
        alt="Stolpersteine Ulm"
        className="max-w-1/3 sm:max-w-1/5 px-4"
        width={100}
        height={100}
        layout="responsive"
      />
      <Image
        src="/banner-stolpersteine.png"
        alt="Stolpersteine Ulm"
        className="py-4"
        width={800}
        height={100}
        layout="responsive"
      />
    </header>
  );
}
