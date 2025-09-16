import { PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { getImageDimensions } from "@sanity/asset-utils";

export const myPortableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value || !value.asset?._ref) {
        console.warn("Skipping invalid image", value);
        return null;
      }
      //to handle invalid images/prevent errors when adding images in the studio

      const normalize = (str?: string) =>
        str?.replace(/[\u200B-\u200D\uFEFF]/g, "").trim();
      //so in draft mode the correct name is passed for rendering

      const alignment = normalize(value.alignment) || "center";
      const alignmentClass =
        alignment === "left"
          ? "float-left mr-4 mb-4"
          : alignment === "right"
            ? "float-right ml-4 mb-4"
            : "my-4 mx-auto w-full";
      //to align the images as configured in the studio

      const { width, height } = getImageDimensions(value);
      const orientation =
        width > height ? "landscape" : width < height ? "portrait" : "square";

      // to align the image sizes

      const sizeClass =
        orientation === "portrait"
          ? "w-1/2 sm:w-1/3"
          : orientation === "landscape"
            ? "w-full sm:w-1/2"
            : "w-1/3";

      return (
        <figure
          className={`${alignmentClass} ${sizeClass} flex flex-col clear-both`}
        >
          {value.asset?._ref && (
            <Image
              src={urlFor(value).url()}
              alt={value.alt || ""}
              width={width || 300}
              height={height || 200}
              className="rounded-lg shadow-md m-2"
            />
          )}
          {value.alt && (
            <figcaption className="text-sm text-gray-600 mt-2 text-left">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-2xl sm:text-3xl font-bold my-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl sm:text-2xl font-semibold my-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg sm:text-xl font-semibold my-3">{children}</h3>
    ),
    normal: ({ children }) => <p className="my-2">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-400 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside my-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside my-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="ml-4">{children}</li>,
    number: ({ children }) => <li className="ml-4">{children}</li>,
  },
};
