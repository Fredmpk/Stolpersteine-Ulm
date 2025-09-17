import { SINGLE_BACKGROUND_QUERYResult } from "@/sanity/types";
import { SINGLE_BACKGROUND_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { PortableText } from "next-sanity";
import { myPortableTextComponents } from "@/app/components/PortableTextComponents";

export default async function BackgroundPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: background } = (await sanityFetch({
    query: SINGLE_BACKGROUND_QUERY,
    params: { slug },
  })) as {
    data: SINGLE_BACKGROUND_QUERYResult;
  };
  return (
    <div className="ml-2">
      <h1 className="text-2xl md:text-4xl text-[var(--color-heading)] my-6">
        {background?.title}
      </h1>
      <PortableText
        value={background?.text || []}
        components={myPortableTextComponents}
      />
    </div>
  );
}
