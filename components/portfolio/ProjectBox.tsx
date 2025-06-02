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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Check for user's motion preferences
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      if (prefersReducedMotion) {
        // Instant transition for reduced motion
        setHeight(isExpanded ? "auto" : "0px");
      } else {
        // Smooth animation for normal motion
        setHeight(isExpanded ? `${contentRef.current.scrollHeight}px` : "0px");
      }
    }
  }, [isExpanded, prefersReducedMotion]);

  const smoothScrollToElement = (element: HTMLElement) => {
    const elementRect = element.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.pageYOffset;
    const middle = absoluteElementTop - 20; // 20px offset from top

    if (prefersReducedMotion) {
      window.scrollTo(0, middle);
      return;
    }

    // Custom smooth scroll that works consistently across browsers
    const startPosition = window.pageYOffset;
    const distance = middle - startPosition;
    const duration = 800; // 800ms for smoother animation
    let start: number | null = null;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const progressPercentage = Math.min(progress / duration, 1);

      // Easing function for smooth animation
      const ease = 1 - Math.pow(1 - progressPercentage, 3);

      window.scrollTo(0, startPosition + distance * ease);

      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  const toggleExpanded = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);

    // Scroll to top when expanding (not when closing)
    if (newExpandedState && headerRef.current) {
      // Small delay to allow animation to start
      setTimeout(() => {
        smoothScrollToElement(headerRef.current!);
      }, 100);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleExpanded();
    }
  };

  const animationClasses = prefersReducedMotion
    ? ""
    : "transition-all duration-500 ease-out";

  const iconAnimationClasses = prefersReducedMotion
    ? ""
    : "transition-transform duration-300 ease-out";

  const colorTransitionClasses = prefersReducedMotion
    ? ""
    : "transition-colors duration-200";

  return (
    <article className="overflow-hidden relative flex w-full flex-col">
      <header
        ref={headerRef}
        role="button"
        tabIndex={0}
        onClick={toggleExpanded}
        onKeyDown={handleKeyDown}
        aria-expanded={isExpanded}
        aria-controls={`project-details-${project.slug}`}
        className={`hover:bg-gray-50/50 flex w-full cursor-pointer focus:outline-none focus:bg-gray-50/70 ${colorTransitionClasses}`}
      >
        <div className="w-full py-4 px-4 md:grid gap-4 grid-cols-12 text-left items-center">
          <h3 className="text-sm font-medium flex items-center justify-between md:justify-start col-span-12 md:col-span-3 tracking-tight mb-2 md:mb-0">
            <span className="text-gray-900">{project.title}</span>
            <span
              className={`md:hidden ml-3 text-gray-500 ${iconAnimationClasses}`}
              style={{
                transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              <ChevronDown className="size-4" />
            </span>
          </h3>

          <div className="text-gray-600 text-sm col-span-12 md:col-span-2 font-normal mb-2 md:mb-0">
            {project.services?.join(" • ")}
          </div>

          <div className="text-gray-700 col-span-12 md:col-span-5 flex items-center text-sm leading-relaxed mb-2 md:mb-0">
            <CustomPortableText value={project.overview} />
          </div>

          <div className="text-gray-600 col-span-12 md:col-span-2 flex items-center justify-between text-sm font-normal">
            <time dateTime={project.year?.toString()}>{project.year}</time>
            <span
              className={`hidden md:inline ml-3 ${iconAnimationClasses}`}
              style={{
                transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              <ChevronDown className="size-4 text-gray-500" />
            </span>
          </div>
        </div>
      </header>

      <div
        id={`project-details-${project.slug}`}
        className={`border-t border-gray-200/60 bg-gray-50/20 overflow-hidden ${animationClasses}`}
        style={{
          height,
          opacity: prefersReducedMotion
            ? isExpanded
              ? 1
              : 0
            : isExpanded
              ? 1
              : 0,
        }}
      >
        <div ref={contentRef} className="px-4 py-6">
          {project.coverImage && (
            <figure className="mb-8 max-w-5xl mx-auto">
              <ImageBox
                image={project.coverImage?.asset}
                alt={`Cover image for ${project.title}`}
                classesWrapper="relative aspect-[16/9] rounded overflow-hidden mb-4"
                size="(max-width: 768px) 90vw, 70vw"
              />
            </figure>
          )}

          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {project.client && (
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-wide font-medium text-gray-500">
                  Client
                </h4>
                <div className="text-sm text-gray-900 font-normal">
                  {project.client}
                </div>
              </div>
            )}

            {project.site && (
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-wide font-medium text-gray-500">
                  Live Site
                </h4>
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  className={`hover:text-blue-700 text-blue-600 break-words underline underline-offset-2 decoration-1 text-sm font-normal ${colorTransitionClasses}`}
                  href={project.site}
                  aria-label={`Visit live site for ${project.title} (opens in new tab)`}
                >
                  Visit Live →
                </a>
              </div>
            )}

            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-wide font-medium text-gray-500">
                Year
              </h4>
              <time
                dateTime={project.year?.toString()}
                className="text-sm text-gray-900 font-normal"
              >
                {project.year}
              </time>
            </div>

            {project.tags && project.tags.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-wide font-medium text-gray-500 pb-1">
                  Stack
                </h4>
                <ul className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag: string) => (
                    <li
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded font-normal"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {project.description && (
            <section className="mb-8">
              <h4 className="text-xs uppercase tracking-wide font-medium text-gray-500 mb-4">
                Description
              </h4>
              <div className="prose prose-sm prose-gray max-w-none">
                <CustomPortableText
                  paragraphClasses="text-sm leading-relaxed text-gray-700 mb-3"
                  value={project.description}
                />
              </div>
            </section>
          )}

          {project.extraImages && project.extraImages.length > 0 && (
            <section>
              <h4 className="text-xs uppercase tracking-wide font-medium text-gray-500 mb-5">
                Additional Images
              </h4>
              <div className="grid gap-6">
                {project.extraImages.map((image, index) => (
                  <figure key={image._key} className="group">
                    <ImageBox
                      image={image.asset}
                      alt={`Additional image ${index + 1} for ${project.title}`}
                      classesWrapper="relative aspect-[16/9] rounded overflow-hidden group-hover:shadow-sm transition-shadow duration-300"
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
