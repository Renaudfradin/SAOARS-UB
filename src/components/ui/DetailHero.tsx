import type { ReactNode } from "react";
import SafeImage from "./SafeImage";
import { StarsIcon } from "./icons";

export default function DetailHero({
  name,
  image,
  secondImage,
  fallback,
  badge,
  rarity,
  children,
}: {
  name?: string;
  image?: string | null;
  secondImage?: string | null;
  fallback?: string | null;
  badge?: ReactNode;
  rarity?: number | string | null;
  children?: ReactNode;
}) {
  return (
    <div className="hero">
      <div className="hero__name">{name}</div>
      <div className="hero__visual">
        <SafeImage className="hero__img" src={image} fallback={fallback} alt={name || ""} />
        {secondImage && <SafeImage className="hero__img2" src={secondImage} alt={name || ""} />}
      </div>
      <div className="hero__badge">
        {badge}
        <StarsIcon rarity={rarity} />
      </div>
      {children && <div className="hero__linked">{children}</div>}
    </div>
  );
}
