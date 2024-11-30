import FluidGradient from "@/app/(folio)/FluidGradient";
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
