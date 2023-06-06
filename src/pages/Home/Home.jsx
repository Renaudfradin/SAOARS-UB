import React from "react";
import logo from "@assets/img/logoSAO.png";
import pop1 from "@assets/img/pop_data1.png";
import pop2 from "@assets/img/pop_data2.png";
import pop3 from "@assets/img/pop_data3.png";
import pop4 from "@assets/img/pop_data4.png";
//import SwiperHome from "@components/swiperHome/swiperHome.jsx";
import Overview from "@components/overview/overview.jsx";
import HomeImg from "@components/homeImg/homeImg.jsx";
import { Helmet } from "react-helmet-async";
import "./Home.css";

export default function Home(){
  return(
    <>
      <Helmet>
        <title>Home - Sword Art Online : Unleash Blading - Database</title>
        <meta name="title" content="Home - Sword Art Online : Unleash Blading - Database" />
        <meta name="description" content="Home - Sword Art Online : Unleash Blading - Database" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
      </Helmet>
      <div className="imgMid">
        <div className="layoutLogo">
          <div>
            <img src={pop1} alt={pop1} className="pop1"/>
            <img src={pop2} alt={pop2} className="pop2"/>
          </div>
          <img src={logo} alt={logo} className="logo"/>
          <div>
            <img src={pop3} alt={pop3} className="pop3"/>
            <img src={pop4} alt={pop4} className="pop4"/>
          </div>
        </div>
        <HomeImg />
        {/* <SwiperHome /> */}
        <Overview />
      </div>
    </>
  )
}