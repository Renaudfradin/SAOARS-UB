import React from "react";
import CardBanners from "@components/cardBanners/cardBanners.jsx";
import { Helmet } from "react-helmet-async";
import useBanners from "@hook/useBanners.jsx";

export default function contentBanners(){
  const { banners } = useBanners();

  return (
    <> 
      <Helmet>
        <title>List Banners - Sword Art Online : Unleash Blading - Database</title>
      </Helmet>
      <div className="imgHeader">
        <div className="leftHeader" />
        <div className="midHeader" />
        <div className="rightHeader" />
      </div>
      <div className="imgMid">
        <div className="cardList">
          {banners.map((banner)=>(
            <CardBanners
              key={banner.idb}
              idb={banner.idb}
              name_b={banner.name_b}
              img_baner={banner.img_baner}
            ></CardBanners>
          ))}
        </div>
      </div>
      <div className="imgFooter">
        <div className="leftFooter" />
        <div className="midFooter" />
        <div className="rightFooter" />
      </div>
    </>
  )
}