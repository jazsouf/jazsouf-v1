import { CustomPortableText } from 'components/shared/CustomPortableText'

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
    <div className={`${centered ? 'text-center' : 'w-5/6 lg:w-3/5'}`}>
      {/* Title */}
      {title && (
        <div className="font-sans text-4xl font-thin tracking-widest text-[#ffffff] mix-blend-difference md:text-6xl">
          {title}
        </div>
      )}
      {/* Description */}
      {description && (
        <div className="pt-8 text-left font-serif text-xl tracking-wide text-gray-300 [text-wrap:balance] md:text-4xl">
          <CustomPortableText value={description} />
        </div>
      )}
    </div>
  )
}
