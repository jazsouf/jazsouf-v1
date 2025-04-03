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

export function getSettings({ perspective = undefined, stega = undefined }: Options) {
  return sanityFetch({
    query: SETTINGS,
  });
}

export function getProjectBySlug(
  slug: string,
  { perspective = undefined, stega = undefined }: Options,
) {
  return sanityFetch({
    query: PROJECT_BY_SLUG,
    params: { slug },
  });
}

export function getArtBySlug(
  slug: string,
  { perspective = undefined, stega = undefined }: Options,
) {
  return sanityFetch({
    query: ART_BY_SLUG,
    params: { slug },
  });
}

export function getHomePage({ perspective = undefined, stega = undefined }: Options) {
  return sanityFetch({
    query: HOME_PAGE,
  });
}

export function getHomePageTitle({ perspective = undefined, stega = undefined }: Options) {
  return sanityFetch({
    query: HOME_PAGE_TITLE,
  });
}

export function getProjectsPaths() {
  return client.withConfig({ useCdn: false }).fetch(
    PROJECT_SLUGS,
    {},
    {
      cache: "no-store",
    },
  );
}
export function getArtsPaths() {
  return client.withConfig({ useCdn: false }).fetch(
    ART_SLUGS,
    {},
    {
      cache: "no-store",
    },
  );
}

export function getPostsCount(
  category: string | undefined,
  { perspective = undefined, stega = undefined }: Options,
) {
  return sanityFetch({
    query: TOTAL_POSTS,
    params: { category: category ?? null },
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
  });
}

export function getFeaturedPosts(
  quantity: number,
  { perspective = undefined, stega = undefined }: Options,
) {
  return sanityFetch({
    query: FEATURED_POSTS,
    params: { quantity },
  });
}

export function getPostsForFeed({ perspective = undefined, stega = undefined }: Options) {
  return sanityFetch({
    query: FEED_POSTS,
  });
}

export function getPost(slug: string, { perspective = undefined, stega = undefined }: Options) {
  return sanityFetch({
    query: POST,
    params: { slug },
  });
}

export function getCategories({ perspective = undefined, stega = undefined }: Options) {
  return sanityFetch({
    query: CATEGORIES,
  });
}
