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
    <div className={`${centered ? 'text-center' : 'w-5/6 lg:w-4/5'}`}>
      {/* Title */}
      {title && title !== 'JAZSOUF' && (
        <div className=" text-a-color/10 font-sans text-2xl tracking-widest md:text-5xl">
          {title}
        </div>
      )}
      {/* Description */}
      {description && (
        <div className="text-t-color space-y-4 pt-5 text-left font-serif text-xl tracking-wide [text-wrap:pretty] md:text-2xl">
          <CustomPortableText value={description} />
        </div>
      )}
    </div>
  )
}
