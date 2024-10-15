import "@/app/globals.css";

import Footer from "@/components/global/Footer";
import Navbar from "@/components/global/NavbarComponent/Navbar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Suspense } from "react";

export default async function IndexRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
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
