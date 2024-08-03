import { getSettings } from "lib/sanity.fetch";
import { settingsQuery } from "lib/sanity.queries";
import { LiveQuery } from "next-sanity/preview/live-query";
import { draftMode } from "next/headers";

import NavbarLayout from "./NavbarLayout";
import NavbarPreview from "./NavbarPreview";

export async function NavbarComponent() {
  const data = await getSettings();

  return (
    <LiveQuery
      enabled={draftMode().isEnabled}
      query={settingsQuery}
      initialData={data}
      as={NavbarPreview}
    >
      <NavbarLayout data={data} />
    </LiveQuery>
  );
}
