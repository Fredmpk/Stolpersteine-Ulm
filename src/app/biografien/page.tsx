// app/biografien/page.tsx
import { sanityFetch } from "@/sanity/lib/live";
import { BIOGRAPHY_LIST_QUERY } from "@/sanity/lib/queries";
import { BIOGRAPHY_LIST_QUERYResult } from "@/sanity/types";

export default async function BiografienPage() {
  const { data: bios } = (await sanityFetch({
    query: BIOGRAPHY_LIST_QUERY,
  })) as {
    data: BIOGRAPHY_LIST_QUERYResult;
  };
  if (!bios || bios.length === 0) {
    return (
      <main>
        <h1>Biografien</h1>
        <p>Fehler: Keine Biografien gefunden.</p>
      </main>
    );
  }

  return (
    <main>
      <h1 className="text-2xl sm:text-3xl  text-[var(--color-heading)] my-6">
        Biografien der Personen, für die in Ulm Stolpersteine verlegt worden
        sind
      </h1>
      <ul>
        {bios
          .filter((b) => !!b.slug)
          .map((b) => (
            <li
              key={b._id}
              className="flex justify-between items-center lg:w-3/4"
            >
              <div>
                <a href={`/biografien/${b.slug!}`} className="flex flex-row">
                  <p className="text-blue-800 hover:underline hover:text-blue-900">
                    {b.title ?? "Untitled"}
                  </p>
                  <p className="ml-2 text-blue-800 hover:underline hover:text-blue-900">
                    →
                  </p>
                </a>
              </div>
              <p className="text-sm">{b.adress}</p>
            </li>
          ))}
      </ul>
    </main>
  );
}
