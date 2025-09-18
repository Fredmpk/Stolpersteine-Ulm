// app/events/page.tsx
import { ALL_EVENTS_QUERY, EVENT_YEARS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import type {
  ALL_EVENTS_QUERYResult,
  EVENT_YEARS_QUERYResult,
} from "@/sanity/types";
import EventsPage from "./events-page";

export default async function EventsServerPage() {
  // Fetch all events and years on the server
  const { data: events } = (await sanityFetch({
    query: ALL_EVENTS_QUERY,
  })) as { data: ALL_EVENTS_QUERYResult };

  const { data: years } = (await sanityFetch({
    query: EVENT_YEARS_QUERY,
  })) as { data: EVENT_YEARS_QUERYResult };

  // Pass to client component as props
  return <EventsPage initialEvents={events} initialYears={years} />;
}
