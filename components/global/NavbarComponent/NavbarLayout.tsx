import { resolveHref } from "lib/sanity.links";
import Link from "next/link";
import type { MenuItem, SettingsPayload } from "types";
import NavLink from "./NavLink";

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
        return <NavLink key={menuItem.slug} menuItem={menuItem} href={href} />;
      })}
    </div>
  );
}
