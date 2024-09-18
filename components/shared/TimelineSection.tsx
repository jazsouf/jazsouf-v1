import type { Milestone } from "@/sanity-cms/types";
import { TimelineItem } from "./TimelineItem";

interface TimelineItemType {
  title: string;
  milestones: Milestone[];
}

export function TimelineSection({ timelines }: { timelines: TimelineItemType[] }) {
  return (
    <div className="text-t-color flex flex-col gap-4 pt-16 md:flex-row">
      {timelines?.map((timeline, key) => {
        const { title, milestones } = timeline;
        return (
          <div className="max-w-[80%] md:max-w-[50%]" key={`${title}-milestones`}>
            <div className="pb-5 font-mono text-xl font-bold">{title}</div>

            {milestones?.map((experience, index) => (
              <div key={`${experience.title}-${index}`}>
                <TimelineItem milestone={experience} isLast={milestones.length - 1 === index} />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
