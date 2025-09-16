import { sanityFetch } from "@/sanity/lib/live";
import { DONATIONS_QUERY } from "@/sanity/lib/queries";
import { DONATIONS_QUERYResult } from "@/sanity/types";
import { PortableText } from "next-sanity";
import { myPortableTextComponents } from "../components/PortableTextComponents";

export default async function Donations() {
  const { data: donations } = (await sanityFetch({
    query: DONATIONS_QUERY,
  })) as {
    data: DONATIONS_QUERYResult;
  };
  return (
    <main className="my-6 ml-10 mr-2">
      <h2 className="text-2xl md:text-4xl text-[var(--color-heading)] my-6">
        {donations?.title}
      </h2>
      <div className="text-sm md:text-base">
        <PortableText
          value={donations?.text || []}
          components={myPortableTextComponents}
        />
      </div>
    </main>
  );
}
