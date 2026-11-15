"use client";

import { ErrorState } from "@components/ui/StateView.jsx";

export default function Error({ error }) {
  return <ErrorState error={error} />;
}
