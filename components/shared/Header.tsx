import { CustomPortableText } from 'components/shared/CustomPortableText'

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
      {/* Title */}
      {title && (
        <h1 className=" text-a-color/40 font-sans text-2xl tracking-widest md:text-5xl">
          {title}
        </h1>
      )}
      {/* Description */}
      {description && (
        <MotionDiv
          classname="text-t-color space-y-4 pt-5 text-left font-serif text-xl [text-wrap:balance] md:text-2xl"
          content={<CustomPortableText value={description} />}
        />
      )}
    </div>
  )
}
