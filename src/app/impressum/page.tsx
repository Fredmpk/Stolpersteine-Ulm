import { sanityFetch } from "@/sanity/lib/live";
import { LEGAL_QUERY } from "@/sanity/lib/queries";
import { LEGAL_QUERYResult } from "@/sanity/types";
import { PortableText } from "next-sanity";
import { myPortableTextComponents } from "../components/PortableTextComponents";

export default async function Impressum() {
  const { data: legal } = (await sanityFetch({ query: LEGAL_QUERY })) as {
    data: LEGAL_QUERYResult;
  };
  return (
    <div className="container mx-auto pt-4 px-4">
      <h2 className="text-2xl font-bold mb-4">
        Name und Kontaktdaten des Verantwortlichen
      </h2>
      <div className="mb-4">
        <PortableText
          value={legal?.impressum || []}
          components={myPortableTextComponents}
        ></PortableText>
      </div>
    </div>
  );
}
