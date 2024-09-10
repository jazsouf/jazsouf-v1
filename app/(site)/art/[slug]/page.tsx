import {
  getArtBySlug,
  getArtsPaths,
  getHomePageTitle,
} from "@/sanity-cms/lib/fetch";

import { defineMetadata } from "@/utils/metadata";
import type { Metadata } from "next";
import { toPlainText } from "next-sanity";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import ArtPage from "./ArtPage";

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

  return slugs.map((slug: string) => ({ slug }));
}

export default async function ArtSlugRoute({ params }: Props) {
  const data = await getArtBySlug(params.slug);

  if (!data && !draftMode().isEnabled) {
    notFound();
  }

  return <ArtPage data={data} />;
}
