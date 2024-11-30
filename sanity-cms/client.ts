import { type QueryOptions, type QueryParams, createClient } from "next-sanity";

import { draftMode } from "next/headers";
import { apiVersion, dataset, projectId, studioUrl } from "./env";
import { token } from "./token";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  stega: {
    studioUrl,
    // Set logger to 'console' for more verbose logging
    // logger: console,
    filter: (props) => {
      if (props.sourcePath.at(-1) === "title") {
        return true;
      }

      return props.filterDefault(props);
    },
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
