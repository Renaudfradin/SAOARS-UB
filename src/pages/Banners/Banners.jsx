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
        <meta name="description" content="List Banners - Sword Art Online : Unleash Blading - Database" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
      </Helmet>
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
    </>
  )
}