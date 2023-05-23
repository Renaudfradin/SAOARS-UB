import React from "react";
import logo from "@assets/img/logoSAO.png";
import imgDefault from "@assets/img/imgDefault/character_2502.png";
import SwiperHome from "@components/swiperHome/swiperHome.jsx";
import Overview from "@components/overview/overview.jsx";
import { Helmet } from "react-helmet-async";
import "./Home.css";

export default function Home(){
  return(
    <>
      <Helmet>
        <title>Home - Sword Art Online : Unleash Blading - Database</title>
        <meta name="description" content="Home - Sword Art Online : Unleash Blading - Database" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
      </Helmet>
      <div className="imgMid">
        <div className="layoutLogo">
          <img src={logo} alt={logo} />
        </div>
        <div className="divimgProm">
          <img src={imgDefault} alt={imgDefault} />
        </div>
        <SwiperHome />
        <Overview />
      </div>
    </>
  )
}