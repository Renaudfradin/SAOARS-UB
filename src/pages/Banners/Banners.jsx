import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import CardBanners from "../../components/cardBanners/cardBanners.jsx";
import "./Banners.css"

export default function contentBanners(){
  const [banners, updateBanners ] = useState([]);

  useEffect(()=>{
    document.title = "List Banners";

    axios.get('https://api-saoars.vercel.app/banner')
      .then((response) => {
        updateBanners(response.data.banners);
      })
      .catch((error)=>{
        console.log(error);
      })
  }, [])

  return(
    <div className="layoutBanner">
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