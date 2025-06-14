import { CustomPortableText } from "@/components/portableText/CustomPortableText";
import { getSettings } from "@/sanity-cms/fetch";

export default async function Footer() {
  const { data } = await getSettings({});
  if (!data) {
    return null;
  }
  const footer = data.footer;
  return (
    <div className="relative">
      <FluidGradient />
      <footer className="relative z-20 bg-transparent text-t-color text-center flex flex-col min-h-[100svh] py-6 items-center justify-between">
        {footer && <CustomPortableText paragraphClasses="" value={footer} />}
        <p className="text-xl md:text-3xl text-t-color px-6 md:px-[20%] leading-relaxed">
          Make beautiful things that speak to people
        </p>
        <p>© 2025 – Soufiane El Jazouli</p>
      </footer>
    </div>
  );
}

function FluidGradient() {
  return (
    <div className="footerBg">
      <svg className="hidden" xmlns="http://www.w3.org/2000/svg">
        <title>Goo</title>
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 10  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -6"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
