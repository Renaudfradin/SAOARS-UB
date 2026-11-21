import { assetSrc } from "@/lib/assetSrc";
import characterPlaceholder from "@assets/img/imgDefault/character_250.png";
import weaponPlaceholder from "@assets/img/imgDefault/stuff_370.png";
import equipmentPlaceholder from "@assets/img/imgDefault/stuff_303.png";
import abilityPlaceholder from "@assets/img/imgDefault/abilitys.jpg";

const MEDIA_URL = (process.env.NEXT_PUBLIC_MEDIA_URL || "https://apisaoars.s3.fr-par.scw.cloud").replace(/\/$/, "");

export const placeholders = {
  character: assetSrc(characterPlaceholder),
  weapon: assetSrc(weaponPlaceholder),
  equipment: assetSrc(equipmentPlaceholder),
  ability: assetSrc(abilityPlaceholder),
};

export function mediaUrl(path: string | null | undefined) {
  if (!path) return null;
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;
  return `${MEDIA_URL}/${path.replace(/^\//, "")}`;
}
