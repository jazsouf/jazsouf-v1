import { getArtBySlug, getArtsPaths, getHomePageTitle } from "@/sanity-cms/fetch";

import { defineMetadata } from "@/utils/metadata";
import type { Metadata } from "next";
import { toPlainText } from "next-sanity";
import { notFound } from "next/navigation";
import ArtPage from "./ArtPage";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;

  const [homePageTitleData, data] = await Promise.all([getHomePageTitle(), getArtBySlug(slug)]);

  return defineMetadata({
    baseTitle: homePageTitleData?.title ?? undefined,
    title: data?.title ?? undefined,
    description: data?.overview ? toPlainText(data.overview) : "",
  });
}

export async function generateStaticParams() {
  const slugs = await getArtsPaths();

  return slugs.filter(Boolean);
}

export default async function ArtSlugRoute({ params }: Props) {
  const data = await getArtBySlug(params.slug);

  if (!data) {
    notFound();
  }

  return <ArtPage data={data} />;
}
