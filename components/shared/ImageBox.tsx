import { urlFor } from "@/sanity-cms/image";
import { colorBlur } from "@/utils/colorsBlur";
import Image from "next/image";
import type { Image as ImageType } from "sanity";

interface ImageBoxProps {
  image?: ImageType;
  alt?: string;
  width?: number;
  height?: number;
  size?: string;
  classesWrapper?: string;
}

export default function ImageBox({
  image,
  alt = "Cover image",
  width = 1750,
  height = 1000,
  size = "(max-width: 768px) 90vw, 60vw",
  classesWrapper,
}: ImageBoxProps) {
  const imageUrl = image && urlFor(image)?.fit("crop").url();
  return (
    <div
      className={`bg-s-color relative w-full overflow-hidden ${classesWrapper}`}
    >
      {imageUrl && (
        <Image
          className="absolute h-full w-full"
          alt={alt}
          width={width}
          height={height}
          sizes={size}
          src={imageUrl}
          placeholder={colorBlur(255, 125, 60)}
        />
      )}
    </div>
  );
}
