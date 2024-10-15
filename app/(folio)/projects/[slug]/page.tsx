import { getHomePageTitle, getProjectBySlug, getProjectsPaths } from "@/sanity-cms/fetch";
import { defineMetadata } from "@/utils/metadata";
import { toPlainText } from "next-sanity";
import { notFound } from "next/navigation";
import type { Metadata } from "next/types";
import { cache } from "react";

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
  console.log("static params", slugs);

  return slugs.map((slug) => slug.slug);
}

export default async function ProjectSlugRoute({ params }: Props) {
  const data = await getCachedProjectBySlug(params.slug);

  if (!data) {
    notFound();
  }

  return <ProjectPage data={data} />;
}

import { CustomPortableText } from "@/components/portableText/CustomPortableText";
import ImageBox from "@/components/shared/ImageBox";
import type { PROJECT_BY_SLUGResult } from "@/sanity-cms/types";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export interface ProjectPageProps {
  data: NonNullable<PROJECT_BY_SLUGResult>;
}

function ProjectPage({ data }: ProjectPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { client, coverImage, description, site, tags, title } = data ?? {};

  return (
    <main className="overflow-hidden relative flex w-full flex-col justify-between p-3 xl:pt-0">
      <div className="p-12 pb-32 sm:p-20 md:px-[20%]">
        <Link href="/#projects" className="mt-10 mb-4 flex gap-1.5 items-center">
          <ChevronLeft className="size-3" />
          Back to index
        </Link>
        <div className="border-b-color border">
          <h1 className="border-b-color border-b text-xl text-t-color py-6 px-2.5">{title}</h1>
          <figure className="p-2">
            <ImageBox
              image={coverImage?.asset}
              alt={`Cover image for ${title}`}
              classesWrapper="relative aspect-[16/9]"
              size="(max-width: 768px) 90vw, 60vw"
            />
          </figure>
          <div className="divide-inherit border-t border-b-color text-t-color grid grid-cols-1 divide-y text-balance lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            {client && (
              <div className="p-3 lg:p-4">
                <h2 className="text-xs md:text-sm font-bold">Client</h2>
                <div className="text-md md:text-lg">{client}</div>
              </div>
            )}
            {site && (
              <div className="p-3 lg:p-4">
                <h2 className="text-xs md:text-sm font-bold">Site</h2>
                {site && (
                  <a
                    target="_blank"
                    rel="noreferrer noopener"
                    className="hover:text-ah-color text-a-color break-words underline text-md md:text-lg transition"
                    href={site}
                  >
                    Visit Live
                  </a>
                )}
              </div>
            )}
            <div className="p-3 lg:p-4">
              <h2 className="text-xs md:text-sm font-bold">Stack</h2>
              <div className="text-md flex flex-row md:text-lg">
                {tags?.map((tag: string) => (
                  <div key={tag} className="mr-2.5 break-words">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {description && (
            <div className="py-3 px-2.5 lg:py-4 border-t border-b-color">
              <CustomPortableText
                paragraphClasses="max-w-3xl text-xl text-t-color"
                value={description}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
