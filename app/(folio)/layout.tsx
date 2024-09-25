import Footer from "@/components/global/Footer";
import Navbar from "@/components/global/NavbarComponent/Navbar";
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
        <main className="relative flex flex-col gap-10 justify-between min-h-[100svh] transition-colors bg-p-color">
          {children}
        </main>
      </Suspense>
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}
