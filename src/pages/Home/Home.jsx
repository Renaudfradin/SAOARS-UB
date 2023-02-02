import React from "react";
import { useEffect } from "react";
import logo from "../../assets/img/logoSAO.png"
import imgDefault from "../../assets/img/imgDefault/character_2502.png"
import imgDefaultBanner from "../../assets/img/imgDefault/scout_130.jpg"
import './Home.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import bankLogo from "../../assets/img/banklogo2.png"

export default function Home(){
  useEffect(()=>{
    document.title = "Home";
  })
  
  return(
    <div className="containerHome">
      <div className="layoutLogo">
        <img src={logo} alt={logo} />
      </div>
      <div className="divimgProm">
        <img src={imgDefault} alt={imgDefault} />
      </div>
      <Swiper
        slidesPerView={3}
        className="swippeWrapper"
      >
        <SwiperSlide>
          <img className="imgWrapper" src={imgDefaultBanner} alt={imgDefaultBanner} />
        </SwiperSlide>
        <SwiperSlide>
          <img className="imgWrapper" src={imgDefaultBanner} alt={imgDefaultBanner} />
        </SwiperSlide>
        <SwiperSlide>
          <img className="imgWrapper" src={imgDefaultBanner} alt={imgDefaultBanner} />
        </SwiperSlide>
        <SwiperSlide>
          <img className="imgWrapper" src={imgDefaultBanner} alt={imgDefaultBanner} />
        </SwiperSlide>
        <SwiperSlide>
          <img className="imgWrapper" src={imgDefaultBanner} alt={imgDefaultBanner} />
        </SwiperSlide>
      </Swiper>

      <div className="containerOverview">
        <p className="pOverview">DATABASE <span>:overview</span></p>
        <div className="divOverview"> 
          <div className="infoOverviewLeft">
            <p>100 <span>banner</span></p>
            <p>100 <span>character</span></p>
            <p>100 <span>weapon</span></p>
          </div>
          <img src={bankLogo} alt="" />
          <div className="infoOverviewRight">
            <p>100 <span>equipement</span></p>
            <p>100 <span>imaginations</span></p>
            <p>100 <span>abilitys</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}