// app/bisherige-verlegungen/chronik/page.tsx
import { sanityFetch } from "@/sanity/lib/live";
import { LAYINGS_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, PlayCircle } from "lucide-react";

export default async function ChronikPage() {
  const { data: layings } = await sanityFetch({ query: LAYINGS_QUERY });

  const sortedLayings = [...layings].sort((a, b) => {
    return (
      new Date(b?.date || "").getTime() - new Date(a?.date || "").getTime()
    );
  });

  return (
    <main className="my-6 ml-10 mr-2">
      {/* Header */}
      <h2 className="text-2xl md:text-4xl text-[var(--color-heading)] my-6">
        Chronik der Verlegungen
      </h2>

      {/* Übersicht / Inhaltsverzeichnis */}
      <div className="mb-12 bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg md:text-xl font-semibold mb-4">
          Übersicht aller Verlegungen
        </h3>

        <ul className="space-y-2">
          {sortedLayings.map((laying) => (
            <li key={laying._id}>
              <Link
                href={`#verlegung-${laying._id}`}
                className="text-[var(--color-blue-link)] hover:underline"
              >
                {laying.title && `  ${laying.title} am `}
                {new Date(laying?.date ?? "").toLocaleDateString("de-DE", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Verlegungen Liste */}
      <div className="space-y-12">
        {sortedLayings.map((laying) => (
          <article
            key={laying._id}
            id={`verlegung-${laying._id}`}
            className="bg-white rounded-lg shadow-xs overflow-hidden"
          >
            {/* Datum */}
            <div className="bg-[var(--color-heading)] text-white px-6 md:px-8 py-3 md:py-4">
              <h3 className="text-xl md:text-2xl font-bold">
                {laying.title && `  ${laying.title} am `}
                {new Date(laying?.date ?? "").toLocaleDateString("de-DE", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </h3>
            </div>

            {laying.flyerUrl && (
              <div className="mt-4 mx-auto bg-blue-link w-1/3 rounded-full">
                <Link
                  href={laying.flyerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center py-2 font-bold text-white hover:underline text-lg md:text-2xl"
                >
                  DOWNLOAD FLYER
                </Link>
              </div>
            )}

            <div className="p-6 md:p-8">
              {/* Bild */}
              <div className="mb-8">
                {laying.image?.asset?.url && (
                  <div className="w-full max-w-full rounded-lg overflow-hidden bg-gray-200">
                    <Image
                      src={laying.image?.asset?.url || ""}
                      alt={laying.image?.alt || "Verlegung"}
                      width={1024}
                      height={768}
                      className="w-full h-auto object-contain"
                      sizes="(max-width: 1024px) 100vw, 1024px"
                    />
                  </div>
                )}
              </div>

              {/* Verlegte Personen */}
              <div className="mb-8">
                <h4 className="text-lg md:text-xl font-semibold text-[var(--color-heading)] mb-6">
                  Verlegte Stolpersteine
                </h4>

                <div className="space-y-6">
                  {laying.biographies?.map((bio) => (
                    <div
                      key={bio._id}
                      className="border-l-4 border-gray-300 pl-6 py-2"
                    >
                      <h5 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                        <Link
                          href={`/biografien/${bio.slug?.current}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {bio.title}
                        </Link>
                      </h5>

                      <p className="text-sm md:text-base text-gray-700">
                        <span className="font-medium">Adresse:</span>{" "}
                        {bio.adress}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Redebeiträge */}
              {laying.pdf_speeches && laying.pdf_speeches.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-lg md:text-xl font-semibold text-[var(--color-heading)] mb-4">
                    Redebeiträge
                  </h4>

                  <div className="space-y-4">
                    {laying.pdf_speeches.map((pdf) => (
                      <div
                        key={pdf.title}
                        className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Link
                          href={pdf.pdf?.asset?.url || ""}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <h5 className="flex items-center gap-2 text-sm md:text-base font-semibold text-blue-700 underline">
                            {pdf.title}
                            <ExternalLink size={16} />
                          </h5>

                          <p className="text-sm md:text-base text-gray-700">
                            {pdf.description}
                          </p>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Videos */}
              {laying.Links_videos && laying.Links_videos.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-lg md:text-xl font-semibold text-[var(--color-heading)] mb-4">
                    Videos
                  </h4>

                  <div className="space-y-4">
                    {laying.Links_videos.map((video) => {
                      const match = video.url?.match(
                        /(?:youtu\.be\/|youtube\.com\/watch\?v=)([\w-]+)/,
                      );

                      const videoId = match ? match[1] : null;

                      return (
                        <div
                          key={video.title}
                          className="flex items-start gap-4 p-4 bg-zinc-100 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <Link
                            href={video.url || ""}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1"
                          >
                            <h5 className="flex items-center gap-2 text-sm md:text-base font-semibold text-blue-700 underline">
                              <PlayCircle size={16} />
                              {video.title}
                            </h5>

                            <p className="text-sm md:text-base text-gray-700 mb-2">
                              {video.description}
                            </p>

                            {videoId && (
                              <img
                                src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                                alt={video.title || ""}
                                className="w-32 h-20 object-cover rounded-md"
                              />
                            )}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Flyer */}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
