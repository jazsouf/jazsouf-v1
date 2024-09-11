import type { PAGE_BY_SLUGResult } from "@/sanity-cms/types";
import { CustomPortableText } from "./CustomPortableText";

interface HeaderProps {
  centered?: boolean;
  description?: NonNullable<PAGE_BY_SLUGResult>["overview"];
  title?: string | null;
}
export function Header(props: HeaderProps) {
  const { title, description } = props;
  if (!description && !title) {
    return null;
  }
  return (
    <div className="text-left">
      {description && (
        <CustomPortableText
          value={description}
          paragraphClasses="text-t-color text-left font-mono text-md [text-wrap:pretty] md:text-xl max-w-xl min-h-[75svh] grid place-items-center"
        />
      )}
    </div>
  );
}
