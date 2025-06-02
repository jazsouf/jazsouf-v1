import { Header } from "@/components/shared/Header";
import { defineMetadata } from "@/utils/metadata";
import { toPlainText } from "@portabletext/react";
import type { Metadata } from "next/types";

import ImageBox from "@/components/shared/ImageBox";
import { ProjectBox } from "@/components/portfolio/ProjectBox";
import { sanityFetch } from "@/sanity-cms/fetch";
import { HOME_PAGE, SETTINGS } from "@/sanity-cms/groq";
import type { HOME_PAGEResult } from "@/sanity-cms/types";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const [{ data: settings }, { data: page }] = await Promise.all([
    sanityFetch({ query: SETTINGS }),
    sanityFetch({ query: HOME_PAGE }),
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
  const {
    overview,
    showcaseProjects = [],
    title = "",
    services,
    stack,
    avatar,
  } = data ?? {};

  return (
    <main className="flex flex-col gap-12 pb-32">
      {title && overview && (
        <Header centered title={title} description={overview} />
      )}
      {showcaseProjects && showcaseProjects.length > 0 && (
        <section className="flex flex-col pt-4 justify-start items-center">
          <div id="projects" className="absolute translate-y-[-160px]" />
          <h2 className="text-md lowercase w-full text-t-color opacity-80 pb-4 px-3">
            Some recent projects I worked on
          </h2>
          <ul className="w-full">
            {showcaseProjects.map((project) => {
              return (
                <li
                  key={project.slug}
                  className={
                    "flex flex-col first:border-t border-a-color border-b"
                  }
                >
                  <ProjectBox project={project} />
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
                alt="my social media avatar: a man wearing a purple beanie looking down at his phone"
                classesWrapper="border border-a-color aspect-square"
                width={500}
                height={500}
              />
            </div>
          </div>
        )}
        <section className="col-start-2 text-center">
          <h2 className="text-md lowercase w-full text-t-color opacity-80 pb-4 ">
            Services
          </h2>
          {services?.map((service) => (
            <div key={service} className="text-t-color">
              {service}
            </div>
          ))}
        </section>
        <section className="col-start-3 text-center">
          <h2 className="text-md lowercase w-full text-t-color opacity-80 pb-4">
            Stack
          </h2>
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
