import { sanityFetch } from "@/sanity/lib/live";
import { EVENT_YEARS_QUERY } from "@/sanity/lib/queries";
import { EVENT_YEARS_QUERYResult } from "@/sanity/types";
import Link from "next/link";

export default async function EventsPage() {
  const { data: years } = (await sanityFetch({
    query: EVENT_YEARS_QUERY,
  })) as {
    data: EVENT_YEARS_QUERYResult;
  };

  return (
    <div>
      <h1 className="text-2xl md:text-4xl text-[var(--color-heading)] my-6">
        Termine
      </h1>
      <ul className="flex flex-row gap-2 text-sm lg:text-base text-blue-700">
        <li>
          {" "}
          <Link
            href="/termine/alle"
            className="hover:underline hover:text-blue-900"
          >
            Alle
          </Link>
          <span className="text-black"> | </span>
        </li>
        <li>
          {" "}
          <Link
            href="/termine/anstehende"
            className="hover:underline hover:text-blue-900"
          >
            Anstehende
          </Link>
          <span className="text-black"> | </span>
        </li>
        {Array.from(new Set(years?.map((year) => year.year?.slice(0, 4))))
          .sort((a, b) => Number(a) - Number(b))
          .map((year) => (
            <li key={year}>
              <Link
                href={`/termine/${year}`}
                className="hover:underline hover:text-blue-900"
              >
                {year}
              </Link>
              <span className="text-black"> | </span>
            </li>
          ))}
      </ul>
    </div>
  );
}
