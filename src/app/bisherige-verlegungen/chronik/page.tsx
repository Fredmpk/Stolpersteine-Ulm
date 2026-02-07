// app/bisherige-verlegungen/chronik/page.tsx
import { sanityFetch } from "@/sanity/lib/live";
import { LAYINGS_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";

export default async function ChronikPage() {
  const { data: layings } = await sanityFetch({ query: LAYINGS_QUERY });
  return (
    <main className="my-6 ml-10 mr-2">
      {/* Header */}
      <h2 className="text-2xl md:text-4xl text-[var(--color-heading)] my-6">
        Chronik der Verlegungen
      </h2>

      <p className="text-sm md:text-base text-gray-600 mb-8">
        Alle bisherigen Stolperstein-Verlegungen in Ulm im Überblick
      </p>

      {/* Verlegungen Liste */}
      <div className="space-y-12">
        {layings.map((laying) => (
          <article
            key={laying._id}
            className="bg-white rounded-lg shadow-xs overflow-hidden"
          >
            {/* Datum Header */}
            <div className="bg-[var(--color-heading)] text-white px-6 md:px-8 py-3 md:py-4">
              <h3 className="text-xl md:text-2xl font-bold">{laying.date}</h3>
            </div>

            <div className="p-6 md:p-8">
              {/* Bild */}
              <div className="p-6 md:p-8">
                <div className="mb-8">
                  <div className="w-full max-w-full rounded-lg overflow-hidden bg-gray-200">
                    <Image
                      src={laying.image?.asset?.url || ""}
                      alt={laying.image?.alt || "Verlegung"}
                      width={1024} // provide original or maximum width
                      height={768} // provide original or maximum height
                      className="w-full h-auto object-contain"
                      sizes="(max-width: 1024px) 100vw, 1024px"
                    />
                  </div>
                </div>
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
                          href={`/biografie/${bio.slug?.current}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {bio.title}
                        </Link>
                      </h5>
                      <p className="text-sm md:text-base text-gray-700 mb-1">
                        <span className="font-medium">Adresse:</span>{" "}
                        {bio.adress}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Medien/Reden */}
              {laying.Links_videos &&
                laying.Links_videos.length > 0 &&
                laying.pdf_speeches &&
                laying.pdf_speeches.length > 0 && (
                  <div>
                    <h4 className="text-lg md:text-xl font-semibold text-[var(--color-heading)] mb-4">
                      Redebeiträge und Medien
                    </h4>

                    <div className="space-y-4">
                      {laying.Links_videos.map((video) => {
                        // YouTube ID aus der URL extrahieren (nur grobes Beispiel)
                        const match = video.url?.match(
                          /(?:youtu\.be\/|youtube\.com\/watch\?v=)([\w-]+)/
                        );
                        const videoId = match ? match[1] : null;

                        return (
                          <div
                            key={video.title}
                            className="flex items-start gap-4 p-4 bg-zinc-100 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <Link
                              href={video.url || ""}
                              className="transition-colors flex-1"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <h5 className="text-sm md:text-base font-semibold hover:text-blue-600 hover:underline text-gray-900 mb-1">
                                {video.title}
                              </h5>
                              <p className="text-sm md:text-base text-gray-700 mb-1">
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

                    <div className="space-y-4">
                      {laying.pdf_speeches.map((pdf) => (
                        <div
                          key={pdf.title}
                          className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <Link
                            href={pdf.pdf?.asset?.url || ""}
                            className="transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <h5 className="text-sm md:text-base font-semibold text-gray-900 mb-1 hover:text-blue-600 hover:underline">
                              {pdf.title}
                            </h5>
                            <p className="text-sm md:text-base text-gray-700 mb-1">
                              {pdf.description}
                            </p>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
