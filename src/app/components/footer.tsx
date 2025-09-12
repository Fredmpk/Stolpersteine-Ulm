import Link from "next/link";

export function Footer() {
  return (
    <footer className=" bottom-0 w-full flex flex-row bg-zinc-500 align-center items-center justify-between py-4 px-[8vw] text-white font-sm sm:font-base font-bold gap-4 sm:gap-0">
      <div>
        <Link href="/impressum" className="hover:underline">
          Impressum
        </Link>
      </div>

      <div>
        <Link href="/datenschutz" className="hover:underline">
          Datenschutz
        </Link>
      </div>
    </footer>
  );
}
