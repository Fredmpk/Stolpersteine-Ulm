import { sanityFetch } from "@/sanity/lib/live";
import { EVENT_BY_ID_QUERY } from "@/sanity/lib/queries";
import { EVENT_BY_ID_QUERYResult } from "@/sanity/types";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { myPortableTextComponents } from "@/app/components/PortableTextComponents";
import DateSquare from "../../components/DateSquare";

export default async function EventByIDPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  console.log("Fetching event with _id:", params.id);

  const { data: event } = (await sanityFetch({
    query: EVENT_BY_ID_QUERY,
    params: { id },
  })) as {
    data: EVENT_BY_ID_QUERYResult;
  };
  console.log("event", event);
  return (
    <main className="ml-4">
      <ul>
        <li key={event?._id}>
          <div className="flex flex-row gap-2">
            <DateSquare dateString={event?.date || ""} />
            <div className="flex flex-col pt-1">
              <Link
                href={`/termine/${event?._id}`}
                className="hover:underline hover:text-blue-900 text-[var(--color-blue-link)] sm:text-xl lg:text-2xl"
              >
                {event?.title}
              </Link>
              <div className="flex gap-3">
                <p className="font-bold">{event?.date?.slice(11, 16)}</p>
                <p>{event?.location}</p>
              </div>
              <PortableText
                value={event?.description || []}
                components={myPortableTextComponents}
              />

              {event?.flyerUrl && (
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
      </ul>
    </main>
  );
}
