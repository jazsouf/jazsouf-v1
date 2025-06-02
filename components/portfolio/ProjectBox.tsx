"use client";

import { CustomPortableText } from "@/components/portableText/CustomPortableText";
import ImageBox from "@/components/shared/ImageBox";
import type { HOME_PAGEResult } from "@/sanity-cms/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface ProjectProps {
  project: NonNullable<HOME_PAGEResult>["showcaseProjects"][number];
}

export function ProjectBox({ project }: { project: ProjectProps["project"] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="overflow-hidden relative flex w-full flex-col">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="hover:bg-a-color flex w-full flex-col justify-between p-3 xl:py-0 text-left"
      >
        <div className="contents py-1 md:grid gap-2 grid-cols-5 text-left">
          <div className="text-md font-extrabold md:text-lg flex items-center justify-between md:justify-start">
            <span>{project.title}</span>
            <span className="md:hidden">
              {isExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
            </span>
          </div>
          <div className="text-t-color opacity-80">
            {project.services?.join(", ")}
          </div>
          <div className="text-t-color col-span-2 flex items-center">
            <CustomPortableText value={project.overview} />
          </div>
          <div className="text-t-color opacity-80 flex items-center justify-between">
            <span>{project.year}</span>
            <span className="hidden md:inline">
              {isExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
            </span>
          </div>
        </div>
      </button>
      
      {isExpanded && (
        <div className="border-t border-a-color bg-bg-color">
          <div className="p-3">
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
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
              {project.client && (
                <div>
                  <h3 className="text-xs md:text-sm font-bold pb-0.5 text-t-color opacity-80">Client</h3>
                  <div className="text-md md:text-lg text-t-color">{project.client}</div>
                </div>
              )}
              
              {project.site && (
                <div>
                  <h3 className="text-xs md:text-sm font-bold pb-0.5 text-t-color opacity-80">Site</h3>
                  <a
                    target="_blank"
                    rel="noreferrer noopener"
                    className="hover:text-ah-color text-a-color break-words underline text-md md:text-lg transition"
                    href={project.site}
                  >
                    Visit Live
                  </a>
                </div>
              )}
              
              <div>
                <h3 className="text-xs md:text-sm font-bold pb-0.5 text-t-color opacity-80">Year</h3>
                <div className="text-md md:text-lg text-t-color">{project.year}</div>
              </div>
              
              {project.tags && project.tags.length > 0 && (
                <div>
                  <h3 className="text-xs md:text-sm font-bold pb-0.5 text-t-color opacity-80">Stack</h3>
                  <div className="text-md flex flex-wrap gap-2 md:text-lg text-t-color">
                    {project.tags.map((tag: string) => (
                      <span key={tag} className="break-words">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {project.description && (
              <div className="mb-4">
                <h3 className="text-xs md:text-sm font-bold pb-2 text-t-color opacity-80">Description</h3>
                <CustomPortableText
                  paragraphClasses="text-lg text-t-color"
                  value={project.description}
                />
              </div>
            )}
            
            {project.extraImages && project.extraImages.length > 0 && (
              <div>
                <h3 className="text-xs md:text-sm font-bold pb-2 text-t-color opacity-80">Additional Images</h3>
                <div className="grid gap-4">
                  {project.extraImages.map((image) => (
                    <figure key={image._key}>
                      <ImageBox
                        image={image.asset}
                        alt={`Extra image for ${project.title}`}
                        classesWrapper="relative aspect-[16/9]"
                        size="(max-width: 768px) 90vw, 60vw"
                      />
                    </figure>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}