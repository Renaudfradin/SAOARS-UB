import React from "react";
import { Link } from "react-router-dom";
import "./cardBanners.css"

export default function cardBanners({idb,name_b,img_baner}) {
  return(
    <div className="cardBanner">
      <Link to={`/banners/${idb}`}><img className="imgcardBanner" src={img_baner} alt={img_baner} /></Link>
      <p>{name_b}</p>
    </div>
  )
}