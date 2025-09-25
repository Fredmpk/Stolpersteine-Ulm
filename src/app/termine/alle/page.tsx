import { sanityFetch } from "@/sanity/lib/live";
import { ALL_EVENTS_QUERY } from "@/sanity/lib/queries";
import { ALL_EVENTS_QUERYResult } from "@/sanity/types";
import Link from "next/link";
import DateSquare from "../components/DateSquare";
import { PortableText } from "next-sanity";
import { myPortableTextComponents } from "@/app/components/PortableTextComponents";

export default async function AlleEvents() {
  const { data: allEvents } = (await sanityFetch({
    query: ALL_EVENTS_QUERY,
  })) as {
    data: ALL_EVENTS_QUERYResult;
  };

  return (
    <main className="ml-4">
      <ul>
        {allEvents?.map((event) => (
          <li key={event._id}>
            <div className="flex flex-row gap-2">
              <Link href={`/termine/${event?.date?.slice(0, 4)}/${event._id}`}>
                <DateSquare dateString={event.date || ""} />
              </Link>
              <div className="flex flex-col pt-1">
                <Link
                  href={`/termine/${event?.date?.slice(0, 4)}/${event._id}`}
                  className="hover:underline hover:text-blue-900 text-[var(--color-blue-link)] sm:text-xl lg:text-2xl"
                >
                  {event.title}
                </Link>
                <div className="flex gap-3">
                  <p className="font-bold">{event.date?.slice(11, 16)}</p>
                  <p>{event.location}</p>
                </div>
                <div className="overflow-hidden line-clamp-4 ">
                  <PortableText
                    value={event.description || []}
                    components={myPortableTextComponents}
                  />
                </div>
                {event.flyerUrl && (
                  <div>
                    <p>Sie können hier den Flyer herunterladen: </p>
                    <Link
                      href={event.flyerUrl || ""}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 text-[var(--color-blue-link)] hover:underline hover:text-blue-000 text-lg md:text-xl"
                    >
                      DOWNLOAD FLYER
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
