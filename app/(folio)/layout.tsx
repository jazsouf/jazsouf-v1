import "@/app/globals.css";

import Footer from "@/components/global/Footer";
import Navbar from "@/components/global/NavbarComponent/Navbar";
import { SanityLive } from "@/sanity-cms/live";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Suspense } from "react";
import { handleLiveError } from "./handleLiveError";

export default async function IndexRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SanityLive onError={handleLiveError} />
      <Suspense>
        <Navbar />
      </Suspense>
      <Suspense>
        <div className="relative flex flex-col gap-10 justify-between min-h-[100svh] bg-p-color">
          {children}
        </div>
      </Suspense>
      <Suspense>
        <Footer />
      </Suspense>
      <SpeedInsights />
    </>
  );
}
