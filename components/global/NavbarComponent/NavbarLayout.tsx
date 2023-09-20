import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import type { MenuItem, SettingsPayload } from 'types'

interface NavbarProps {
  data: SettingsPayload
}
export default function Navbar(props: NavbarProps) {
  const { data } = props
  const menuItems = data?.menuItems || ([] as MenuItem[])
  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-x-5 border-b bg-[#101010] px-4 py-4 backdrop-blur md:px-16 md:py-5 lg:px-32">
      {menuItems &&
        menuItems.map((menuItem, key) => {
          const href = resolveHref(menuItem?._type, menuItem?.slug)
          if (!href) {
            return null
          }
          return (
            <Link
              key={key}
              className={`font-sans text-lg hover:text-[#eaccc1] md:text-xl ${
                menuItem?._type === 'home'
                  ? 'font-extrabold text-[#F7FCFE]'
                  : 'text-[#F3F3F3]'
              }`}
              href={href}
            >
              {menuItem.title}
            </Link>
          )
        })}
    </div>
  )
}
