import React from "react";
import CardBanners from "@components/cardBanners/cardBanners.jsx";
import { Helmet } from "react-helmet-async";
import useBanners from "@hook/useBanners.jsx";

export default function contentBanners(){
  const { banners } = useBanners();

  return(
    <div className="cardList">
      <Helmet>
        <title>List Banners - Sword Art Online : Unleash Blading - Database</title>
      </Helmet>
      {banners.map((banner)=>(
        <CardBanners
          key={banner.idb}
          idb={banner.idb}
          name_b={banner.name_b}
          img_baner={banner.img_baner}
        ></CardBanners>
      ))}
    </div>
  )
}