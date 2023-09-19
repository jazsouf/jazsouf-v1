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
      {title && title !== 'JAZSOUF' && (
        <div className=" font-sans text-4xl font-bold tracking-tight text-[#ffffff] mix-blend-difference md:text-7xl">
          {title}
        </div>
      )}
      {/* Description */}
      {description && (
        <div className="space-y-5 pt-8 text-left font-serif text-2xl tracking-wide text-gray-400 [text-wrap:balance] md:text-4xl">
          <CustomPortableText value={description} />
        </div>
      )}
    </div>
  )
}
