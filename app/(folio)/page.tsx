import { Header } from "@/components/shared/Header";
import { defineMetadata } from "@/utils/metadata";
import { toPlainText } from "@portabletext/react";
import type { Metadata } from "next/types";

import { ProjectBox } from "@/components/portfolio/ProjectBox";
import ImageBox from "@/components/shared/ImageBox";
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
      <div className="grid grid-cols-1 gap-4 pb-4 px-2 text-lg md:text-xl text-center">
        {avatar && (
          <div className="flex items-center justify-center">
            <figure className="md:size-52 size-28">
              <ImageBox
                image={avatar?.asset}
                alt="my face trying to debugs"
                classesWrapper="border border-a-color aspect-square"
                width={500}
                height={500}
              />
              <figcaption className="text-sm lowercase w-full text-t-color opacity-70 pb-2">
                Me not paying attention during a meeting
              </figcaption>
            </figure>
          </div>
        )}
      </div>
    </main>
  );
}
