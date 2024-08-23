import "styles/index.css";

import { FooterComponent } from "components/global/FooterComponent";
import { NavbarComponent } from "components/global/NavbarComponent";
import { Suspense } from "react";

export default async function IndexRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="text-t-color flex min-h-screen flex-col relative">
      <Suspense>
        <NavbarComponent />
      </Suspense>
      <Suspense>{children}</Suspense>
      <Suspense>
        <FooterComponent />
      </Suspense>
    </main>
  );
}
