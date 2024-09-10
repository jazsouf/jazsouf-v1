import type { PAGE_BY_SLUGResult } from "@/sanity-cms/types";
import { PortableText, type PortableTextComponents } from "next-sanity";
import type { Image } from "sanity";
import ImageBox from "./ImageBox";
import { TimelineSection } from "./TimelineSection";

export function CustomPortableText({
  paragraphClasses,
  value,
}: {
  paragraphClasses?: string;
  value: PAGE_BY_SLUGResult["body"];
}) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        return <p className={paragraphClasses}>{children}</p>;
      },
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <a
            className="hover:text-lh-color text-l-color underline underline-offset-2 transition"
            href={value?.href}
            rel="noreferrer noopener"
          >
            {children}
          </a>
        );
      },
    },
    types: {
      image: ({
        value,
      }: {
        value: Image & { alt?: string; caption?: string };
      }) => {
        return (
          <div className="my-6 space-y-2">
            <ImageBox
              image={value}
              alt={value.alt}
              classesWrapper="relative aspect-[16/9]"
            />
            {value?.caption && (
              <div className="text-t-color font-mono text-sm">
                {value.caption}
              </div>
            )}
          </div>
        );
      },
      timeline: ({ value }) => {
        const { items } = value || {};
        return <TimelineSection timelines={items} />;
      },
    },
  };

  return <PortableText components={components} value={value} />;
}
