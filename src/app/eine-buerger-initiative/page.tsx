import { GOALS_QUERY } from "@/sanity/lib/queries";
import { sanityProductionFetch } from "@/sanity/lib/client";
import { GOALS_QUERYResult } from "@/sanity/types";
import { PortableText } from "next-sanity";
import { myPortableTextComponents } from "../components/PortableTextComponents";

export default async function Goals() {
  const goals = await sanityProductionFetch<GOALS_QUERYResult>(
    GOALS_QUERY,
    {},
    ["goals"],
  );
  return (
    <main className="my-6 ml-10 mr-2">
      <h1 className="text-2xl md:text-4xl text-[var(--color-heading)] my-6">
        Ziele der Initiative
      </h1>
      <div className="text-sm md:text-base">
        <PortableText
          value={goals?.textGoal || []}
          components={myPortableTextComponents()}
        />
      </div>
    </main>
  );
}
