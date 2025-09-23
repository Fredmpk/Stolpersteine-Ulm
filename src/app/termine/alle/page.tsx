import { sanityFetch } from "@/sanity/lib/live";
import { ALL_EVENTS_QUERY } from "@/sanity/lib/queries";
import { ALL_EVENTS_QUERYResult } from "@/sanity/types";
import Link from "next/link";

export default async function AlleEvents() {

    const { data: allEvents } = (await sanityFetch({
        query: ALL_EVENTS_QUERY,
    })) as {
        data: ALL_EVENTS_QUERYResult;
    };
    return (
        <main>  
            <h1>Alle Events</h1>
            <ul>
                {allEvents?.map((event) => (
                    <li key={event._id}>
                        <Link href={`/termine/${event._id}`}>{event.title}</Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}