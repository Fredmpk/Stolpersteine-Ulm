import { SINGLE_BACKGROUND_QUERYResult } from "@/sanity/types";
import { SINGLE_BACKGROUND_QUERY } from "@/sanity/lib/queries";
import { sanityProductionFetch } from "@/sanity/lib/client";
import { PortableText } from "next-sanity";
import { myPortableTextComponents } from "@/app/components/PortableTextComponents";

export const dynamic = "force-dynamic";

export default async function BackgroundPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const background = await sanityProductionFetch<SINGLE_BACKGROUND_QUERYResult>(
    SINGLE_BACKGROUND_QUERY,
    { slug },
    ["backgrounds"],
  );
  return (
    <div className="ml-2">
      <h1 className="text-2xl md:text-4xl text-[var(--color-heading)] my-6">
        {background?.title}
      </h1>
      <PortableText
        value={background?.text || []}
        components={myPortableTextComponents()}
      />
    </div>
  );
}
