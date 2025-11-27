import { sanityFetch } from "@/sanity/lib/live";
import { PortableText } from "next-sanity";
import { myPortableTextComponents } from "../components/PortableTextComponents";
import { NEWS_QUERYResult } from "@/sanity/types";
import Link from "next/link";
import { NEWS_QUERY, NEWS_COUNT_QUERY } from "@/sanity/lib/queries";

export const dynamic = "force-dynamic";

export default async function News({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(
    Array.isArray(searchParams?.page)
      ? searchParams.page[0]
      : (searchParams?.page ?? 1)
  );

  const perPage = 9;
  const start = (page - 1) * perPage;
  const end = start + perPage;

  // Fetch paginated news
  const { data } = await sanityFetch({
    query: NEWS_QUERY,
    params: {
      start,
      end,
    },
  });

  // Fetch total count for pagination
  const { data: countData } = await sanityFetch({
    query: NEWS_COUNT_QUERY,
  });

  const news = data as NEWS_QUERYResult;
  const totalCount = countData as number;
  const totalPages = Math.ceil(totalCount / perPage);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (page > 3) {
        pages.push("...");
      }

      // Show pages around current page
      for (
        let i = Math.max(2, page - 1);
        i <= Math.min(totalPages - 1, page + 1);
        i++
      ) {
        pages.push(i);
      }

      if (page < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <main className="m-4">
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

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="flex justify-center items-center gap-2 my-8">
          {/* Previous Button */}
          {page > 1 ? (
            <Link
              href={`/nachrichten?page=${page - 1}`}
              className="px-3 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
            >
              ←
            </Link>
          ) : (
            <span className="px-3 py-2 rounded border border-gray-200 text-gray-400 cursor-not-allowed">
              ←
            </span>
          )}

          {/* Page Numbers */}
          {pageNumbers.map((pageNum, idx) => {
            if (pageNum === "...") {
              return (
                <span key={`ellipsis-${idx}`} className="px-3 py-2">
                  ...
                </span>
              );
            }

            const isActive = pageNum === page;
            return (
              <Link
                key={pageNum}
                href={`/nachrichten?page=${pageNum}`}
                className={`px-3 py-2 rounded border transition ${
                  isActive
                    ? "bg-[var(--color-sidebar-active)] text-white border-[var(--color-sidebar-active)] font-semibold"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                {pageNum}
              </Link>
            );
          })}

          {/* Next Button */}
          {page < totalPages ? (
            <Link
              href={`/nachrichten?page=${page + 1}`}
              className="px-3 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
            >
              →
            </Link>
          ) : (
            <span className="px-3 py-2 rounded border border-gray-200 text-gray-400 cursor-not-allowed">
              →
            </span>
          )}
        </nav>
      )}
    </main>
  );
}
