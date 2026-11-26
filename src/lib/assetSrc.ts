import type { StaticImageData } from "next/image";

type AssetInput = string | StaticImageData | { src?: string } | null | undefined;

export function assetSrc(asset: AssetInput): string {
  if (!asset) return "";
  if (typeof asset === "string") return asset;
  return asset.src || "";
}
