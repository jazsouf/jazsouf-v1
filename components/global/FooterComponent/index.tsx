import { getSettings } from "lib/sanity.fetch";
import { settingsQuery } from "lib/sanity.queries";
import { LiveQuery } from "next-sanity/preview/live-query";
import { draftMode } from "next/headers";

import FooterLayout from "./FooterLayout";
import FooterPreview from "./FooterPreview";

export async function FooterComponent() {
  const data = await getSettings();

  return (
    <LiveQuery
      enabled={draftMode().isEnabled}
      query={settingsQuery}
      initialData={data}
      as={FooterPreview}
    >
      <FooterLayout data={data} />
    </LiveQuery>
  );
}
