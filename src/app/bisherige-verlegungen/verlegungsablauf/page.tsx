// app/bisherige-verlegungen/verlegungsablauf/page.tsx
import { myPortableTextComponents } from "@/app/components/PortableTextComponents";
import { PortableText } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { PROCESS_QUERY } from "@/sanity/lib/queries";
import { PROCESS_QUERYResult } from "@/sanity/types";
import ImageGallery from "./ImageGallery";

export default async function VerlegungsablaufPage() {
  const { data: verlegungsablauf } = (await sanityFetch({
    query: PROCESS_QUERY,
  })) as {
    data: PROCESS_QUERYResult;
  };

  if (!verlegungsablauf) {
    return (
      <main className="my-4 sm:my-6 mx-4 sm:mx-6 md:mx-8 lg:mx-10 max-w-7xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-[var(--color-heading)] my-4 sm:my-6">
          Verlegungsablauf
        </h2>
        <p className="text-sm sm:text-base">Fehler: Keine Daten gefunden.</p>
      </main>
    );
  }

  // Filter out images without assets
  const galleryImages = (verlegungsablauf.images ?? []).filter(
    (img) => img.asset !== null
  );
  const mediaItems = verlegungsablauf.media ?? [];

  return (
    <main className="my-4 sm:my-6 mx-4 sm:mx-6 md:mx-8 lg:mx-10 max-w-7xl">
      {/* Header */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl text-[var(--color-heading)] my-4 sm:my-6">
        Verlegungsablauf
      </h2>

      {/* Beschreibung */}
      <div className="text-sm sm:text-base mb-8 sm:mb-12 max-w-4xl">
        <PortableText
          value={verlegungsablauf.description ?? []}
          components={myPortableTextComponents}
        />
      </div>

      {/* Bildergalerie */}
      {galleryImages.length > 0 && (
        <section className="mb-8 sm:mb-12">
          <h3 className="text-xl sm:text-2xl md:text-3xl text-[var(--color-heading)] mb-4 sm:mb-6">
            Impressionen von Verlegungen
          </h3>
          <ImageGallery images={galleryImages} />
        </section>
      )}

      {/* Presseberichte (media[]) */}
      {mediaItems.length > 0 && (
        <section className="mb-8 sm:mb-12 max-w-4xl">
          <h3 className="text-xl sm:text-2xl md:text-3xl text-[var(--color-heading)] mb-4 sm:mb-6">
            Presseberichte
          </h3>

          <div className="space-y-4 sm:space-y-6">
            {mediaItems.map((item, index) => {
              const linkHref = item.pdfUrl ?? item.url ?? "#";

              return (
                <article
                  key={item.title ?? index}
                  className="border-l-2 sm:border-l-4 border-blue-500 pl-3 sm:pl-6 py-2 hover:bg-gray-50 transition-colors rounded-r"
                >
                  <h4 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
                    <a
                      href={linkHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 transition-colors break-words"
                    >
                      {item.title ?? "Ohne Titel"}
                    </a>
                  </h4>

                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 mb-2">
                    {item.pdfUrl && (
                      <a
                        href={item.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm inline-flex items-center gap-1 touch-manipulation"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        Bericht lesen (PDF)
                      </a>
                    )}

                    {!item.pdfUrl && item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm inline-flex items-center gap-1 touch-manipulation"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        Bericht lesen
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
