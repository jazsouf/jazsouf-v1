import ImageBox from "@/components/shared/ImageBox";
import type { Milestone } from "@/sanity-cms/types";

export function TimelineItem({
  isLast,
  milestone,
}: {
  isLast: boolean;
  milestone: Milestone;
}) {
  const { description, duration, image, tags, title } = milestone;
  const startYear = duration?.start ? new Date(duration.start).getFullYear() : undefined;
  const endYear = duration?.end ? new Date(duration.end).getFullYear() : "Now";

  return (
    <div className={`flex min-h-[200px] font-mono ${!isLast && "pb-2"}`}>
      <div className="flex flex-col">
        <div
          className="bg-p-color relative  overflow-hidden"
          style={{ width: "65px", height: "65px" }}
        >
          <ImageBox
            image={image?.asset}
            alt={title || "Timeline item icon"}
            size="10vw"
            width={65}
            height={65}
          />
        </div>

        {!isLast && <div className="bg-p-color w-px grow self-center pt-1" />}
      </div>
      <div className="flex-initial pl-4">
        <div className="text-t-color font-bold">{title}</div>

        <div className="text-t-color text-sm ">
          {tags?.map((tag) => (
            <span key={tag + title}>
              {tag}
              <span className="mx-1">●</span>
            </span>
          ))}
          {startYear} - {endYear}
        </div>
        {/* Description */}
        <div className="text-t-color pb-5 pt-3 font-mono">{description}</div>
      </div>
    </div>
  );
}
