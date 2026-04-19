import { sanityFetch } from "@/sanity/lib/live";
import { BIOGRAPHY_LIST_QUERY } from "@/sanity/lib/queries";
import { BIOGRAPHY_LIST_QUERYResult } from "@/sanity/types";
import BiografienClient from "./components/BiografienClient";

export default async function BiografienPage() {
  const { data: bios } = (await sanityFetch({
    query: BIOGRAPHY_LIST_QUERY,
  })) as {
    data: BIOGRAPHY_LIST_QUERYResult;
  };

  return <BiografienClient bios={bios} />;
}
