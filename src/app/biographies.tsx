import { PortableText } from "next-sanity";
import { myPortableTextComponents } from "./components/PortableTextComponents";
import { BIOGRAPHY_QUERYResult } from "@/sanity/types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export function Biographies({ bios }: { bios: BIOGRAPHY_QUERYResult }) {
  return (
    <section className="m-12 mb">
      <Image
        src="/header_stolpersteine_logo.png"
        alt="Stolpersteine Ulm"
        className="max-w-1/3 sm:max-w-1/5 px-4"
        width={100}
        height={100}
        layout="responsive"
      />
      <Image
        src="/banner-stolpersteine.png"
        alt="Stolpersteine Ulm"
        className="py-4"
        width={800}
        height={100}
        layout="responsive"
      />
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
          <p>Autor*in(nen): {bio.authors}</p>
          <h3 className="mt-6 font-semibold">Quellen</h3>
          <PortableText
            value={bio.sources || []}
            components={myPortableTextComponents}
          />
        </div>
      ))}
    </section>
  );
}
