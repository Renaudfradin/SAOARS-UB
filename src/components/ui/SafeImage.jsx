import React, { useState } from "react";
import { mediaUrl } from "./media.js";

export default function SafeImage({ src, fallback, alt = "", ...props }) {
  const resolved = mediaUrl(src) || fallback;
  const [failedSrc, setFailedSrc] = useState(null);
  const current = failedSrc === resolved && fallback ? fallback : resolved;

  if (!current) return null;

  return (
    <img
      src={current}
      alt={alt}
      loading="lazy"
      onError={() => {
        if (fallback && current !== fallback) setFailedSrc(resolved);
      }}
      {...props}
    />
  );
}
