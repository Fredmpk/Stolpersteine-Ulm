import { sanityProductionFetch } from "@/sanity/lib/client";
import { BIOGRAPHY_LIST_QUERY } from "@/sanity/lib/queries";
import { BIOGRAPHY_LIST_QUERYResult } from "@/sanity/types";
import BiografienClient from "./components/BiografienClient";

export default async function BiografienPage() {
  const bios = await sanityProductionFetch<BIOGRAPHY_LIST_QUERYResult>(
    BIOGRAPHY_LIST_QUERY,
    {},
    ["biographies"],
  );

  return <BiografienClient bios={bios} />;
}
