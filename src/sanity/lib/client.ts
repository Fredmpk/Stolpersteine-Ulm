import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";
import { draftMode } from "next/headers";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
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
  params: Record<string, unknown> = {},
  tags: string[] = [],
): Promise<QueryResult> {
  const isDraftMode = (await draftMode()).isEnabled;

  if (isDraftMode) {
    return previewClient.fetch<QueryResult>(query, params, {
      cache: "no-store",
    });
  }

  return client.fetch<QueryResult>(query, params, { next: { tags } });
}
