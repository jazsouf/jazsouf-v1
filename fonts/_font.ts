import localFont from "next/font/local";

export const mono = localFont({
  src: [
    {
      path: "./CommitMono-400-Regular.otf",
    },
  ],
  display: "swap",
  adjustFontFallback: "Arial",
  variable: "--mono",
  preload: true,
  fallback: ["courrier sans", "mono"],
});
