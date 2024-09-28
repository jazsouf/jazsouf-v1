import { getSettings } from "@/sanity-cms/fetch";
import { resolveHref } from "@/sanity-cms/links";

import NavLink from "./NavLink";

export default async function Navbar() {
  const data = await getSettings();
  const menuItems = data?.menuItems;
  return (
    <nav className="fixed z-10 bottom-0 sm:bottom-20 right-0 sm:right-20 md:right-[12.5%] left-0 xs:left-1.5 sm:left-auto backdrop-blur-lg shadow-nav dark:shadow-navDark sm:shadow-none sm:dark:shadow-none">
      <ul className="flex flex-row sm:flex-col text-left sm:text-right leading-tight gap-4 sm:gap-0 px-8 xs:px-12 sm:px-0 py-6 pt-5 xs:py-8 xs:pt-7 sm:py-0 sm:pt-0">
        {menuItems?.map((menuItem) => {
          const href = resolveHref(menuItem?._type, menuItem?.slug);
          if (!href) {
            return null;
          }
          return <NavLink key={menuItem.slug} menuItem={menuItem} href={href} />;
        })}
      </ul>
    </nav>
  );
}
