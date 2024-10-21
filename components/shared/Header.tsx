import { CustomPortableText } from "@/components/portableText/CustomPortableText";
import type { ART_BY_SLUGResult, HOME_PAGEResult, PAGE_BY_SLUGResult } from "@/sanity-cms/types";
import dynamic from "next/dynamic";
const FluidGradient = dynamic(() => import("../../app/(folio)/FluidGradient"), {
  loading: () => <div>Loading...</div>,
});
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
    <section
      id="header"
      className="p-3 min-h-[95svh] grid place-content-center leading-tight md:leading-loose"
    >
      <FluidGradient />
      {description && (
        <CustomPortableText
          value={description}
          paragraphClasses="text-t-color text-left text-lg md:text-xl max-w-3xl pt-1.5"
        />
      )}
    </section>
  );
}
