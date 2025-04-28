import { colorBlur } from "@/utils/colorsBlur";
import type { Image as ImageType } from "sanity";
import { SanityImage } from "./SanityImage";

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
  return (
    <div
      className={`bg-s-color relative w-full overflow-hidden ${classesWrapper}`}
    >
      {image && (
        <SanityImage
          className="absolute h-full w-full"
          alt={alt}
          width={width}
          height={height}
          sizes={size}
          src={image}
          placeholder={colorBlur(41, 153, 165)}
        />
      )}
    </div>
  );
}
