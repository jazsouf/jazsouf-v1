import type { PAGE_BY_SLUGResult } from "@/sanity-cms/types";
import { CustomPortableText } from "./CustomPortableText";
import MotionDiv from "./MotionDiv";
interface HeaderProps {
  centered?: boolean;
  description?: PAGE_BY_SLUGResult["body"];
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
        <MotionDiv classname="text-t-color text-left font-mono text-md [text-wrap:pretty] md:text-xl max-w-xl min-h-[75svh] grid place-items-center">
          <CustomPortableText value={description} />
        </MotionDiv>
      )}
    </div>
  );
}
