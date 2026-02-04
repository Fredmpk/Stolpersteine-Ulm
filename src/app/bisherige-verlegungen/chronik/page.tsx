// app/bisherige-verlegungen/chronik/page.tsx
import Image from "next/image";
import Link from "next/link";

// Dummy-Daten für Development (später durch Sanity ersetzt)
const dummyVerlegungen = [
  {
    _id: "1",
    date: "14. November 2023",
    dateSlug: "2023-11-14",
    image: {
      asset: { url: "/images/verlegung-2023-11.jpg" },
      alt: "Verlegung November 2023",
    },
    personen: [
      {
        _key: "1",
        name: "Max Mustermann",
        slug: { current: "max-mustermann" },
        adresse: "Bahnhofstraße 12, 89073 Ulm",
        geburtsdatum: "12.03.1890",
        deportation: "deportiert 1942",
      },
      {
        _key: "2",
        name: "Anna Beispiel",
        slug: { current: "anna-beispiel" },
        adresse: "Frauenstraße 28, 89073 Ulm",
        geburtsdatum: "08.07.1895",
        deportation: "deportiert 1942",
      },
      {
        _key: "3",
        name: "Josef Klein",
        slug: { current: "josef-klein" },
        adresse: "Neue Straße 45, 89073 Ulm",
        geburtsdatum: "15.11.1888",
        deportation: "ermordet 1944",
      },
    ],
    medien: [
      {
        _key: "1",
        type: "video",
        title: "Rede von Dr. Maria Schmidt",
        url: "https://youtube.com/watch?v=example1",
        beschreibung: "Ansprache zur historischen Einordnung",
      },
      {
        _key: "2",
        type: "pdf",
        title: "Gedenkrede des Oberbürgermeisters",
        pdfFile: { asset: { url: "/reden/2023-11-rede-ob.pdf" } },
        beschreibung: "Grußwort und Mahnung zum Gedenken",
      },
    ],
  },
  {
    _id: "2",
    date: "15. Mai 2023",
    dateSlug: "2023-05-15",
    image: {
      asset: { url: "/images/verlegung-2023-05.jpg" },
      alt: "Verlegung Mai 2023",
    },
    personen: [
      {
        _key: "1",
        name: "Familie Rosenberg",
        slug: { current: "familie-rosenberg" },
        adresse: "Königstraße 8, 89073 Ulm",
        geburtsdatum: "verschiedene",
        deportation: "deportiert 1943",
      },
      {
        _key: "2",
        name: "Hermann Grün",
        slug: { current: "hermann-gruen" },
        adresse: "Söflinger Straße 102, 89077 Ulm",
        geburtsdatum: "22.04.1910",
        deportation: "Flucht, verschollen 1945",
      },
    ],
    medien: [
      {
        _key: "1",
        type: "video",
        title: "Zeitzeugengespräch mit Angehörigen",
        url: "https://youtube.com/watch?v=example2",
        beschreibung: "Enkelin der Familie Rosenberg berichtet",
      },
      {
        _key: "2",
        type: "pdf",
        title: "Biografische Zusammenfassung",
        pdfFile: { asset: { url: "/reden/2023-05-biografien.pdf" } },
        beschreibung: "Rechercheergebnisse zur Familiengeschichte",
      },
    ],
  },
  {
    _id: "3",
    date: "20. Oktober 2022",
    dateSlug: "2022-10-20",
    image: {
      asset: { url: "/images/verlegung-2022-10.jpg" },
      alt: "Verlegung Oktober 2022",
    },
    personen: [
      {
        _key: "1",
        name: "Siegfried Lehmann",
        slug: { current: "siegfried-lehmann" },
        adresse: "Hirschstraße 23, 89073 Ulm",
        geburtsdatum: "03.09.1905",
        deportation: "deportiert 1942, ermordet in Auschwitz",
      },
      {
        _key: "2",
        name: "Rosa Lehmann",
        slug: { current: "rosa-lehmann" },
        adresse: "Hirschstraße 23, 89073 Ulm",
        geburtsdatum: "18.12.1908",
        deportation: "deportiert 1942, ermordet in Auschwitz",
      },
      {
        _key: "3",
        name: "Sophie Stern",
        slug: { current: "sophie-stern" },
        adresse: "Olgastraße 56, 89073 Ulm",
        geburtsdatum: "05.02.1923",
        deportation: "deportiert 1943",
      },
    ],
    medien: [
      {
        _key: "1",
        type: "video",
        title: "Musikalische Begleitung",
        url: "https://youtube.com/watch?v=example3",
        beschreibung: "Klezmer-Ensemble spielt zur Gedenkfeier",
      },
      {
        _key: "2",
        type: "pdf",
        title: "Redebeitrag eines Historikers",
        pdfFile: { asset: { url: "/reden/2022-10-historiker.pdf" } },
        beschreibung: "Zur Geschichte der jüdischen Gemeinde in Ulm",
      },
      {
        _key: "3",
        type: "pdf",
        title: "Gedichte der Schulklasse",
        pdfFile: { asset: { url: "/reden/2022-10-schulklasse.pdf" } },
        beschreibung: "Schüler*innen der Klasse 9b verfassten Gedichte",
      },
    ],
  },
];

export default async function ChronikPage() {
  // In Production: const { data: verlegungen } = await sanityFetch({ query: VERLEGUNGEN_CHRONIK_QUERY });
  const verlegungen = dummyVerlegungen;

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
        {verlegungen.map((verlegung) => (
          <article
            key={verlegung._id}
            id={verlegung.dateSlug}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            {/* Datum Header */}
            <div className="bg-blue-600 text-white px-6 md:px-8 py-3 md:py-4">
              <h3 className="text-xl md:text-2xl font-bold">
                {verlegung.date}
              </h3>
            </div>

            <div className="p-6 md:p-8">
              {/* Bild */}
              <div className="mb-8">
                <div className="relative h-64 md:h-96 rounded-lg overflow-hidden bg-gray-200">
                  <Image
                    src={verlegung.image?.asset?.url || ""}
                    alt={verlegung.image?.alt || "Verlegung"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                  />
                </div>
              </div>

              {/* Verlegte Personen */}
              <div className="mb-8">
                <h4 className="text-lg md:text-xl font-semibold text-[var(--color-heading)] mb-6">
                  Verlegte Stolpersteine
                </h4>

                <div className="space-y-6">
                  {verlegung.personen?.map((person) => (
                    <div
                      key={person._key}
                      className="border-l-4 border-gray-300 pl-6 py-2"
                    >
                      <h5 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                        <Link
                          href={`/biografie/${person.slug?.current}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {person.name}
                        </Link>
                      </h5>
                      <p className="text-sm md:text-base text-gray-700 mb-1">
                        <span className="font-medium">Adresse:</span>{" "}
                        {person.adresse}
                      </p>
                      <p className="text-sm md:text-base text-gray-700 mb-1">
                        <span className="font-medium">Geboren:</span>{" "}
                        {person.geburtsdatum}
                      </p>
                      <p className="text-sm md:text-base text-gray-700">
                        <span className="font-medium">Schicksal:</span>{" "}
                        {person.deportation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Medien/Reden */}
              {verlegung.medien && verlegung.medien.length > 0 && (
                <div>
                  <h4 className="text-lg md:text-xl font-semibold text-[var(--color-heading)] mb-4">
                    Redebeiträge und Medien
                  </h4>

                  <div className="space-y-4">
                    {verlegung.medien.map((medium) => (
                      <div
                        key={medium._key}
                        className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        {/* Icon */}
                        <div className="flex-shrink-0 mt-1">
                          {medium.type === "video" ? (
                            <svg
                              className="w-5 h-5 md:w-6 md:h-6 text-red-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                            </svg>
                          ) : (
                            <svg
                              className="w-5 h-5 md:w-6 md:h-6 text-blue-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h5 className="text-sm md:text-base font-semibold text-gray-900 mb-1">
                            <a
                              href={
                                medium.type === "video"
                                  ? medium.url
                                  : medium.pdfFile?.asset?.url
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-blue-600 transition-colors"
                            >
                              {medium.title}
                            </a>
                          </h5>
                          <p className="text-xs md:text-sm text-gray-600">
                            {medium.beschreibung}
                          </p>
                          <a
                            href={
                              medium.type === "video"
                                ? medium.url
                                : medium.pdfFile?.asset?.url
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs md:text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block"
                          >
                            {medium.type === "video"
                              ? "Video ansehen"
                              : "PDF öffnen"}{" "}
                            →
                          </a>
                        </div>
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
