import MapWrapper from "./components/MapWrapper";
import { sanityFetch } from "@/sanity/lib/live";
import { BIOGRAPHY_MAP_QUERY } from "@/sanity/lib/queries";
import { BIOGRAPHY_MAP_QUERYResult } from "@/sanity/types";

export default async function KartePage() {
  const { data } = (await sanityFetch({
    query: BIOGRAPHY_MAP_QUERY,
  })) as {
    data: BIOGRAPHY_MAP_QUERYResult;
  };

  const markers = data.map((b) => ({
    id: b._id,
    lat: b.geopoint?.lat,
    lng: b.geopoint?.lng,
    label: b.title,
    biotext_short: b.biotext_short,
    slug: b.slug,
  }));

  return (
    <main className="w-full h-full">
      <h2 className="text-2xl md:text-4xl text-[var(--color-heading)] my-6">
        Karte der Stolpersteine
      </h2>
      <MapWrapper markers={markers} />
    </main>
  );
}
