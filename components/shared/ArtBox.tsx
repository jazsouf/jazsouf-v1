'use client'
import { getImageDimensions } from '@sanity/asset-utils'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import { useState } from 'react'
import cn from 'utility_functions/cn'
import { colorBlur } from 'utility_functions/colorsBlur'
interface ArtBoxProps {
  image?: { asset?: any }
  alt?: string
  size?: string
}

export default function ArtBox({
  image,
  alt = 'Art image',
  size = '100vw',
}: ArtBoxProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  const { height, width, aspectRatio } = getImageDimensions(
    image?.asset?._ref as string,
  )
  const imageUrl =
    image && urlForImage(image)?.height(height).width(width).url()
  const containerBasic = `max-h-[1200px] flex-grow place-items-center grid h-auto min-w-[60vw]`

  const containerClasses = isLoaded
    ? 'animate-smooth-fade-in opacity-1'
    : 'opacity-0'
  const overContainerClasses = isLoaded ? '' : 'bg-p-color'

  const parentSizes =
    aspectRatio > 1.2
      ? ` lg:w-[55vw]`
      : `w-[90vw]  md:w-[50vw] lg:w-[35vw] 2xl:w-[28vw]`
  return (
    <div className={cn(containerBasic, parentSizes, overContainerClasses)}>
      <div className={cn('group', containerClasses)}>
        {imageUrl && (
          <Image
            src={imageUrl}
            width={width}
            height={height}
            alt={alt}
            priority
            draggable={false}
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, (max-width: 1600px) 35vw, 28vw"
            onLoadingComplete={() => setIsLoaded(true)}
          />
        )}
      </div>
    </div>
  )
}
