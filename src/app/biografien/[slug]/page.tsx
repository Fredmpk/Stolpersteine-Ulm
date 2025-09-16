import { PortableText } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { SINGLE_BIOGRAPHY_QUERY } from "@/sanity/lib/queries";
import { SINGLE_BIOGRAPHY_QUERYResult } from "@/sanity/types";
import { myPortableTextComponents } from "@/app/components/PortableTextComponents";
import { notFound } from "next/navigation";

export default async function Biographies({
  params,
}: {
  params: { slug: string };
}) {
  const { data: bio } = (await sanityFetch({
    query: SINGLE_BIOGRAPHY_QUERY,
    params: { slug: params.slug }, // ✅ pass slug
  })) as { data: SINGLE_BIOGRAPHY_QUERYResult };

  if (!bio) {
    return notFound(); // ✅ show 404 if slug not found
  }

  return (
    <section className="my-12 mx-2">
      <div key={bio._id}>
        {bio.image_stone?.asset && (
          <Image
            src={urlFor(bio.image_stone.asset).url()}
            alt={bio.title || ""}
            className="max-w-1/3 sm:max-w-1/4 rounded-2xl float-right ml-8 mb-8"
            width={400}
            height={400}
            layout="responsive"
          />
        )}
        <h2 className="text-2xl sm:text-4xl text-[var(--color-heading)] my-6">
          {bio.title}
        </h2>
        <PortableText
          value={bio.body || []}
          components={myPortableTextComponents}
        />
        {bio.sources && (
          <>
            <h3 className="text-lg sm:text-xl font-semibold my-3">Quellen</h3>
            <PortableText
              value={bio.sources || []}
              components={myPortableTextComponents}
            />
          </>
        )}
        {bio.authors && (
          <p className="text-sm sm:text-base font-semibold my-6">
            Autor*in(nen): {bio.authors}
          </p>
        )}
      </div>
    </section>
  );
}
