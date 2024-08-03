import { ProjectListItem } from "components/pages/home/ProjectListItem";
import { Header } from "components/shared/Header";
import { resolveHref } from "lib/sanity.links";
import Link from "next/link";
import type { HomePagePayload } from "types";

export interface HomePageProps {
  data: HomePagePayload | null;
}

export function HomePage({ data }: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { overview = [], showcaseProjects = [], title = "" } = data ?? {};

  return (
    <div className="space-y-4 pb-14">
      {/* Header */}
      {title && <Header centered title={title} description={overview} />}
      {/* Showcase projects */}
      <h2 className="text-ah-color !mt-0 pb-2 pt-6 font-mono italic md:text-xl">
        Selected Projects{" "}
        <span className="font-mono text-xl font-extrabold md:text-2xl">
          &#8595;
        </span>
      </h2>
      {showcaseProjects && showcaseProjects.length > 0 && (
        <div className="mx-auto gap-4 flex flex-col">
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
