import axios from "axios";
import React, { useEffect, useState } from "react";

export default function contentBanners(){
  const [banners, updateBanners ] = useState([]);
  const baseUrl = "https://api-saoars.vercel.app/"

  useEffect(()=>{
    axios.get('https://api-saoars.vercel.app/banner')
      .then((response) => {
        //console.log("response datata api",response.data.banners);
        updateBanners(response.data.banners);
      })
      .catch((error)=>{
        console.log(error);
      })
  },[])

  return(
    <div>
      <p>content banners</p>
      {banners.map((banner)=>(
        <div key={banner.idb}>
          <p>{banner.name_b}</p>
          <img src={baseUrl+banner.img_baner} alt="" />
        </div>
      ))}
    </div>
  )
}