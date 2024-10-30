import "server-only";

import { type QueryOptions, type QueryParams, createClient } from "next-sanity";

import { draftMode } from "next/headers";
import { apiVersion, dataset, projectId } from "./env";
import { token } from "./token";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  stega: {
    enabled: process.env.NEXT_PUBLIC_VERCEL_ENV === "preview",
    studioUrl: "/studio",
  },
});

export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  revalidate = 60, // default revalidation time in seconds
  tags = [],
}: {
  query: QueryString;
  params?: QueryParams;
  revalidate?: number | false | undefined;
  tags?: string[];
}) {
  const isDraftMode = (await draftMode()).isEnabled;

  if (isDraftMode && !token) {
    throw new Error("Missing env variable: SANITY_API_READ_TOKEN");
  }

  const queryOptions: QueryOptions = {};

  if (isDraftMode) {
    queryOptions.token = token;
    queryOptions.perspective = "previewDrafts";
    queryOptions.stega = true;
  }

  return client.fetch(query, params, {
    ...queryOptions,
    next: {
      revalidate: isDraftMode ? 0 : tags.length ? undefined : revalidate,
      tags, // for tag-based revalidation
    },
    cache: isDraftMode ? "no-store" : tags.length ? "force-cache" : undefined,
    useCdn: !tags.length,
  });
}
