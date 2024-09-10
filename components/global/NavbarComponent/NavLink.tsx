"use client";

import type { MenuItem } from "@/sanity-cms/types";
import cn from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  menuItem,
  href,
}: { menuItem: MenuItem; href: string }) {
  const pathname = usePathname();
  return (
    <Link
      key={menuItem.slug}
      className={cn(
        `hover:outline-[0.5px] outline outline-0 font-mono lowercase ${
          menuItem?._type === "home"
            ? "text-a-color md:text-xl"
            : "text-a-color/90 md:text-xl"
        }`,
        pathname === href && "outline-[1px] hover:bg-a-color",
      )}
      href={href}
    >
      {menuItem.title}
    </Link>
  );
}
