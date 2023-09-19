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
        <div className=" h-1  border-t py-2"></div>

        {/* Body */}
        {body && (
          <CustomPortableText
            paragraphClasses="font-serif max-w-3xl text-gray-400 text-xl pt-2"
            value={body}
          />
        )}
      </div>
    </div>
  )
}

export default Page
