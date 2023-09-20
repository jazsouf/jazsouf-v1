import { CustomPortableText } from 'components/shared/CustomPortableText'
import { Header } from 'components/shared/Header'
import type { PagePayload } from 'types'

export interface PageProps {
  data: PagePayload | null
}

export function Page({ data }: PageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { body, overview, title } = data ?? {}

  return (
    <div>
      <div className="pb-14">
        {/* Header */}
        <Header title={title} description={overview} />
        <div className=" h-1 py-2"></div>
        {/* Body */}
        {body && (
          <CustomPortableText
            paragraphClasses="font-serif tracking-widest font-thin max-w-3xl text-t-color text-xl lg:text-2xl"
            value={body}
          />
        )}
      </div>
    </div>
  )
}

export default Page
