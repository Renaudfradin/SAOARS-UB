import React from "react";
import { Link } from "react-router-dom";
import SafeImage from "./SafeImage.jsx";

export default function LinkedCard({ to, image, fallback, title, children }) {
  const content = (
    <>
      <SafeImage className="linked__img" src={image} fallback={fallback} />
      <div className="linked__info">
        <div className="linked__title">{title}</div>
        {children && <div className="linked__icons">{children}</div>}
      </div>
    </>
  );

  return to ? (
    <Link className="linked" to={to}>
      {content}
    </Link>
  ) : (
    <div className="linked">{content}</div>
  );
}
