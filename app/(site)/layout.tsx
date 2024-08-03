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
    <div className=" text-t-color flex min-h-screen flex-col max-w-xl mx-auto">
      <Suspense>
        <NavbarComponent />
      </Suspense>
      <div className="flex-grow px-2 pt-14">
        <Suspense>{children}</Suspense>
      </div>
      <Suspense>
        <FooterComponent />
      </Suspense>
    </div>
  );
}
