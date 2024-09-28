import { TimelineSection } from "@/components/portableText/TimelineSection";
import ImageBox from "@/components/shared/ImageBox";

import type { ART_BY_SLUGResult, PAGE_BY_SLUGResult, SETTINGSResult } from "@/sanity-cms/types";
import { PortableText, type PortableTextBlock, type PortableTextComponents } from "next-sanity";
import type { Image } from "sanity";

export function CustomPortableText({
  paragraphClasses,
  value,
}: {
  paragraphClasses?: string;
  value?:
    | NonNullable<PAGE_BY_SLUGResult>["body"]
    | NonNullable<ART_BY_SLUGResult>["overview"]
    | NonNullable<SETTINGSResult>["footer"];
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
            className="hover:text-b-color text-t-color underline underline-offset-2 transition"
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
            <ImageBox image={value} alt={value.alt} classesWrapper="relative aspect-[16/9]" />
            {value?.caption && <div className="text-t-color text-sm">{value.caption}</div>}
          </div>
        );
      },
      timeline: ({ value }) => {
        const { items } = value || {};
        return <TimelineSection timelines={items} />;
      },
    },
  };

  return value && <PortableText components={components} value={value as PortableTextBlock[]} />;
}
