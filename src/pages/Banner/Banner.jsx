import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Banner(params) {
  const param = useParams();
  const idParam = param.id;
  const [banner , updateBanner] = useState([]);
  const baseUrl = "https://api-saoars.vercel.app/"

  useEffect(() => {
    console.log(idParam);
    axios.get(`https://api-saoars.vercel.app/banner/${idParam}`)
    .then((response) => {
      updateBanner(response.data.banner[0]);
    })
  }, [])

  useEffect(()=>{
    document.title= `${banner.name_b}`;
  })


  return(
    <div>
      <p>{banner.idb}</p>
      <p>{banner.name_b}</p>
      <p>{banner.from}</p>
      <p>{banner.to}</p>
      <img src={baseUrl+banner.img_baner} alt="" />
    </div>
  )
}