import { CustomPortableText } from "@/components/shared/CustomPortableText";
import { Header } from "@/components/shared/Header";
import ImageBox from "@/components/shared/ImageBox";
import type { ProjectPayload } from "@/sanity-cms/types";
import Link from "next/link";

export interface ProjectPageProps {
  data: ProjectPayload | null;
}

export function ProjectPage({ data }: ProjectPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const {
    client,
    coverImage,
    description,
    duration,
    overview,
    site,
    tags,
    title,
  } = data ?? {};

  const startYear = duration?.start
    ? new Date(duration.start).getFullYear()
    : null;
  const endYear = duration?.end ? new Date(duration.end).getFullYear() : null;

  return (
    <div>
      <div className="animate-fade-in mb-20 space-y-6">
        <Header title={title} description={overview} />

        <div className="border-b-color border">
          <ImageBox
            image={coverImage}
            alt={`Cover image for ${title}`}
            classesWrapper="relative aspect-[16/9]"
          />

          <div className="divide-inherit text-t-color grid grid-cols-1 divide-y [text-wrap:pretty] lg:grid-cols-4 lg:divide-x lg:divide-y-0">
            {/* Duration */}
            {!!(startYear && endYear) && (
              <div className="p-3 lg:p-4">
                <div className="text-xs md:text-sm">Date</div>
                <div className="text-md md:text-lg">{`${startYear}`}</div>
              </div>
            )}

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
              <div className="text-xs md:text-sm">Tags</div>
              <div className="text-md flex flex-row flex-wrap md:text-lg">
                {tags?.map((tag: string) => (
                  <div key={tag} className="mr-1 break-words ">
                    #{tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {description && (
          <CustomPortableText
            paragraphClasses="font-mono max-w-3xl text-xl text-t-color"
            value={description}
          />
        )}
      </div>
      <div className="border-b-color absolute left-0 w-screen border-t" />
    </div>
  );
}

export default ProjectPage;
