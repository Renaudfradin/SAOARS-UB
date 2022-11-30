import React from "react";

export default function cardBanners(props) {
  const name_b = props.name_b
  const img_baner = props.img_baner
  const baseUrl = "https://api-saoars.vercel.app/"

  return(
    <div>
      <p>{name_b}</p>
      <img src={baseUrl+img_baner} alt="" />
    </div>
  )
}