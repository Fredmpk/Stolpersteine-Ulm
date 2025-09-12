"use client";

import { useTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { disableDraftMode } from "@/app/actions";

export function DisableDraftMode() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [isIframe, setIsIframe] = useState(true);

  useEffect(() => {
    // This only runs in the browser
    if (window.self === window.top && !window.opener) {
      setIsIframe(false);
    }
  }, []);

  if (isIframe) {
    return null;
  }

  const disable = () =>
    startTransition(async () => {
      await disableDraftMode();
      router.refresh();
    });

  return (
    <div>
      {pending ? (
        "Disabling draft mode..."
      ) : (
        <button type="button" onClick={disable}>
          Disable draft mode
        </button>
      )}
    </div>
  );
}
