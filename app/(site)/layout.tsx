import "styles/index.css";

import Footer from "@/components/global/Footer";
import Navbar from "@/components/global/NavbarComponent/Navbar";
import { Suspense } from "react";

export default async function IndexRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="text-t-color flex min-h-screen flex-col relative">
      <Suspense>
        <Navbar />
      </Suspense>
      <Suspense>{children}</Suspense>
      <Suspense>
        <Footer />
      </Suspense>
    </main>
  );
}
