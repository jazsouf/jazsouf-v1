import { resolveHref } from "lib/sanity.links";
import Link from "next/link";
import type { MenuItem, SettingsPayload } from "types";

interface NavbarProps {
  data: SettingsPayload;
}
export default function Navbar(props: NavbarProps) {
  const { data } = props;
  const menuItems = data?.menuItems || ([] as MenuItem[]);
  return (
    <div className="bg-s-color top-0 z-10 flex w-full flex-wrap items-center gap-x-5 py-4 px-2 md:py-5">
      {menuItems?.map((menuItem) => {
        const href = resolveHref(menuItem?._type, menuItem?.slug);
        if (!href) {
          return null;
        }
        return (
          <Link
            key={menuItem.slug}
            className={`hover:text-ah-color transition font-mono lowercase ${
              menuItem?._type === "home"
                ? "text-a-color font-bold md:text-xl"
                : "text-a-color/90 md:text-xl"
            }`}
            href={href}
          >
            {menuItem.title}
          </Link>
        );
      })}
    </div>
  );
}
