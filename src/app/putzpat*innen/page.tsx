import { sanityProductionFetch } from "@/sanity/lib/client";
import { CLEAN_GODPARENTS_QUERY } from "@/sanity/lib/queries";
import { CLEAN_GODPARENTS_QUERYResult } from "@/sanity/types";
import { PortableText } from "next-sanity";
import { myPortableTextComponents } from "../components/PortableTextComponents";

export default async function CleanGodparents() {
  const cleanGodparents =
    await sanityProductionFetch<CLEAN_GODPARENTS_QUERYResult>(
      CLEAN_GODPARENTS_QUERY,
      {},
      ["cleangodparents"],
    );
  return (
    <main className="my-6 ml-10 mr-2">
      <h2 className="text-2xl md:text-4xl text-[var(--color-heading)] my-6">
        {cleanGodparents?.title}
      </h2>
      <div className="text-sm md:text-base">
        <PortableText
          value={cleanGodparents?.description || []}
          components={myPortableTextComponents()}
        />
      </div>
      <div className="flex flex-col gap-2 text-blue-600 items-center text-lg lg:text-xl my-8">
        {cleanGodparents?.listcleaners?.split(/\r?\n/).map((name, i) => (
          <div key={i}>{name}</div>
        ))}
      </div>
    </main>
  );
}
