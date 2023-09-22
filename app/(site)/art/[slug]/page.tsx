import { toPlainText } from '@portabletext/react'
import ArtPage from 'components/pages/art/ArtPage'
import ArtPreview from 'components/pages/art/ArtPreview'
import { getArtBySlug, getArtsPaths, getHomePageTitle } from 'lib/sanity.fetch'
import { artBySlugQuery } from 'lib/sanity.queries'
import { defineMetadata } from 'lib/utils.metadata'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { LiveQuery } from 'next-sanity/preview/live-query'

export const runtime = 'edge'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params

  const [homePageTitle, art] = await Promise.all([
    getHomePageTitle(),
    getArtBySlug(slug)
  ])

  return defineMetadata({
    baseTitle: homePageTitle ?? undefined,
    description: art?.overview ? toPlainText(art.overview) : '',
    image: art?.image,
    title: art?.title
  })
}

export async function generateStaticParams() {
  const slugs = await getArtsPaths()

  return slugs.map((slug) => ({ slug }))
}

export default async function ArtSlugRoute({ params }: Props) {
  const data = await getArtBySlug(params.slug)

  if (!data && !draftMode().isEnabled) {
    notFound()
  }

  return (
    <LiveQuery
      enabled={draftMode().isEnabled}
      query={artBySlugQuery}
      params={params}
      initialData={data}
      as={ArtPreview}
    >
      <ArtPage data={data} />
    </LiveQuery>
  )
}
