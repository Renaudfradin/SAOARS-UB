export function assetSrc(asset) {
  if (!asset) return "";
  if (typeof asset === "string") return asset;
  return asset.src || "";
}
