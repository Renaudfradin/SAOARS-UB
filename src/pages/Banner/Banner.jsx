import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import imgDefault from "../../assets/img/imgDefault/character_250.png"
import "./Banner.css"

export default function Banner(params) {
  const param = useParams();
  const idParam = param.id;
  const [banner , updateBanner] = useState([]);
  const baseUrl = "https://api-saoars.vercel.app"

  useEffect(() => {
    console.log("id param",idParam);
    axios.get(`https://api-saoars.vercel.app/banner/${idParam}`)
    .then((response) => {
      updateBanner(response.data.banner[0]);
      console.log("data",response.data.banner[0]);
    })
  }, [])

  useEffect(()=>{
    document.title = `${banner.name_b}`;
  })


  return(
    <div className="containerBanner">
      <div className="infoTitle">
        <p>{banner.name_b}</p>
        <img className="imgBanner" src={baseUrl+banner.img_baner} alt={baseUrl+banner.img_baner} />
      </div>
      <div className="infoBanners">
        <div className="infoPeriode">
          <h3>periode</h3>
          <div className="periode">
            <div className="periodeFrom">
              <p className="From">From</p>
              <p className="FromP">{banner.from}</p>
            </div>
            <div className="periodeTo">
              <p className="To">To</p>
              <p className="ToP">{banner.to}</p>
            </div>
          </div>
        </div>
        <div className="infoPerso">
          <h3>personnage</h3>
          <Link to={`/characters/${banner.chracters}`}><img className="imgPerso" src={imgDefault} alt={imgDefault} /></Link>
        </div>
      </div>
    </div>
  )
}