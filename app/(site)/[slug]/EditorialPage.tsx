import { CustomPortableText } from "@/components/shared/CustomPortableText";
import { Header } from "@/components/shared/Header";

import type { PAGE_BY_SLUGResult } from "@/sanity-cms/types";

export default function EditorialPage({ data }: { data: PAGE_BY_SLUGResult }) {
  // Default to an empty object to allow previews on non-existent documents
  const { body, overview, title } = data ?? {};

  return (
    <article>
      <div className="pb-14">
        <Header title={title} description={overview} />
        <hr className=" h-1 py-2" />
        <CustomPortableText
          paragraphClasses="font-mono font-thin max-w-3xl text-t-color text-lg lg:text-xl"
          value={body}
        />
      </div>
    </article>
  );
}
