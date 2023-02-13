import React from "react";
import { Link } from "react-router-dom";
import "./cardBanners.css"

export default function cardBanners({idb,name_b,img_baner}) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL

  return(
    <div className="cardBanner">
      <Link to={`/banners/${idb}`}><img className="imgcardBanner" src={baseUrl+img_baner} alt="" /></Link>
      <p>{name_b}</p>
    </div>
  )
}