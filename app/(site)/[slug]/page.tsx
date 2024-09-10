import { getPageBySlug, getPagesPaths } from "@/sanity-cms/lib/fetch";
import { defineMetadata } from "@/utils/metadata";
import type { Metadata } from "next";
import { toPlainText } from "next-sanity";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import EditorialPage from "./EditorialPage";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;

  const page = await getPageBySlug(slug);

  return defineMetadata({
    baseTitle: "Souf",
    title: page?.title ?? undefined,
    description: page?.overview ? toPlainText(page.overview) : "",
  });
}

export async function generateStaticParams() {
  const slugs = await getPagesPaths();
  return slugs.map((slug) => ({ slug }));
}

export default async function PageSlugRoute({ params }: Props) {
  const data = await getPageBySlug(params.slug);

  if (!data && !draftMode().isEnabled) {
    notFound();
  }

  return <EditorialPage data={data} />;
}
