import { HERO_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { HERO_QUERYResult } from "@/sanity/types";
import Link from "next/link";

export default async function Home() {
  const { data: hero } = (await sanityFetch({ query: HERO_QUERY })) as {
    data: HERO_QUERYResult;
  };
  return (
    <main>
      <p className="pl-2 pr-6 py-8 text-base sm:text-lg lg:text-xl">
        {hero?.quote ||
          "»Auschwitz war der Ziel- und Endpunkt, aber in den Wohnungen und Häusern begann das Unfassbare, das Grauen«"}
      </p>
      <p className="pl-6 text-base sm:text-lg lg:text-xl">
        {hero?.quoteAuthor || "Gunter Demnig"}
      </p>
      <p className="md:hidden">____________________________________</p>
      <p className="hidden md:block">
        ______________________________________________________________
      </p>
      <div className="flex flex-col text-[var(--color-brown-hero)] pl-6 pt-10 sm:p-10 lg:text-lg">
        <Link href={hero?.nextStone?.link || ""}>
          Nächste Verlegung: {hero?.nextStone?.title || ""}
        </Link>
        <Link href={hero?.nextMeeting?.link || ""}>
          Datum des nächsten Treffen:{hero?.nextMeeting?.title || ""}
        </Link>
        <Link href={"/spenden"} className="hover:underline text-blue-900">
          Spenden
        </Link>
      </div>
    </main>
  );
}
