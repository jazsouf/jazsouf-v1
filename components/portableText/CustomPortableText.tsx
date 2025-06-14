import { TimelineSection } from "@/components/portableText/TimelineSection";
import ImageBox from "@/components/shared/ImageBox";

import type {
  ART_BY_SLUGResult,
  PAGE_BY_SLUGResult,
  POSTResult,
  SETTINGSResult,
} from "@/sanity-cms/types";
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "@portabletext/react";
import Link from "next/link";

import { highlight } from "sugar-high";

export function CustomPortableText({
  paragraphClasses,
  value,
}: {
  paragraphClasses?: string;
  value?:
    | NonNullable<PAGE_BY_SLUGResult>["body"]
    | NonNullable<ART_BY_SLUGResult>["overview"]
    | NonNullable<SETTINGSResult>["footer"]
    | NonNullable<POSTResult>["body"];
}) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => <p className={paragraphClasses}>{children}</p>,
      h2: ({ children }) => (
        <h2 className="mt-12 mb-10 font-medium text-2xl/8 text-gray-950 tracking-tight first:mt-0 last:mb-0">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="mt-12 mb-10 font-medium text-gray-950 text-xl/8 tracking-tight first:mt-0 last:mb-0">
          {children}
        </h3>
      ),
      blockquote: ({ children }) => (
        <blockquote className="my-10 border-l-2 border-l-gray-300 pl-6 text-base/8 text-gray-950 first:mt-0 last:mb-0">
          {children}
        </blockquote>
      ),
    },
    types: {
      code({ value }) {
        if (value.language === "html") {
          return (
            <pre>
              <code>{value.code}</code>
            </pre>
          );
        }
        const codeHTML = highlight(value.code as string);
        return (
          <pre>
            {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
            <code dangerouslySetInnerHTML={{ __html: codeHTML }} />
          </pre>
        );
      },
      image: ({ value }) => (
        <figure className="my-2">
          <ImageBox
            image={value}
            alt={value.alt}
            classesWrapper="relative aspect-[16/9]"
          />
          {value?.caption && (
            <div className="text-sm text-t-color">{value.caption}</div>
          )}
        </figure>
      ),
      separator: ({ value }) => {
        switch (value.style) {
          case "line":
            return <hr className="my-8 border-gray-200 border-t" />;
          case "space":
            return <div className="my-8" />;
          default:
            return null;
        }
      },
      timeline: ({ value }) => {
        const { items } = value || {};
        return <TimelineSection timelines={items} />;
      },
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc pl-4 text-base/8 marker:text-gray-400">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal pl-4 text-base/8 marker:text-gray-400">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => {
        return <li className="my-2 pl-2 has-[br]:mb-8">{children}</li>;
      },
      number: ({ children }) => {
        return <li className="my-2 pl-2 has-[br]:mb-8">{children}</li>;
      },
    },
    marks: {
      strong: ({ children }) => (
        <strong className="font-semibold text-gray-950">{children}</strong>
      ),
      code: ({ children }) => (
        <code className="font-semibold text-gray-700">{children}</code>
      ),
      link: ({ value, children }) => {
        if (
          value.href.startsWith("mailto:") ||
          value.href.startsWith("https://")
        ) {
          return (
            <a
              className="transition hover:text-a-color"
              href={value?.href}
              rel="noreferrer noopener"
              target="_blank"
            >
              <span className="underline underline-offset-2">{children}</span>
              <span className="text-xs md:text-sm no-underline">
                <sup className="inline font-mono">↗</sup>
              </span>
            </a>
          );
        }
        return (
          <Link
            href={value.href}
            className=" underline underline-offset-2 transition hover:text-a-color"
          >
            {children}
          </Link>
        );
      },
    },
  };

  return (
    value && (
      <PortableText
        components={components}
        value={value as PortableTextBlock[]}
      />
    )
  );
}
