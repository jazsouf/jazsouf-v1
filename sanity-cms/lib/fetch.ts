import "server-only";

import { client, sanityFetch } from "@/sanity-cms/lib/client";

import {
  ART_BY_SLUG,
  ART_SLUGS,
  HOME_PAGE,
  HOME_PAGE_TITLE,
  PAGE_BY_SLUG,
  PAGE_SLUGS,
  PROJECT_BY_SLUG,
  PROJECT_SLUGS,
  SETTINGS_QUERY,
} from "./queries";
import { token } from "./token";

export function getSettings() {
  return sanityFetch({
    query: SETTINGS_QUERY,
    tags: ["settings", "home", "page", "project"],
  });
}

export function getPageBySlug(slug: string) {
  return sanityFetch({
    query: PAGE_BY_SLUG,
    params: { slug },
    tags: [`page:${slug}`],
  });
}

export function getProjectBySlug(slug: string) {
  return sanityFetch({
    query: PROJECT_BY_SLUG,
    params: { slug },
    tags: [`project:${slug}`],
  });
}

export function getArtBySlug(slug: string) {
  return sanityFetch({
    query: ART_BY_SLUG,
    params: { slug },
    tags: [`art:${slug}`],
  });
}

export function getHomePage() {
  return sanityFetch({
    query: HOME_PAGE,
    tags: ["home", "project"],
  });
}

export function getHomePageTitle() {
  return sanityFetch({
    query: HOME_PAGE_TITLE,
    tags: ["home"],
  });
}

export function getPagesPaths() {
  return client.fetch(PAGE_SLUGS, {}, { token, perspective: "published" });
}
export function getProjectsPaths() {
  return sanityFetch({ query: PROJECT_SLUGS, tags: [] });
}
export function getArtsPaths() {
  return sanityFetch({ query: ART_SLUGS, tags: [] });
}
