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
  const { overview, showcaseProjects = [], title = "", services } = data ?? {};

  return (
    <main className="flex flex-col gap-12 pb-32">
      {title && overview && <Header centered title={title} description={overview} />}
      {showcaseProjects && showcaseProjects.length > 0 && (
        <section className="flex flex-col pt-4 justify-start items-center">
          <div id="projects" className="absolute translate-y-[-160px]" />
          <h2 className="text-md lowercase w-full text-t-color opacity-70 pb-4 px-3">
            Some recent projects I worked on
          </h2>
          <ul className="w-full">
            {showcaseProjects.map((project) => {
              return (
                <li
                  key={project.slug}
                  className={
                    "hover:bg-s-color animate-fade-in flex flex-col transition first:border-t border-b-color border-b px-2"
                  }
                >
                  <TextBox project={project} />
                </li>
              );
            })}
          </ul>
        </section>
      )}
      {services && (
        <section className="flex flex-col pt-4 justify-start items-center">
          <h2 className="text-md lowercase w-full text-t-color opacity-70 pb-4 px-2">Services</h2>
          {services.map((service) => (
            <div key={service} className="text-t-color">
              {service}
            </div>
          ))}
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
      <div className="contents pt-3 md:grid gap-2 grid-cols-5 text-left">
        <div className="text-md font-extrabold md:text-lg">{project.title}</div>
        <div className="text-t-color opacity-70">{project.services?.join(", ")}</div>
        <div className="text-t-color col-span-2">
          <CustomPortableText value={project.overview} />
        </div>
        <div className="text-t-color opacity-70">{project.year}</div>
      </div>
    </Link>
  );
}
