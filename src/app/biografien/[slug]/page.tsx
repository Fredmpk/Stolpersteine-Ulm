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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const result = await sanityFetch({
    query: SINGLE_BIOGRAPHY_QUERY,
    params: { slug },
  });

  const bio = result.data as SINGLE_BIOGRAPHY_QUERYResult;

  if (!bio) {
    return notFound(); // ✅ show 404 if slug not found
  }

  return (
    <section className="my-12 mx-2">
      <div key={bio?._id}>
        <div className="flex flex-wrap gap-2 justify-center">
          {bio?.images_stones?.map((image) => {
            if (!image?.asset) return null; // skip if no asset
            return (
              <Image
                key={image._key}
                src={urlFor(image.asset).url()}
                alt={bio.title || ""}
                className="w-1/4 md:w-1/5 lg:w-1/6 rounded-2xl"
                width={400}
                height={400}
              />
            );
          })}
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {bio?.stone_texts?.map((stone_text) => (
            <div key={stone_text._key}>
              <div
                className="
          flex flex-col justify-center items-center 
          text-center text-xs md:text-sm bg-[#AB8F5C] p-2 rounded-lg  w-28 h-28         
          md:w-32 md:h-32   
          xl:w-40 xl:h-40  mx-auto
          [&_p]:m-0 [&_p]:leading-tight
        "
              >
                <PortableText value={stone_text.text || []} />
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl sm:text-4xl text-[var(--color-heading)] my-6">
          {bio?.title}
        </h2>
        <p>{bio?.adress}</p>
        <PortableText
          value={bio?.body || []}
          components={myPortableTextComponents}
        />
        {bio?.sources && (
          <>
            <h3 className="text-lg sm:text-xl font-semibold my-3">Quellen</h3>
            <PortableText
              value={bio?.sources || []}
              components={myPortableTextComponents}
            />
          </>
        )}
        {bio?.authors && (
          <p className="text-sm sm:text-base font-semibold my-6">
            Autor*in(nen): {bio?.authors}
          </p>
        )}
      </div>
    </section>
  );
}
