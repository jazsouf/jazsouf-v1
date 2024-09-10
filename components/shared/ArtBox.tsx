"use client";

import { urlForImage } from "@/sanity-cms/lib/image";
import cn from "@/utils/cn";
import Image from "next/image";
import { useState } from "react";
interface ArtBoxProps {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  image?: { asset?: any };
  alt?: string;
  size?: string;
}

export default function ArtBox({
  image,
  alt = "Art image",
  size = "100vw",
}: ArtBoxProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const imageUrl = image && urlForImage(image)?.url();

  const containerBasic =
    "max-h-[1200px] relative flex-grow place-items-center grid h-auto min-w-[60vw]";

  const containerClasses = isLoaded
    ? "animate-smooth-fade-in opacity-1"
    : "opacity-0";
  const overContainerClasses = isLoaded ? "" : "bg-p-color";

  const parentSizes = "w-[90vw]  md:w-[50vw] lg:w-[35vw] 2xl:w-[28vw]";
  return (
    <div className={cn(containerBasic, parentSizes, overContainerClasses)}>
      <div className={cn("group", containerClasses)}>
        {imageUrl && (
          <Image
            src={imageUrl}
            fill
            alt={alt}
            priority
            draggable={false}
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, (max-width: 1600px) 35vw, 28vw"
            onLoadingComplete={() => setIsLoaded(true)}
          />
        )}
      </div>
    </div>
  );
}
