import { HERO_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { HERO_QUERYResult } from "@/sanity/types";
import Link from "next/link";

const formatDate = (date?: string | null) => {
  if (!date) return "";
  return new Date(date).toLocaleString("de-DE", {
    timeZone: "Europe/Berlin",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default async function Home() {
  const { data: hero } = (await sanityFetch({ query: HERO_QUERY })) as {
    data: HERO_QUERYResult;
  };

  return (
    <main>
      <p className="pl-2 pr-6 py-8 text-base sm:text-lg lg:text-xl">
        {hero?.quote ||
          "»Auschwitz war der Ziel- und Endpunkt, aber in den Wohnungen und Häusern begann das Unfassbare, das Grauen« babubu"}
      </p>

      <p className="pl-6 text-base sm:text-lg lg:text-xl">
        {hero?.quoteAuthor || "Gunter Demnig"}
      </p>

      <p className="md:hidden">____________________________________</p>
      <p className="hidden md:block lg:hidden">
        ___________________________________________
      </p>
      <p className="hidden lg:block">
        ______________________________________________________________
      </p>

      <div className="flex flex-col gap-2 text-[var(--color-brown-hero)] pl-6 pt-10 sm:p-10 lg:text-lg">
        <Link href={hero?.nextStone?.link || "#"}>
          Nächste Verlegung: {hero?.nextStone?.title || ""} am{" "}
          {formatDate(hero?.nextStone?.date)}
        </Link>

        <Link href={hero?.nextMeeting?.link || "#"}>
          Nächstes Treffen: {hero?.nextMeeting?.title || ""} am{" "}
          {formatDate(hero?.nextMeeting?.date)}
        </Link>
      </div>
      <div className="pt-4 flex justify-center">
        <Link
          href="/spenden"
          className="inline-block px-4 py-1.5 text-base sm:px-6 sm:py-2 sm:text-xl rounded-full border border-zinc-400 text-zinc-700 bg-zinc-100 hover:bg-zinc-200 hover:border-zinc-500 hover:text-zinc-900 transition-all duration-200 font-medium tracking-wide shadow-sm"
        >
          Spenden
        </Link>
      </div>
    </main>
  );
}
