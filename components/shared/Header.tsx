import { CustomPortableText } from 'components/shared/CustomPortableText'
import DecoderText from './DecoderText'

import MotionDiv from './MotionDiv'

interface HeaderProps {
  centered?: boolean
  description?: any[]
  title?: string
}
export function Header(props: HeaderProps) {
  const { title, description, centered = false } = props
  if (!description && !title) {
    return null
  }
  return (
    <div className={`${centered ? 'text-center' : 'w-5/6 lg:w-4/5'}`}>
      {title && (
        <h1 className=" text-ah-color text-left font-sans text-2xl tracking-widest md:text-5xl">
          <DecoderText text={title?.toLocaleUpperCase()} />
        </h1>
      )}

      {description && (
        <MotionDiv
          classname="text-t-color space-y-4 pt-5 text-left font-serif text-xl [text-wrap:pretty] md:text-2xl"
          content={<CustomPortableText value={description} />}
        />
      )}
    </div>
  )
}
