import { CustomPortableText } from "@/components/shared/CustomPortableText";
import { Header } from "@/components/shared/Header";
import { resolveHref } from "@/sanity-cms/lib/links";
import type { HOME_PAGEResult } from "@/sanity-cms/types";
import Link from "next/link";

export default function HomePage({ data }: { data: NonNullable<HOME_PAGEResult> }) {
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
                <ProjectListItem project={project} odd={key % 2} />
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
  odd: number;
}

export function ProjectListItem(props: ProjectProps) {
  const { project } = props;

  return (
    <div className="hover:bg-ah-color animate-hard-fade-in flex flex-col transition">
      <div className="flex overflow-clip">
        <TextBox project={project} />
      </div>
    </div>
  );
}

function TextBox({ project }: { project: ProjectProps["project"] }) {
  return (
    <div className="relative flex w-full flex-col justify-between p-3 xl:pt-0">
      <div>
        {/* Title */}
        <div className="mb-2 pt-2 text-md font-extrabold md:text-xl">{project.title}</div>
        {/* Overview  */}
        <div className="text-t-color font-mono">
          <CustomPortableText value={project.overview} />
        </div>
      </div>
      {/* Tags */}
      <div className="mt-2 flex flex-row gap-x-2">
        {project.tags?.map((tag) => (
          <div className="text-sm font-medium lowercase" key={tag}>
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}
