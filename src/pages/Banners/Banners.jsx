import axios from "axios";
import React, { useEffect, useState } from "react";
import CardBanners from "@components/cardBanners/cardBanners.jsx";
import { Helmet } from "react-helmet-async";

export default function contentBanners(){
  const [banners, updateBanners ] = useState([]);

  useEffect(()=>{
    axios.get('https://api-saoars.vercel.app/banner')
      .then((response) => {
        updateBanners(response.data.banners);
      })
      .catch((error)=>{
        console.log(error);
      })
  }, [])

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