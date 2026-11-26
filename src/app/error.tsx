"use client";

import { ErrorState } from "@components/ui/StateView";

export default function Error({ error }: { error: Error & { digest?: string } }) {
  return <ErrorState error={error} />;
}
