import type { PortableTextBlock } from '@portabletext/types'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import Link from 'next/link'
import type { SettingsPayload } from 'types'

interface FooterProps {
  data: SettingsPayload
}
export default function Footer(props: FooterProps) {
  const { data } = props
  const footer = data?.footer || ([] as PortableTextBlock[])
  return (
    <footer className="bg-s-color text-l-color border-b-color bottom-0 mt-2 w-full border-t  py-4 text-center">
      {footer && (
        <CustomPortableText
          paragraphClasses="text-md md:text-xl"
          value={footer}
        />
      )}
      <p>
        <Link href={'http://creativecommons.org/licenses/by-nc/4.0/'}>
          CC BY-NC 4.0
        </Link>{' '}
        {new Date().getFullYear()} © Soufiane El Jazouli
      </p>
    </footer>
  )
}
