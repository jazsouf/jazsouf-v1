import ArtBox from "@/components/shared/ArtBox";
import { Header } from "@/components/shared/Header";
import type { ART_BY_SLUGResult } from "@/sanity-cms/types";

export default function ArtPage({ data }: { data: NonNullable<ART_BY_SLUGResult> }) {
  // Default to an empty object to allow previews on non-existent documents

  const { image, overview, title } = data ?? {};

  return (
    <div>
      <div className=" flex flex-col space-y-6 pb-10 lg:flex-row lg:gap-10">
        <ArtBox image={image} alt={`Artwork image for ${title}`} />
        <Header title={title} description={overview} />
      </div>
    </div>
  );
}
