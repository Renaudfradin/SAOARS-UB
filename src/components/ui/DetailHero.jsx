import React from "react";
import SafeImage from "./SafeImage.jsx";
import { StarsIcon } from "./icons.jsx";

export default function DetailHero({ name, image, secondImage, fallback, badge, rarity, children }) {
  return (
    <div className="hero">
      <div className="hero__name">{name}</div>
      <div className="hero__visual">
        <SafeImage className="hero__img" src={image} fallback={fallback} alt={name} />
        {secondImage && <SafeImage className="hero__img2" src={secondImage} alt={name} />}
      </div>
      <div className="hero__badge">
        {badge}
        <StarsIcon rarity={rarity} />
      </div>
      {children && <div className="hero__linked">{children}</div>}
    </div>
  );
}
