import { CustomPortableText } from "@/components/portableText/CustomPortableText";
import { Header } from "@/components/shared/Header";
import { resolveHref } from "@/sanity-cms/links";
import { defineMetadata } from "@/utils/metadata";
import { toPlainText } from "next-sanity";
import type { Metadata } from "next/types";

import ImageBox from "@/components/shared/ImageBox";
import { sanityFetch } from "@/sanity-cms/live";
import { HOME_PAGE, SETTINGS } from "@/sanity-cms/queries";
import type { HOME_PAGEResult } from "@/sanity-cms/types";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const [{ data: settings }, { data: page }] = await Promise.all([
    sanityFetch({ query: SETTINGS, stega: false }),
    sanityFetch({ query: HOME_PAGE, stega: false }),
  ]);

  return defineMetadata({
    description: page?.overview ? toPlainText(page.overview) : "",
    image: settings?.ogImage?.asset,
    title: page?.title ?? "",
  });
}

export default async function IndexRoute() {
  const { data } = await sanityFetch({
    query: HOME_PAGE,
  });

  if (!data) {
    return null;
  }

  return <HomePage data={data} />;
}

function HomePage({ data }: { data: NonNullable<HOME_PAGEResult> }) {
  const { overview, showcaseProjects = [], title = "", services, stack, avatar } = data ?? {};

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
                    "hover:bg-a-color animate-fade-in flex flex-col transition first:border-t border-a-color border-b px-2"
                  }
                >
                  <TextBox project={project} />
                </li>
              );
            })}
          </ul>
        </section>
      )}
      <div className="grid grid-cols-3 gap-4 pb-4 px-2 text-lg md:text-xl text-center">
        {avatar && (
          <div className="col-start-1 flex items-center justify-center">
            <div className="md:size-52 size-28">
              <ImageBox
                image={avatar?.asset}
                alt="my social media avatar"
                classesWrapper="border border-a-color aspect-square"
              />
            </div>
          </div>
        )}
        <section className="col-start-2 text-center">
          <h2 className="text-md lowercase w-full text-t-color opacity-70 pb-4 ">Services</h2>
          {services?.map((service) => (
            <div key={service} className="text-t-color">
              {service}
            </div>
          ))}
        </section>
        <section className="col-start-3 text-center">
          <h2 className="text-md lowercase w-full text-t-color opacity-70 pb-4">Stack</h2>
          {stack?.map((item) => (
            <div key={item} className="text-t-color">
              {item}
            </div>
          ))}
        </section>
      </div>
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
      className="overflow-hidden relative flex w-full flex-col justify-between p-3 xl:py-0"
    >
      <div className="contents py-1 md:grid gap-2 grid-cols-5 text-left">
        <div className="text-md font-extrabold md:text-lg flex items-center">{project.title}</div>
        <div className="text-t-color opacity-70">{project.services?.join(", ")}</div>
        <div className="text-t-color col-span-2 flex items-center">
          <CustomPortableText value={project.overview} />
        </div>
        <div className="text-t-color opacity-70">{project.year}</div>
      </div>
    </Link>
  );
}
