import { CustomPortableText } from "@/components/shared/CustomPortableText";
import { Header } from "@/components/shared/Header";
import MotionPage from "@/components/shared/MotionPage";
import type { PAGE_BY_SLUGResult } from "@/sanity-cms/types";

export default function EditorialPage({ data }: { data: PAGE_BY_SLUGResult }) {
  // Default to an empty object to allow previews on non-existent documents
  const { body, overview, title } = data ?? {};

  return (
    <div>
      <div className="pb-14">
        {/* Header */}
        <Header title={title} description={overview} />
        <div className=" h-1 py-2" />
        {/* Body */}
        {body && (
          <MotionPage
            classname=""
            content={
              <CustomPortableText
                paragraphClasses="font-mono font-thin max-w-3xl text-t-color text-lg lg:text-xl"
                value={body}
              />
            }
          />
        )}
      </div>
    </div>
  );
}
