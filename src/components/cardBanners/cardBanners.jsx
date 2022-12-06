import React from "react";
import { Link } from "react-router-dom";

export default function cardBanners(props) {
  const idb = props.idb
  const name_b = props.name_b
  const img_baner = props.img_baner
  const baseUrl = "https://api-saoars.vercel.app/"

  return(
    <div>
      <p>{name_b}</p>
      <Link to={`/banner/${idb}`}>{idb}</Link>
      <img src={baseUrl+img_baner} alt="" />
    </div>
  )
}