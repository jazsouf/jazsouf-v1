import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import { colorBlur } from 'utility_functions/colorsBlur'

interface ImageBoxProps {
  image?: { asset?: any }
  alt?: string
  width?: number
  height?: number
  size?: string
  classesWrapper?: string
}

export default function ImageBox({
  image,
  alt = 'Cover image',
  width = 3500,
  height = 2000,
  size = '100vw',
  classesWrapper
}: ImageBoxProps) {
  const imageUrl =
    image && urlForImage(image)?.height(height).width(width).fit('crop').url()
  return (
    <div className={`bg-s-color w-full overflow-hidden ${classesWrapper}`}>
      {imageUrl && (
        <Image
          className={`absolute h-full w-full`}
          alt={alt}
          width={width}
          height={height}
          sizes={size}
          src={imageUrl}
          placeholder={colorBlur(46, 41, 48)}
        />
      )}
    </div>
  )
}
