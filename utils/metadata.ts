import { urlFor } from "@/sanity-cms/lib/image";
import type { Metadata } from "next";
import type { Image } from "sanity";

/**
 * All the shared stuff that goes into <head> on `(personal)` routes, can be be imported by `page.tsx` files and used by `generateMetadata` functions.
 */
export function defineMetadata({
  baseTitle,
  description,
  image,
  title,
}: {
  baseTitle?: string;
  description?: string;
  image?: Image;
  title?: string;
}) {
  const imageUrl = image && urlFor(image)?.width(1200).height(627).fit("crop").url();
  const metaTitle = [
    ...(title ? [title] : ["Soufiane's Space"]),
    ...(baseTitle ? [baseTitle] : []),
  ].join(" | ");

  return {
    title: metaTitle,
    themeColor: "#000",
    description,
    openGraph: imageUrl
      ? {
          images: [imageUrl],
        }
      : undefined,
  } satisfies Metadata;
}
