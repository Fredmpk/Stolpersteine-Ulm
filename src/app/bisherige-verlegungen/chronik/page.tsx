// app/bisherige-verlegungen/chronik/page.tsx
import { sanityFetch } from "@/sanity/lib/live";
import { LAYINGS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, PlayCircle } from "lucide-react";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder(client);

function getSanityImageUrl(image: SanityImageSource) {
  return builder.image(image).width(900).auto("format").url();
}

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
              <div className="mt-4 flex justify-center">
                <div className="bg-blue-link rounded-full">
                  <Link
                    href={laying.flyerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center px-6 py-2 font-bold text-white hover:underline text-lg md:text-2xl whitespace-nowrap"
                  >
                    DOWNLOAD FLYER
                  </Link>
                </div>
              </div>
            )}

            <div className="p-6 md:p-8">
              {/* Bild */}
              {laying.image?.asset && (
                <div className="mb-8 flex justify-center">
                  <div className="max-w-3xl max-h-[400px] flex items-center justify-center">
                    <Image
                      src={getSanityImageUrl(laying.image)}
                      alt={laying.image?.alt || "Verlegung"}
                      width={900}
                      height={600}
                      className="h-full w-auto max-h-[400px] object-contain rounded-lg overflow-hidden"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 900px"
                    />
                  </div>
                </div>
              )}

              {/* Verlegte Personen */}
              <div className="mb-8">
                <h4 className="text-lg md:text-xl font-semibold text-[var(--color-heading)] mb-6">
                  Verlegte Stolpersteine
                </h4>

                <div className="space-y-1 md:space-y-3">
                  {laying.biographies?.map((bio) => (
                    <div
                      key={bio._id}
                      className="border-l-4 border-gray-300 pl-6 py-1"
                    >
                      <h5 className="text-sm xl:text-base font-semibold text-gray-900 mb-1">
                        <Link
                          href={`/biografien/${bio.slug?.current}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {bio.title}
                        </Link>
                      </h5>

                      <p className="text-sm text-gray-700">
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
                          <h5 className="flex items-center gap-2 text-sm md:text-base font-semibold hover:text-blue-700 hover:underline">
                            {pdf.title}
                            <ExternalLink size={16} className="text-blue-700" />
                          </h5>

                          <p className="text-sm lg:text-base text-gray-700">
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
                            <h5 className="flex items-center gap-2 text-sm md:text-base font-semibold hover:text-blue-700 hover:underline">
                              {video.title}
                              <PlayCircle size={16} className="text-blue-700" />
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

              <div className="flex justify-center text-md md:text-lg hover:underline">
                <a
                  href={"#"}
                  className="bg-zinc-300 hover:bg-blue-300 rounded-lg p-2"
                >
                  Zurück nach oben
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
