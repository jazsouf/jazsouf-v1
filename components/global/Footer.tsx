import { CustomPortableText } from "@/components/portableText/CustomPortableText";
import { getSettings } from "@/sanity-cms/fetch";

export default async function Footer() {
  const data = await getSettings();
  if (!data) {
    return null;
  }
  const footer = data.footer;
  return (
    <footer className="border-t relative z-20 border-b-color bg-a-color text-t-color text-center flex flex-col min-h-[100svh] items-center py-6 gap-24 justify-between">
      {footer && <CustomPortableText paragraphClasses="" value={footer} />}
      <p className="text-xl md:text-3xl text-t-color px-6 md:px-[20%] leading-relaxed">
        Take a step back. Believe you can change. Look at yourself objectively. Lean into the pain.
        Confront reality. Cherish mistakes. Fix the machine, not the person. — <i>Aaron Swartz</i>
      </p>
      <p>© 2024 – Soufiane El Jazouli</p>
    </footer>
  );
}
