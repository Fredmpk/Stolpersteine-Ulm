import { PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { getImageDimensions } from "@sanity/asset-utils";

type FootnoteItem = { _key: string; note: string };

/**
 * Custom PortableText components for rendering Sanity content in Next.js.
 *
 * Defines types.image with alignment, size, and orientation handling.
 * Returns a styled <figure> with optional caption/subtitle and responsive sizing.
 * Used by PortableText in multiple pages (bio, verlegungsablauf, privacy, etc.).
 */
export function myPortableTextComponents(
  footnotes: FootnoteItem[] = [],
): PortableTextComponents {
  return {
    types: {
      image: ({ value }) => {
        if (!value || !value.asset?._ref) {
          console.warn("Skipping invalid image", value);
          return null;
        }

        const normalize = (str?: string) =>
          str?.replace(/[\u200B-\u200D\uFEFF]/g, "").trim();

        const alignment = normalize(value.alignment) || "center";
        const alignmentClass =
          alignment === "left"
            ? "float-left mr-6 mt-2 mb-4"
            : alignment === "right"
              ? "float-right ml-6 mt-2 mb-4"
              : "my-4 mx-auto w-full";

        const { width, height } = getImageDimensions(value);
        const orientation =
          width > height ? "landscape" : width < height ? "portrait" : "square";

        const size = normalize(value.size) || "normal";

        const getSizeClass = (orientation: string, size: string) => {
          const sizeMap: { [key: string]: { [key: string]: string } } = {
            portrait: {
              small: "w-1/5 sm:w-1/5",
              normal: "w-1/2 sm:w-1/3",
              large: "w-3/4 sm:w-1/2",
            },
            landscape: {
              small: "w-1/2 sm:w-1/3",
              normal: "w-full sm:w-1/2",
              large: "w-full",
            },
            square: {
              small: "w-1/4 sm:w-1/5",
              normal: "w-1/3",
              large: "w-1/2 sm:w-2/3",
            },
          };
          return sizeMap[orientation]?.[size] || sizeMap.portrait.normal;
        };

        const sizeClass = getSizeClass(orientation, size);

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
                className="rounded-lg shadow-md"
              />
            )}
            {value.alt && (
              <figcaption className="text-sm text-gray-600 mt-2 text-left">
                {value.alt}
              </figcaption>
            )}
            {value.subtitle && (
              <figcaption className="text-xs text-gray-500 mt-1 text-left italic">
                {value.subtitle}
              </figcaption>
            )}
          </figure>
        );
      },

      footnote: ({ value }) => {
        if (!value?.note) return null;
        const index = footnotes.findIndex((fn) => fn._key === value._key);
        const number = index + 1;
        return (
          <sup>
            <a
              href={`#footnote-${value._key}`}
              className="text-blue-700 hover:underline text-xs"
            >
              [{number}]
            </a>
          </sup>
        );
      },
    },

    marks: {
      link: ({ value, children }) => {
        const url = value?.href || "#";
        return (
          <a
            href={url}
            target={value?.blank ? "_blank" : "_self"}
            rel={value?.blank ? "noopener noreferrer" : undefined}
            className="text-blue-900 hover:underline hover:text-blue-700"
          >
            {children}
          </a>
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
}
