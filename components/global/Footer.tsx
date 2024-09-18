import { getSettings } from "@/sanity-cms/lib/fetch";

import Link from "next/link";
import { CustomPortableText } from "../shared/CustomPortableText";

export default async function Footer() {
  const data = await getSettings();
  if (!data) {
    return null;
  }
  const footer = data.footer;
  return (
    <footer className="bg-s-color text-l-color bottom-0 w-full py-4 text-center">
      {footer && <CustomPortableText paragraphClasses="text-md md:text-sm" value={footer} />}
      <p className="text-xs">
        <Link href={"http://creativecommons.org/licenses/by-nc/4.0/"}>CC BY-NC 4.0</Link>{" "}
        {new Date().getFullYear()} © Soufiane El Jazouli
      </p>
    </footer>
  );
}
