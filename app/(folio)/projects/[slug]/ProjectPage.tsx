import { CustomPortableText } from "@/components/shared/CustomPortableText";
import { Header } from "@/components/shared/Header";
import ImageBox from "@/components/shared/ImageBox";
import type { PROJECT_BY_SLUGResult } from "@/sanity-cms/types";
import Link from "next/link";

export interface ProjectPageProps {
  data: NonNullable<PROJECT_BY_SLUGResult>;
}

export function ProjectPage({ data }: ProjectPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { client, coverImage, description, site, tags, title } = data ?? {};

  return (
    <div className="bg-p-color">
      <div className="animate-fade-in p-12 pb-32 sm:p-20 md:px-[12.5%]">
        <h1 className="text-xl text-t-color mb-4">{title}</h1>
        <div className="border-b-color border">
          <ImageBox
            image={coverImage?.asset}
            alt={`Cover image for ${title}`}
            classesWrapper="relative aspect-[16/9]"
          />

          <div className="divide-inherit text-t-color grid grid-cols-1 divide-y [text-wrap:pretty] lg:grid-cols-4 lg:divide-x lg:divide-y-0">
            {/* Client */}
            {client && (
              <div className="p-3 lg:p-4">
                <div className="text-xs md:text-sm">Client</div>
                <div className="text-md md:text-lg">{client}</div>
              </div>
            )}

            {site && (
              <div className="p-3 lg:p-4">
                <div className="text-xs md:text-sm">Site</div>
                {site && (
                  <Link
                    target="_blank"
                    className="text-md hover:text-ah-color text-a-color break-words underline md:text-sm transition"
                    href={site}
                  >
                    {title}
                  </Link>
                )}
              </div>
            )}

            {/* Tags */}
            <div className="p-3 lg:p-4">
              <div className="text-xs md:text-sm">Stack</div>
              <div className="text-md flex flex-row flex-wrap md:text-lg">
                {tags?.map((tag: string) => (
                  <div key={tag} className="mr-1 break-words ">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {description && (
          <div className="py-3 px-1 lg:py-4">
            <CustomPortableText
              paragraphClasses="font-mono max-w-3xl text-xl text-t-color"
              value={description}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectPage;
