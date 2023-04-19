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
      </Helmet>
      <div className="imgHeader">
        <div className="leftHeader" />
        <div className="midHeader" />
        <div className="rightHeader" />
      </div>
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
      <div className="imgFooter">
        <div className="leftFooter" />
        <div className="midFooter" />
        <div className="rightFooter" />
      </div>
    </>
  )
}