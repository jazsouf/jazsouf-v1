import { CustomPortableText } from "@/components/shared/CustomPortableText";
import ImageBox from "@/components/shared/ImageBox";
import type { HOME_PAGEResult } from "@/sanity-cms/types";
import type { PortableTextBlock } from "next-sanity";

interface ProjectProps {
  project: NonNullable<HOME_PAGEResult>["showcaseProjects"][number];
  odd: number;
}

export function ProjectListItem(props: ProjectProps) {
  const { project } = props;

  return (
    <div className="hover:bg-ah-color animate-hard-fade-in flex flex-col p-4 gap-2 transition">
      <div className="w-full">
        <ImageBox
          image={project.coverImage?.asset}
          alt={`Cover image from ${project.title}`}
          classesWrapper="relative aspect-[16/9] border-[0.5px]"
        />
      </div>
      <div className="flex overflow-clip">
        <TextBox project={project} />
      </div>
    </div>
  );
}

function TextBox({ project }: { project: ProjectProps["project"] }) {
  return (
    <div className="relative  flex w-full flex-col justify-between p-3 xl:pt-0">
      <div>
        {/* Title */}
        <div className="mb-2 pt-2 text-xl font-extrabold md:text-3xl">{project.title}</div>
        {/* Overview  */}
        <div className="text-t-color font-mono">
          <CustomPortableText value={project.overview} />
        </div>
      </div>
      {/* Tags */}
      <div className="mt-2 flex flex-row gap-x-2">
        {project.tags?.map((tag) => (
          <div className="text-sm font-medium lowercase" key={tag}>
            #{tag}
          </div>
        ))}
      </div>
    </div>
  );
}
