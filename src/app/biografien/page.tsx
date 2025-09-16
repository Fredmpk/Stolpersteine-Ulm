import { PortableText } from "next-sanity";
import { BIOGRAPHY_QUERYResult } from "@/sanity/types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { myPortableTextComponents } from "../components/PortableTextComponents";

export function Biographies({ bios }: { bios: BIOGRAPHY_QUERYResult }) {
  return (
    <section className="m-12 mb">
      {bios?.map((bio) => (
        <div key={bio._id}>
          {bio.image_stone?.asset && (
            <Image
              src={urlFor(bio.image_stone.asset).url()}
              alt={bio.title || ""}
              className="max-w-1/3 sm:max-w-1/6 mx-auto rounded-2xl"
              width={100}
              height={100}
              layout="responsive"
            />
          )}
          <h2 className="text-2xl sm:text-4xl  text-[#c5d3d6] my-3">
            {bio.title}
          </h2>

          <PortableText
            value={bio.body || []}
            components={myPortableTextComponents}
          />
          <h3 className="text-lg sm:text-xl font-semibold my-3">Quellen</h3>
          <PortableText
            value={bio.sources || []}
            components={myPortableTextComponents}
          />
          <p className="text-sm sm:text-base font-semibold my-6">
            Autor*in(nen): {bio.authors}
          </p>
        </div>
      ))}
    </section>
  );
}
