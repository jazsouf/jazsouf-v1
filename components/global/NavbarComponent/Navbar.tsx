import { resolveHref } from "@/sanity-cms/links";

import type { SETTINGSResult } from "@/sanity-cms/types";
import NavLink from "./NavLink";

export default async function Navbar() {
  const menuItems = [
    {
      _type: "home",
      slug: "",
      title: "Soufiane",
    },
  ] satisfies NonNullable<SETTINGSResult>["menuItems"];

  return (
    <nav className="absolute z-10 top-0 sm:top-10 left-0 sm:left-20 md:left-[20%] backdrop-blur-lg shadow-nav sm:shadow-none">
      <ul className="flex flex-row sm:flex-col text-left leading-relaxed gap-4 sm:gap-0 px-8 xs:px-12 sm:px-0 py-6 pt-5 xs:py-8 xs:pt-7 sm:py-0 sm:pt-0">
        {menuItems?.map((menuItem) => {
          const href = resolveHref(menuItem?._type, menuItem?.slug);
          if (!href) {
            return null;
          }
          return (
            <li key={menuItem.slug}>
              <NavLink menuItem={menuItem} href={href} />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
