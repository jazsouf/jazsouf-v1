import { toPlainText } from "@portabletext/react";

import { getArtBySlug, getArtsPaths, getHomePageTitle } from "lib/sanity.fetch";
import { artBySlugQuery } from "lib/sanity.queries";
import { defineMetadata } from "lib/utils.metadata";
import type { Metadata } from "next";
import { LiveQuery } from "next-sanity/preview/live-query";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import ArtPage from "./ArtPage";
import ArtPagePreview from "./ArtPagePreview";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;

  const [homePageTitle, art] = await Promise.all([
    getHomePageTitle(),
    getArtBySlug(slug),
  ]);

  return defineMetadata({
    baseTitle: homePageTitle ?? undefined,
    description: art?.overview ? toPlainText(art.overview) : "",
    image: art?.image,
    title: art?.title,
  });
}

export async function generateStaticParams() {
  const slugs = await getArtsPaths();

  return slugs.map((slug) => ({ slug }));
}

export default async function ArtSlugRoute({ params }: Props) {
  const data = await getArtBySlug(params.slug);

  if (!data && !draftMode().isEnabled) {
    notFound();
  }

  return (
    <LiveQuery
      enabled={draftMode().isEnabled}
      query={artBySlugQuery}
      params={params}
      initialData={data}
      as={ArtPagePreview}
    >
      <ArtPage data={data} />
    </LiveQuery>
  );
}
