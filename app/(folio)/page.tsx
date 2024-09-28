import { getHomePage, getSettings } from "@/sanity-cms/fetch";
import { defineMetadata } from "@/utils/metadata";
import { cache } from "React";
import { toPlainText } from "next-sanity";
import type { Metadata } from "next/types";

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
    <div className="flex flex-col gap-12 p-12 pb-32 sm:p-20 md:px-[12.5%]">
      {title && overview && <Header centered title={title} description={overview} />}
      {showcaseProjects && showcaseProjects.length > 0 && (
        <div className="flex flex-col">
          <h2 className="text-2xl uppercase text-t-color pb-2">Selected Projects</h2>
          {showcaseProjects.map((project, key) => {
            const href = resolveHref(project._type, project.slug);
            if (!href) {
              return null;
            }
            return (
              <Link
                key={project.slug}
                href={href}
                className={`border-b border-b-color ${key === 0 && "border-t"}`}
              >
                <ProjectListItem project={project} />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface ProjectProps {
  project: NonNullable<HOME_PAGEResult>["showcaseProjects"][number];
}

export function ProjectListItem(props: ProjectProps) {
  const { project } = props;

  return (
    <div className="hover:bg-ah-color animate-fade-in flex flex-col transition">
      <div className="flex overflow-clip">
        <TextBox project={project} />
      </div>
    </div>
  );
}

function TextBox({ project }: { project: ProjectProps["project"] }) {
  return (
    <main className="relative flex w-full flex-col justify-between p-3 xl:pt-0">
      <div>
        <div className="mb-2 pt-2 text-md font-extrabold md:text-xl">{project.title}</div>
        <div className="text-t-color">
          <CustomPortableText value={project.overview} />
        </div>
      </div>
      <div className="mt-2 flex flex-row gap-x-2">
        {project.tags?.map((tag) => (
          <div className="text-sm lowercase" key={tag}>
            {tag}
          </div>
        ))}
      </div>
    </main>
  );
}
