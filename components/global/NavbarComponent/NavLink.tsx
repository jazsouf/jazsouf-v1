"use client";

import AnimatedName from "@/components/shared/AnimatedName";
import type { SETTINGSResult } from "@/sanity-cms/types";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  menuItem,
  href,
}: {
  menuItem: NonNullable<SETTINGSResult>["menuItems"][number];
  href: string;
}) {
  const pathname = usePathname();
  if (!menuItem.title) {
    return null;
  }
  return (
    <Link
      key={menuItem.slug}
      className={clsx(
        "lowercase hover:outline-[0.5px]",
        menuItem?._type === "home" ? "text-p-color md:text-xl" : "text-a-color/90 md:text-xl",
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
