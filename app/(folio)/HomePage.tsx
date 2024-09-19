import { Header } from "@/components/shared/Header";
import { resolveHref } from "@/sanity-cms/lib/links";
import type { HOME_PAGEResult } from "@/sanity-cms/types";
import Link from "next/link";
import { ProjectListItem } from "./ProjectListItem";

export function HomePage({ data }: { data: NonNullable<HOME_PAGEResult> }) {
  // Default to an empty object to allow previews on non-existent documents
  const { overview, showcaseProjects = [], title = "" } = data ?? {};

  return (
    <div className="flex flex-col gap-12 p-12 pb-32 sm:p-20 md:px-[12.5%]">
      {title && overview && <Header centered title={title} description={overview} />}
      {showcaseProjects && showcaseProjects.length > 0 && (
        <div className="flex flex-col gap-24 px-12 sm:px-20 md:px-[12.5%] pb-32 sm:pb-20">
          <h2 className="text-xl text-a-color max-w-md">
            Selected Projects <span className="text-xl md:text-2xl">&#8595;</span>
          </h2>
          {showcaseProjects.map((project, key) => {
            const href = resolveHref(project._type, project.slug);
            if (!href) {
              return null;
            }
            return (
              <Link key={project.slug} href={href}>
                <ProjectListItem project={project} odd={key % 2} />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default HomePage;
