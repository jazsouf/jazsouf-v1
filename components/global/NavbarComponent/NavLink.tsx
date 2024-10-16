"use client";

import AnimatedName from "@/components/shared/AnimatedName";
import type { SETTINGSResult } from "@/sanity-cms/types";
import cn from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  menuItem,
  href,
}: { menuItem: NonNullable<SETTINGSResult>["menuItems"][number]; href: string }) {
  const pathname = usePathname();
  if (!menuItem.title) {
    return null;
  }
  return (
    <Link
      key={menuItem.slug}
      className={cn(
        `hover:outline-[0.5px] outline outline-0 lowercase ${
          menuItem?._type === "home" ? "text-a-color md:text-xl" : "text-a-color/90 md:text-xl"
        }`,
        pathname === href && "outline-[1px]",
      )}
      href={href}
    >
      <AnimatedName
        mainName={menuItem.title}
        subName={menuItem.title.toLocaleLowerCase() === "soufiane" ? "home" : undefined}
      />
    </Link>
  );
}
