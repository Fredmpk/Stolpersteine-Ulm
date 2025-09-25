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
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log("Fetching event with _id:", id);

  const { data: event } = (await sanityFetch({
    query: EVENT_BY_ID_QUERY,
    params: { id },
  })) as {
    data: EVENT_BY_ID_QUERYResult;
  };
  console.log("event", event);
  return (
    <main className="ml-4 mb-8">
      <ul>
        <li key={event?._id}>
          <div className="flex flex-row gap-2">
            <DateSquare dateString={event?.date || ""} />
            <div className="flex flex-col pt-1">
              <div className="sm:text-xl lg:text-2xl">{event?.title}</div>
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
                  <p className="my-2 mx-4">
                    Sie können hier den Flyer herunterladen:{" "}
                  </p>
                  <Link
                    href={event.flyerUrl || ""}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" text-[var(--color-blue-link)] hover:underline hover:text-blue-900 text-lg md:text-xl mb-12 mx-4"
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
