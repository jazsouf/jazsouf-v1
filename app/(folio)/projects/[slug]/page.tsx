import { CustomPortableText } from "@/components/portableText/CustomPortableText";
import ImageBox from "@/components/shared/ImageBox";
import {
  getHomePageTitle,
  getProjectBySlug,
  getProjectsPaths,
} from "@/sanity-cms/fetch";
import type { PROJECT_BY_SLUGResult } from "@/sanity-cms/types";
import { defineMetadata } from "@/utils/metadata";
import { toPlainText } from "@portabletext/react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next/types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const paramsData = await params;
  const { slug } = paramsData;

  const [{ data: homePageTitle }, { data: project }] = await Promise.all([
    getHomePageTitle(),
    getProjectBySlug(slug),
  ]);

  return defineMetadata({
    baseTitle: homePageTitle?.title ?? "",
    description: project?.overview ? toPlainText(project.overview) : "",
    image: project?.coverImage?.asset,
    title: project?.title ?? "",
  });
}

export async function generateStaticParams() {
  const { data: slugs } = await getProjectsPaths();
  return slugs.filter(Boolean);
}

export default async function ProjectSlugRoute({ params }: PageProps) {
  const paramsData = await params;
  const { data } = await getProjectBySlug(paramsData.slug, {});

  if (!data) {
    notFound();
  }

  return <ProjectPage data={data} />;
}

export interface ProjectPageProps {
  data: NonNullable<PROJECT_BY_SLUGResult>;
}

function ProjectPage({ data }: ProjectPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const {
    client,
    coverImage,
    description,
    site,
    tags,
    title,
    extraImages,
    year,
  } = data ?? {};

  return (
    <main className="overflow-hidden relative flex w-full flex-col justify-between p-3 xl:pt-0">
      <div className="p-12 pb-32 sm:p-20 md:px-[20%]">
        <Link
          href="/#projects"
          className="mt-10 mb-4 flex gap-1.5 items-center"
        >
          <ChevronLeft className="size-3" />
          Back to index
        </Link>
        <div className="border-a-color border">
          <h1 className="border-a-color border-b text-xl text-t-color py-6 px-2.5">
            {title}
          </h1>
          <figure className="p-2">
            <ImageBox
              image={coverImage?.asset}
              alt={`Cover image for ${title}`}
              classesWrapper="relative aspect-[16/9]"
              size="(max-width: 768px) 90vw, 60vw"
            />
          </figure>
          <div className="divide-inherit border-t border-a-color text-t-color grid grid-cols-1 divide-y text-balance lg:grid-cols-4 lg:divide-x lg:divide-y-0">
            {client && (
              <div className="p-3 lg:p-4">
                <h2 className="text-xs md:text-sm font-bold pb-0.5">Client</h2>
                <div className="text-md md:text-lg">{client}</div>
              </div>
            )}
            {site && (
              <div className="p-3 lg:p-4">
                <h2 className="text-xs md:text-sm font-bold pb-0.5">Site</h2>
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
              <h2 className="text-xs md:text-sm font-bold pb-0.5">Year</h2>
              <div className="text-md md:text-lg">{year}</div>
            </div>

            <div className="p-3 lg:p-4">
              <h2 className="text-xs md:text-sm font-bold pb-0.5">Stack</h2>
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
            <div className="py-3 px-2.5 lg:py-4 border-t border-a-color">
              <CustomPortableText
                paragraphClasses="max-w-3xl text-xl text-t-color"
                value={description}
              />
            </div>
          )}
          {extraImages && (
            <div className="border-t border-a-color">
              {extraImages.map((image) => (
                <figure key={image._key} className="p-2">
                  <ImageBox
                    image={image.asset}
                    alt={`Extra image for ${title}`}
                    classesWrapper="relative aspect-[16/9]"
                    size="(max-width: 768px) 90vw, 60vw"
                  />
                </figure>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
