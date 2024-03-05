import ArtBox from 'components/shared/ArtBox'
import { Header } from 'components/shared/Header'
import type { ArtPayload } from 'types'

export interface ArtPageProps {
  data: ArtPayload | null
}

export function ArtPage({ data }: ArtPageProps) {
  // Default to an empty object to allow previews on non-existent documents

  const { image, overview, title } = data ?? {}

  return (
    <div>
      <div className=" flex flex-col space-y-6 pb-10 lg:flex-row lg:gap-10">
        <ArtBox image={image} alt={`Artwork image for ${title}`} />
        <Header title={title} description={overview} />
      </div>
    </div>
  )
}

export default ArtPage