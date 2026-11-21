import React, { useState, type ComponentProps } from "react";
import { mediaUrl } from "./media";

type SafeImageProps = Omit<ComponentProps<"img">, "src"> & {
  src?: string | null;
  fallback?: string | null;
};

export default function SafeImage({ src, fallback, alt = "", ...props }: SafeImageProps) {
  const resolved = mediaUrl(src) || fallback;
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const current = failedSrc === resolved && fallback ? fallback : resolved;

  if (!current) return null;

  return (
    <img
      src={current}
      alt={alt}
      loading="lazy"
      onError={() => {
        if (fallback && current !== fallback) setFailedSrc(resolved ?? null);
      }}
      {...props}
    />
  );
}
