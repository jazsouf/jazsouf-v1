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
    <div className="flex justify-center gap-20 pb-4 min-h-[90svh]">
      {description && (
        <CustomPortableText
          value={description}
          paragraphClasses="text-t-color my-auto text-left font-mono text-md [text-wrap:pretty] md:text-xl max-w-3xl"
        />
      )}
    </div>
  );
}
