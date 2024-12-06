import {
  ART_BY_SLUG,
  ART_SLUGS,
  CATEGORIES,
  FEATURED_POSTS,
  FEED_POSTS,
  HOME_PAGE,
  HOME_PAGE_TITLE,
  POST,
  POSTS,
  PROJECT_BY_SLUG,
  PROJECT_SLUGS,
  SETTINGS,
  TOTAL_POSTS,
} from "@/sanity-cms/queries";
import { client } from "./client";
import { sanityFetch } from "./live";
type Options = {
  perspective?: "previewDrafts" | "published" | "drafts";
  stega?: boolean;
};

export function getSettings(
  { perspective = undefined, stega = undefined }: Options,
) {
  return sanityFetch({
    query: SETTINGS,
    perspective,
    stega,
  });
}

export function getProjectBySlug(
  slug: string,
  { perspective = undefined, stega = undefined }: Options,
) {
  return sanityFetch({
    query: PROJECT_BY_SLUG,
    params: { slug },
    perspective,
    stega,
  });
}

export function getArtBySlug(
  slug: string,
  { perspective = undefined, stega = undefined }: Options,
) {
  return sanityFetch({
    query: ART_BY_SLUG,
    params: { slug },
    perspective,
    stega,
  });
}

export function getHomePage(
  { perspective = undefined, stega = undefined }: Options,
) {
  return sanityFetch({
    query: HOME_PAGE,
    perspective,
    stega,
  });
}

export function getHomePageTitle(
  { perspective = undefined, stega = undefined }: Options,
) {
  return sanityFetch({
    query: HOME_PAGE_TITLE,
    perspective,
    stega,
  });
}

export function getProjectsPaths() {
  return client.withConfig({ useCdn: false }).fetch(PROJECT_SLUGS, {}, {
    cache: "no-store",
  });
}
export function getArtsPaths() {
  return client.withConfig({ useCdn: false }).fetch(ART_SLUGS, {}, {
    cache: "no-store",
  });
}

export function getPostsCount(
  category: string | undefined,
  { perspective = undefined, stega = undefined }: Options,
) {
  return sanityFetch({
    query: TOTAL_POSTS,
    params: { category: category ?? null },
    perspective,
    stega,
  });
}

export function getPosts(
  startIndex: number,
  endIndex: number,
  category: string | undefined,
  { perspective = undefined, stega = undefined }: Options,
) {
  return sanityFetch({
    query: POSTS,
    params: {
      startIndex,
      endIndex,
      category: category ?? null,
    },
    perspective,
    stega,
  });
}

export function getFeaturedPosts(
  quantity: number,
  { perspective = undefined, stega = undefined }: Options,
) {
  return sanityFetch({
    query: FEATURED_POSTS,
    params: { quantity },
    perspective,
    stega,
  });
}

export function getPostsForFeed(
  { perspective = undefined, stega = undefined }: Options,
) {
  return sanityFetch({
    query: FEED_POSTS,
    perspective,
    stega,
  });
}

export function getPost(
  slug: string,
  { perspective = undefined, stega = undefined }: Options,
) {
  return sanityFetch({
    query: POST,
    params: { slug },
    perspective,
    stega,
  });
}

export function getCategories(
  { perspective = undefined, stega = undefined }: Options,
) {
  return sanityFetch({
    query: CATEGORIES,
    perspective,
    stega,
  });
}
