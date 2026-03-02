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
          .flatMap((b) =>
            (b.names && b.names.length > 0
              ? b.names
              : [b.title ?? "Untitled"]
            ).map((name) => ({
              name,
              slug: b.slug,
              adress: b.adress,
              id: b._id,
              date: b.date,
            })),
          )
          .sort((a, b) => a.name.localeCompare(b.name, "de"))
          .map(({ name, slug, adress, id, date }) => (
            <li
              key={`${id}-${name}`}
              className="grid grid-cols-2 gap-x-8 items-start py-2"
            >
              <div>
                <a href={`/biografien/${slug!}`}>
                  <p className="text-blue-800 hover:underline hover:text-blue-900">
                    {name}
                  </p>
                </a>
              </div>

              <div>
                <p className="text-sm">{adress}</p>
              </div>
            </li>
          ))}
      </ul>
    </main>
  );
}
