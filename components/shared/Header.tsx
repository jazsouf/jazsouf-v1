import { CustomPortableText } from "@/components/portableText/CustomPortableText";
import type { ART_BY_SLUGResult, HOME_PAGEResult, PAGE_BY_SLUGResult } from "@/sanity-cms/types";
interface HeaderProps {
  centered?: boolean;
  description?:
    | NonNullable<PAGE_BY_SLUGResult>["overview"]
    | NonNullable<ART_BY_SLUGResult>["overview"]
    | NonNullable<HOME_PAGEResult>["overview"];
  title?: string | null;
}

export function Header(props: HeaderProps) {
  const { title, description } = props;
  if (!description && !title) {
    return null;
  }
  return (
    <>
      <section
        id="header"
        className="p-3 text-center min-h-[95svh] grid place-content-center leading-tight md:leading-loose z-10"
      >
        {description && (
          <CustomPortableText
            value={description}
            paragraphClasses="text-t-color text-lg md:text-xl max-w-5xl pt-1.5"
          />
        )}
      </section>
      <FluidGradient />
    </>
  );
}

function FluidGradient() {
  return (
    <div className="gradientBg">
      <svg className="hidden" xmlns="http://www.w3.org/2000/svg">
        <title>Goo</title>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 10  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -6"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className="gradients">
        <div className="circle" />
      </div>
    </div>
  );
}
