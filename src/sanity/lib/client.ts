import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";
import type { QueryParams } from "next-sanity";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token: process.env.SANITY_VIEWER_TOKEN,
  stega: {
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
  },
});
export const previewClient = client.withConfig({
  perspective: "previewDrafts",
  useCdn: false,
});

export async function sanityProductionFetch<QueryResult>(
  query: string,
  params: QueryParams = {},
  tags: string[],
): Promise<QueryResult> {
  return client.fetch<QueryResult>(query, params, { next: { tags } });
}
