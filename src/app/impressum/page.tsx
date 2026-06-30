import { sanityProductionFetch } from "@/sanity/lib/client";
import { LEGAL_QUERY } from "@/sanity/lib/queries";
import { LEGAL_QUERYResult } from "@/sanity/types";
import { PortableText } from "next-sanity";
import { myPortableTextComponents } from "../components/PortableTextComponents";

export default async function Impressum() {
  const legal = await sanityProductionFetch<LEGAL_QUERYResult>(
    LEGAL_QUERY,
    {},
    ["legal"],
  );
  return (
    <div className="container mx-auto pt-4 px-4">
      <h2 className="text-2xl font-bold mb-4">Impressum</h2>
      <div className="mb-4">
        <PortableText
          value={legal?.impressum || []}
          components={myPortableTextComponents()}
        ></PortableText>
      </div>
    </div>
  );
}
