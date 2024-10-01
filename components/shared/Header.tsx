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
    <section id="header" className="pb-4 min-h-[90svh] grid place-content-center leading-loose">
      {description && (
        <CustomPortableText
          value={description}
          paragraphClasses="text-t-color text-left text-md md:text-xl max-w-3xl pt-1.5"
        />
      )}
    </section>
  );
}
