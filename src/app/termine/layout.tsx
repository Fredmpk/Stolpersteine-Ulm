import { sanityFetch } from "@/sanity/lib/live";
import { EVENT_YEARS_QUERY } from "@/sanity/lib/queries";
import { EVENT_YEARS_QUERYResult } from "@/sanity/types";
import YearsList from "./components/YearsList";

export default async function TermineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: years } = (await sanityFetch({
    query: EVENT_YEARS_QUERY,
  })) as {
    data: EVENT_YEARS_QUERYResult;
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Always visible at the top */}
      <YearsList years={years} />

      {/* Page-specific content goes here */}
      <main>{children}</main>
    </div>
  );
}
