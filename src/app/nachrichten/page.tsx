import { sanityFetch } from "@/sanity/lib/live";
import { PortableText } from "next-sanity";
import { myPortableTextComponents } from "../components/PortableTextComponents";
import { NEWS_QUERYResult } from "@/sanity/types";
import Link from "next/link";
import { NEWS_QUERY } from "@/sanity/lib/queries";

export const dynamic = "force-dynamic";

export default async function News({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  // --- Pagination ---
  const page = Number(searchParams?.page ?? 1);
  const perPage = 8;
  const start = (page - 1) * perPage;
  const end = start + perPage;

  // --- Fetch paginated news ---
  const { data } = await sanityFetch({
    query: NEWS_QUERY,
    params: {
      start,
      end,
    },
  });

  // Use your Sanity type
  const news = data as NEWS_QUERYResult;

  return (
    <main>
      <ul>
        {news.map((n) => (
          <li key={n._id}>
            <h2 className="text-2xl sm:text-3xl text-[var(--color-heading)] my-6">
              {n.title}
            </h2>

            <p className="text-sm sm:text-base font-italic my-6">
              {new Date(n?.date || "").toLocaleDateString("de-DE")}
            </p>

            <PortableText
              value={n.body || []}
              components={myPortableTextComponents}
            />
            {n.flyerUrl && (
              <div>
                <Link
                  href={n.flyerUrl || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 text-[var(--color-blue-link)] hover:underline hover:text-blue-000 text-lg md:text-xl"
                >
                  DOWNLOAD FLYER
                </Link>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* --- Pagination --- */}
      <div className="flex gap-4 my-8">
        {page > 1 && (
          <a href={`/nachrichten?page=${page - 1}`} className="underline">
            ← Zurück
          </a>
        )}

        {news.length === perPage && (
          <a href={`/nachrichten?page=${page + 1}`} className="underline">
            Weiter →
          </a>
        )}
      </div>
    </main>
  );
}
