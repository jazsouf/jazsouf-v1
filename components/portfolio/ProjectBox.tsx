"use client";

import { CustomPortableText } from "@/components/portableText/CustomPortableText";
import ImageBox from "@/components/shared/ImageBox";
import type { HOME_PAGEResult } from "@/sanity-cms/types";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ProjectProps {
  project: NonNullable<HOME_PAGEResult>["showcaseProjects"][number];
}

export function ProjectBox({ project }: { project: ProjectProps["project"] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState("0px");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isExpanded ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isExpanded]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleExpanded();
    }
  };

  return (
    <article className="overflow-hidden relative flex w-full flex-col">
      <header
        role="button"
        tabIndex={0}
        onClick={toggleExpanded}
        onKeyDown={handleKeyDown}
        aria-expanded={isExpanded}
        aria-controls={`project-details-${project.slug}`}
        className="hover:bg-a-color flex w-full flex-col justify-between p-3 xl:py-0 cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-a-color focus:ring-inset"
      >
        <div className="contents py-1 md:grid gap-2 grid-cols-5 text-left">
          <h3 className="text-md font-extrabold md:text-lg flex items-center justify-between md:justify-start">
            <span>{project.title}</span>
            <span className="md:hidden transition-transform duration-300" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              <ChevronDown className="size-4" />
            </span>
          </h3>
          <div className="text-t-color opacity-80">
            {project.services?.join(", ")}
          </div>
          <div className="text-t-color col-span-2 flex items-center">
            <CustomPortableText value={project.overview} />
          </div>
          <div className="text-t-color opacity-80 flex items-center justify-between">
            <time dateTime={project.year?.toString()}>{project.year}</time>
            <span className="hidden md:inline transition-transform duration-300" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              <ChevronDown className="size-4" />
            </span>
          </div>
        </div>
      </header>
      
      <div
        id={`project-details-${project.slug}`}
        className="border-t border-a-color bg-bg-color transition-all duration-500 ease-in-out overflow-hidden"
        style={{ height, opacity: isExpanded ? 1 : 0 }}
      >
        <div ref={contentRef} className="p-3">
          {project.coverImage && (
            <figure className="mb-4">
              <ImageBox
                image={project.coverImage?.asset}
                alt={`Cover image for ${project.title}`}
                classesWrapper="relative aspect-[16/9]"
                size="(max-width: 768px) 90vw, 60vw"
              />
            </figure>
          )}
          
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
            {project.client && (
              <div>
                <h4 className="text-xs md:text-sm font-bold pb-0.5 text-t-color opacity-80">Client</h4>
                <div className="text-md md:text-lg text-t-color">{project.client}</div>
              </div>
            )}
            
            {project.site && (
              <div>
                <h4 className="text-xs md:text-sm font-bold pb-0.5 text-t-color opacity-80">Site</h4>
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-ah-color text-a-color break-words underline text-md md:text-lg transition-colors duration-200"
                  href={project.site}
                  aria-label={`Visit live site for ${project.title} (opens in new tab)`}
                >
                  Visit Live
                </a>
              </div>
            )}
            
            <div>
              <h4 className="text-xs md:text-sm font-bold pb-0.5 text-t-color opacity-80">Year</h4>
              <time dateTime={project.year?.toString()} className="text-md md:text-lg text-t-color">
                {project.year}
              </time>
            </div>
            
            {project.tags && project.tags.length > 0 && (
              <div>
                <h4 className="text-xs md:text-sm font-bold pb-0.5 text-t-color opacity-80">Stack</h4>
                <ul className="text-md flex flex-wrap gap-2 md:text-lg text-t-color">
                  {project.tags.map((tag: string) => (
                    <li key={tag} className="break-words">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
          
          {project.description && (
            <section className="mb-4">
              <h4 className="text-xs md:text-sm font-bold pb-2 text-t-color opacity-80">Description</h4>
              <CustomPortableText
                paragraphClasses="text-lg text-t-color"
                value={project.description}
              />
            </section>
          )}
          
          {project.extraImages && project.extraImages.length > 0 && (
            <section>
              <h4 className="text-xs md:text-sm font-bold pb-2 text-t-color opacity-80">Additional Images</h4>
              <div className="grid gap-4">
                {project.extraImages.map((image, index) => (
                  <figure key={image._key}>
                    <ImageBox
                      image={image.asset}
                      alt={`Additional image ${index + 1} for ${project.title}`}
                      classesWrapper="relative aspect-[16/9]"
                      size="(max-width: 768px) 90vw, 60vw"
                    />
                  </figure>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}