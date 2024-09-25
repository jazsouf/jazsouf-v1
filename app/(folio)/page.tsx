import { getHomePage, getSettings } from "@/sanity-cms/lib/fetch";
import { defineMetadata } from "@/utils/metadata";
import { toPlainText } from "next-sanity";
import type { Metadata } from "next/types";
import HomePage from "./HomePage";

export async function generateMetadata(): Promise<Metadata> {
  const [settings, page] = await Promise.all([getSettings(), getHomePage()]);

  return defineMetadata({
    description: page?.overview ? toPlainText(page.overview) : "",
    image: settings?.ogImage?.asset,
    title: page?.title ?? "",
  });
}

export default async function IndexRoute() {
  const data = await getHomePage();

  if (!data) {
    return null;
  }

  return <HomePage data={data} />;
}
