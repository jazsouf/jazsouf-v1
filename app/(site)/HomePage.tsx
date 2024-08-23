import { Header } from "components/shared/Header";
import { resolveHref } from "lib/sanity.links";
import Link from "next/link";
import type { HomePagePayload } from "types";
import { ProjectListItem } from "./ProjectListItem";

export interface HomePageProps {
  data: HomePagePayload | null;
}

export function HomePage({ data }: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { overview = [], showcaseProjects = [], title = "" } = data ?? {};

  return (
    <div className="flex flex-col gap-24 px-12 sm:px-20 md:px-[12.5%] pb-32 sm:pb-20">
      {/* Header */}
      {title && <Header centered title={title} description={overview} />}
      {/* Showcase projects */}
      <h2 className="text-a-color font-mono italic md:text-xl">
        Selected Projects{" "}
        <span className="font-mono text-xl font-extrabold md:text-2xl">
          &#8595;
        </span>
      </h2>
      {showcaseProjects && showcaseProjects.length > 0 && (
        <div className="gap-4 flex flex-col max-w-xl">
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
