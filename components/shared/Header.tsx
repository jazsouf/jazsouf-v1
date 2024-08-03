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
    <div className="text-center">
      {description && (
        <MotionDiv
          classname="text-t-color space-y-4 pt-3 text-left font-mono text-md [text-wrap:pretty] md:text-xl max-w-xl"
          content={<CustomPortableText value={description} />}
        />
      )}
    </div>
  );
}
