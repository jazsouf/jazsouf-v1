import {
  ART_BY_SLUG,
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
} from "@/sanity-cms/groq";
import type { QueryParams } from "next-sanity";
import { client } from "./client";
type Options = {
  perspective?: "previewDrafts" | "published" | "drafts";
  stega?: boolean;
} | void;

export async function sanityFetch({
  query,
  params = {},
}: {
  query: string;
  params?: QueryParams;
}) {
  return { data: await client.fetch(query, params) };
}

export function getSettings(options: Options) {
  return sanityFetch({
    query: SETTINGS,
  });
}

export function getProjectBySlug(slug: string, options: Options) {
  return sanityFetch({
    query: PROJECT_BY_SLUG,
    params: { slug },
  });
}

export function getArtBySlug(slug: string, options: Options) {
  return sanityFetch({
    query: ART_BY_SLUG,
    params: { slug },
  });
}

export function getHomePage(options: Options) {
  return sanityFetch({
    query: HOME_PAGE,
  });
}

export function getHomePageTitle(options: Options) {
  return sanityFetch({
    query: HOME_PAGE_TITLE,
  });
}

export function getProjectsPaths() {
  return sanityFetch({ query: PROJECT_SLUGS });
}

export function getPostsCount(category: string | undefined, options: Options) {
  return sanityFetch({
    query: TOTAL_POSTS,
    params: { category: category ?? null },
  });
}

export function getPosts(
  startIndex: number,
  endIndex: number,
  category: string | undefined,
  options: Options,
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

export function getFeaturedPosts(quantity: number, options: Options) {
  return sanityFetch({
    query: FEATURED_POSTS,
    params: { quantity },
  });
}

export function getPostsForFeed(options: Options) {
  return sanityFetch({
    query: FEED_POSTS,
  });
}

export function getPost(slug: string, options: Options) {
  return sanityFetch({
    query: POST,
    params: { slug },
  });
}

export function getCategories(options: Options) {
  return sanityFetch({
    query: CATEGORIES,
  });
}
