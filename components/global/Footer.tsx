import { getSettings } from "@/sanity-cms/lib/fetch";

import { CustomPortableText } from "../shared/CustomPortableText";

export default async function Footer() {
  const data = await getSettings();
  if (!data) {
    return null;
  }
  const footer = data.footer;
  return (
    <footer className="bg-p-color border-t border-b-color text-l-color text-center flex flex-col items-center py-6 gap-24">
      {footer && <CustomPortableText paragraphClasses="text-md md:text-sm" value={footer} />}
      <p className="text-xs">{new Date().getFullYear()} - Soufiane El Jazouli</p>
    </footer>
  );
}
