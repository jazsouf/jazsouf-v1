import "server-only";
import { client, sanityFetch } from "@/sanity-cms/client";

import {
  ART_BY_SLUG,
  ART_SLUGS,
  CATEGORIES,
  FEATURED_POSTS,
  FEED_POSTS,
  HOME_PAGE,
  HOME_PAGE_TITLE,
  PAGE_BY_SLUG,
  PAGE_SLUGS,
  POST,
  POSTS,
  PROJECT_BY_SLUG,
  PROJECT_SLUGS,
  SETTINGS,
  TOTAL_POSTS,
} from "@/sanity-cms/queries";

export function getSettings() {
  return sanityFetch({
    query: SETTINGS,
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
  return client.withConfig({ useCdn: false }).fetch(PAGE_SLUGS, {}, { cache: "no-store" });
}
export function getProjectsPaths() {
  return client.withConfig({ useCdn: false }).fetch(PROJECT_SLUGS, {}, { cache: "no-store" });
}
export function getArtsPaths() {
  return client.withConfig({ useCdn: false }).fetch(ART_SLUGS, {}, { cache: "no-store" });
}

export function getPostsCount(category?: string) {
  return sanityFetch({
    query: TOTAL_POSTS,
    params: { category: category ?? null },
  });
}

export function getPosts(startIndex: number, endIndex: number, category?: string) {
  return sanityFetch({
    query: POSTS,
    params: {
      startIndex,
      endIndex,
      category: category ?? null,
    },
  });
}

export function getFeaturedPosts(quantity: number) {
  return sanityFetch({
    query: FEATURED_POSTS,
    params: { quantity },
  });
}

export function getPostsForFeed() {
  return sanityFetch({
    query: FEED_POSTS,
  });
}

export function getPost(slug: string) {
  return sanityFetch({
    query: POST,
    params: { slug },
  });
}

export function getCategories() {
  return sanityFetch({
    query: CATEGORIES,
  });
}
