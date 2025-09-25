import { sanityFetch } from "@/sanity/lib/live";
import { FUTURE_EVENTS_QUERY } from "@/sanity/lib/queries";
import { FUTURE_EVENTS_QUERYResult } from "@/sanity/types";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { myPortableTextComponents } from "@/app/components/PortableTextComponents";
import DateSquare from "./components/DateSquare";

export default async function AnstehendeEvents() {
  const { data: futureEvents } = (await sanityFetch({
    query: FUTURE_EVENTS_QUERY,
  })) as {
    data: FUTURE_EVENTS_QUERYResult;
  };

  return (
    <main className="ml-4">
      <ul>
        {futureEvents?.map((event) => (
          <li key={event._id}>
            <div className="flex flex-row gap-2">
              <DateSquare dateString={event.date || ""} />
              <div className="flex flex-col pt-1">
                <Link
                  href={`/termine/${event?.date?.slice(0, 4)}/${event._id}`}
                  className="hover:underline hover:text-blue-900 text-[var(--color-blue-link)] text-xl lg:text-2xl"
                >
                  {event.title}
                </Link>
                <div className="flex gap-3">
                  <p className="font-bold">{event.date?.slice(11, 16)}</p>
                  <p>{event.location}</p>
                </div>
                <div className="overflow-hidden line-clamp-4">
                  <div className="hidden sm:block">
                    <PortableText
                      value={event.description || []}
                      components={myPortableTextComponents}
                    />

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
              </div>
            </div>

            <div className="block sm:hidden ">
              <div className="overflow-hidden line-clamp-4">
                <PortableText
                  value={event.description || []}
                  components={myPortableTextComponents}
                />

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
