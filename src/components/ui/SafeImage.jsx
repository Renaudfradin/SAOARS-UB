import React, { useEffect, useState } from "react";
import { mediaUrl } from "./media.js";

export default function SafeImage({ src, fallback, alt = "", ...props }) {
  const resolved = mediaUrl(src) || fallback;
  const [current, setCurrent] = useState(resolved);

  useEffect(() => setCurrent(resolved), [resolved]);

  if (!current) return null;

  return (
    <img
      src={current}
      alt={alt}
      loading="lazy"
      onError={() => fallback && current !== fallback && setCurrent(fallback)}
      {...props}
    />
  );
}
