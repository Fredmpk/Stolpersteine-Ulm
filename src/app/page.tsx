import { BIOGRAPHY_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { BIOGRAPHY_QUERYResult } from "@/sanity/types";

import { Biographies } from "./biographies";
import { Footer } from "./components/footer";

export default async function Home() {
  const { data: bios } = (await sanityFetch({ query: BIOGRAPHY_QUERY })) as {
    data: BIOGRAPHY_QUERYResult;
  };
  return (
    <main>
      <Biographies bios={bios} />
      <Footer />
    </main>
  );
}
