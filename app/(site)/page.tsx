import { toPlainText } from "@portabletext/react";
import { HomePage } from "app/(site)/HomePage";
import HomePagePreview from "app/(site)/HomePagePreview";
import { getHomePage, getSettings } from "lib/sanity.fetch";
import { homePageQuery } from "lib/sanity.queries";
import { defineMetadata } from "lib/utils.metadata";
import type { Metadata } from "next";
import { LiveQuery } from "next-sanity/preview/live-query";
import { draftMode } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const [settings, page] = await Promise.all([getSettings(), getHomePage()]);

  return defineMetadata({
    description: page?.overview ? toPlainText(page.overview) : "",
    image: settings?.ogImage,
    title: page?.title,
  });
}

export default async function IndexRoute() {
  const data = await getHomePage();

  if (!data && !draftMode().isEnabled) {
    return <div>Hello</div>;
  }

  return (
    <LiveQuery
      enabled={draftMode().isEnabled}
      query={homePageQuery}
      initialData={data}
      as={HomePagePreview}
    >
      <HomePage data={data} />
    </LiveQuery>
  );
}
