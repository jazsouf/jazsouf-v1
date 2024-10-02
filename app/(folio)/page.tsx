import { getHomePage, getSettings } from "@/sanity-cms/fetch";
import { defineMetadata } from "@/utils/metadata";
import { toPlainText } from "next-sanity";
import type { Metadata } from "next/types";
import { cache } from "react";

const getCachedHomePage = cache(getHomePage);

export async function generateMetadata(): Promise<Metadata> {
  const [settings, page] = await Promise.all([getSettings(), getCachedHomePage()]);

  return defineMetadata({
    description: page?.overview ? toPlainText(page.overview) : "",
    image: settings?.ogImage?.asset,
    title: page?.title ?? "",
  });
}

export default async function IndexRoute() {
  const data = await getCachedHomePage();

  if (!data) {
    return null;
  }

  return <HomePage data={data} />;
}

import { CustomPortableText } from "@/components/portableText/CustomPortableText";
import { Header } from "@/components/shared/Header";
import { resolveHref } from "@/sanity-cms/links";

import type { HOME_PAGEResult } from "@/sanity-cms/types";
import Link from "next/link";

function HomePage({ data }: { data: NonNullable<HOME_PAGEResult> }) {
  // Default to an empty object to allow previews on non-existent documents
  const { overview, showcaseProjects = [], title = "" } = data ?? {};

  return (
    <main className="flex flex-col gap-12 p-12 pb-32 px-6 md:px-[20%]">
      {title && overview && <Header centered title={title} description={overview} />}
      {showcaseProjects && showcaseProjects.length > 0 && (
        <section className="flex flex-col pt-4" id="projects">
          <h2 className="text-md lowercase text-t-color opacity-60 pb-4 px-0.5">Some Projects</h2>
          <ul>
            {showcaseProjects.map((project) => {
              return (
                <li
                  key={project.slug}
                  className={
                    "border-b border-b-color hover:bg-s-color animate-fade-in flex flex-col transition :first-child:border-t"
                  }
                >
                  <TextBox project={project} />
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </main>
  );
}

interface ProjectProps {
  project: NonNullable<HOME_PAGEResult>["showcaseProjects"][number];
}

function TextBox({ project }: { project: ProjectProps["project"] }) {
  const href = resolveHref(project._type, project.slug);
  if (!href) {
    return null;
  }
  return (
    <Link
      href={href}
      className="overflow-hidden relative flex w-full flex-col justify-between p-3 xl:pt-0"
    >
      <div className="mb-1 pt-2 text-md font-extrabold md:text-xl">{project.title}</div>
      <div className="text-t-color">
        <CustomPortableText value={project.overview} />
      </div>
      <div className="mt-2 flex flex-row gap-x-2">
        {project.tags?.map((tag) => (
          <div className="text-sm lowercase text-gray-700" key={tag}>
            {tag}
          </div>
        ))}
      </div>
    </Link>
  );
}
