import { getArtBySlug, getArtsPaths, getHomePageTitle } from "@/sanity-cms/fetch";

import { defineMetadata } from "@/utils/metadata";
import type { Metadata } from "next";
import { toPlainText } from "next-sanity";
import { notFound } from "next/navigation";
import ArtPage from "./ArtPage";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

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

export default async function ArtSlugRoute({ params }: PageProps) {
  const data = await getArtBySlug((await params).slug);

  if (!data) {
    notFound();
  }

  return <ArtPage data={data} />;
}
