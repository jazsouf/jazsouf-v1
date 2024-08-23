import type { PortableTextBlock } from "@portabletext/types";
import { CustomPortableText } from "components/shared/CustomPortableText";

import MotionDiv from "./MotionDiv";
interface HeaderProps {
  centered?: boolean;
  description?: PortableTextBlock[];
  title?: string;
}
export function Header(props: HeaderProps) {
  const { title, description } = props;
  if (!description && !title) {
    return null;
  }
  return (
    <div className="text-left">
      {description && (
        <MotionDiv
          classname="text-t-color text-left font-mono text-md [text-wrap:pretty] md:text-xl max-w-xl min-h-[75svh] grid place-items-center"
          content={<CustomPortableText value={description} />}
        />
      )}
    </div>
  );
}
