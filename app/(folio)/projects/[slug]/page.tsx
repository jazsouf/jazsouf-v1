import { getHomePageTitle, getProjectBySlug, getProjectsPaths } from "@/sanity-cms/lib/fetch";
import { defineMetadata } from "@/utils/metadata";
import { toPlainText } from "next-sanity";
import { notFound } from "next/navigation";
import type { Metadata } from "next/types";
import { cache } from "react";
import ProjectPage from "./ProjectPage";

type Props = {
  params: { slug: string };
};

const getCachedProjectBySlug = cache(getProjectBySlug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;

  const [homePageTitle, project] = await Promise.all([
    getHomePageTitle(),
    getCachedProjectBySlug(slug),
  ]);

  return defineMetadata({
    baseTitle: homePageTitle?.title ?? "",
    description: project?.overview ? toPlainText(project.overview) : "",
    image: project?.coverImage?.asset,
    title: project?.title ?? "",
  });
}

export async function generateStaticParams() {
  const slugs = await getProjectsPaths();
  return slugs.map((slug) => slug);
}

export default async function ProjectSlugRoute({ params }: Props) {
  const data = await getCachedProjectBySlug(params.slug);

  if (!data) {
    notFound();
  }

  return <ProjectPage data={data} />;
}
