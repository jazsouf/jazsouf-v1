import {
  getHomePageTitle,
  getProjectBySlug,
  getProjectsPaths,
} from "@/sanity-cms/lib/fetch";
import { defineMetadata } from "@/utils/metadata";
import { toPlainText } from "next-sanity";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next/types";
import ProjectPage from "./ProjectPage";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;

  const [homePageTitle, project] = await Promise.all([
    getHomePageTitle(),
    getProjectBySlug(slug),
  ]);

  return defineMetadata({
    baseTitle: homePageTitle ?? undefined,
    description: project?.overview ? toPlainText(project.overview) : "",
    image: project?.coverImage,
    title: project?.title,
  });
}

export async function generateStaticParams() {
  const slugs: string[] = await getProjectsPaths();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectSlugRoute({ params }: Props) {
  const data = await getProjectBySlug(params.slug);

  if (!data && !draftMode().isEnabled) {
    notFound();
  }

  return <ProjectPage data={data} />;
}
