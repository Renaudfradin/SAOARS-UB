import React, { useEffect, useState } from "react";
import logo from "@assets/img/logoSAO.png"
import imgDefault from "@assets/img/imgDefault/character_2502.png"
import banner1 from "@assets/img/icon_ban/scout_132.png"
import banner2 from "@assets/img/icon_ban/scout_133.png"
import banner3 from "@assets/img/icon_ban/scout_134.png"
import banner4 from "@assets/img/icon_ban/scout_135.png"
import banner5 from "@assets/img/icon_ban/scout_136.png"
import "./Home.css"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import bankLogo from "@assets/img/banklogo2.png"
import { Helmet } from "react-helmet-async";
import axios from "axios";

export default function Home(){
  const [bannerInfo, updateBannerInfo] = useState(100);
  const [characterInfo, updateChracterInfo] = useState(100);
  const [weaponInfo, updateWeaponInfo] = useState(100);
  const [equipementInfo, updateEquipementInfo] = useState(100);
  const [abilityInfo, updateAbilityInfo] = useState(100);
  // const [imaginationsInfo, updateImaginationsInfo] = useState([]);
  
  // useMemo(()=>{
  //   axios.get("https://api-saoars.vercel.app/banner")
  //     .then((response)=>{
  //       console.log(response.data)
  //       updateBannerInfo(response.data.countBanners)
  //     })
  //     .catch((error)=>{
  //       console.log(error)
  //     })
  //   axios.get("https://api-saoars.vercel.app/perso")
  //   .then((response)=>{
  //     console.log(response.data)
  //     updateChracterInfo(response.data.countCharacters)
  //   })
  //   .catch((error)=>{
  //     console.log(error)
  //   })
  //   axios.get("https://api-saoars.vercel.app/weapon")
  //   .then((response)=>{
  //     console.log(response.data)
  //     updateWeaponInfo(response.data.countWeapons)
  //   })
  //   .catch((error)=>{
  //     console.log(error)
  //   })
  //   axios.get("https://api-saoars.vercel.app/equipment")
  //   .then((response)=>{
  //     console.log(response.data)
  //     updateEquipementInfo(response.data.countEquipments)
  //   })
  //   .catch((error)=>{
  //     console.log(error)
  //   })
  //   axios.get("https://api-saoars.vercel.app/ability")
  //   .then((response)=>{
  //     console.log(response.data)
  //     updateAbilityInfo(response.data.countAbilitys)
  //   })
  //   .catch((error)=>{
  //     console.log(error)
  //   })
  // })

  return(
    <div className="containerHome">
      <Helmet>
        <title>Home - Sword Art Online : Unleash Blading - Database</title>
      </Helmet>
      <div className="layoutLogo">
        <img src={logo} alt={logo} />
      </div>
      <div className="divimgProm">
        <img src={imgDefault} alt={imgDefault} />
      </div>
      <Swiper
        slidesPerView={3}
        className="swippeWrapper"
        spaceBetween={10}
      >
        <SwiperSlide>
          <img className="imgWrapper" src={banner1} alt={banner1} />
        </SwiperSlide>
        <SwiperSlide>
          <img className="imgWrapper" src={banner2} alt={banner2} />
        </SwiperSlide>
        <SwiperSlide>
          <img className="imgWrapper" src={banner3} alt={banner3} />
        </SwiperSlide>
        <SwiperSlide>
          <img className="imgWrapper" src={banner4} alt={banner4} />
        </SwiperSlide>
        <SwiperSlide>
          <img className="imgWrapper" src={banner5} alt={banner5} />
        </SwiperSlide>
      </Swiper>

      <div className="containerOverview">
        <p className="pOverview">DATABASE <span>:overview</span></p>
        <div className="divOverview"> 
          <div className="infoOverviewLeft">
            <p>{bannerInfo} <span>banner</span></p>
            <p>{characterInfo} <span>character</span></p>
            <p>{weaponInfo} <span>weapon</span></p>
          </div>
          <img src={bankLogo} alt="" />
          <div className="infoOverviewRight">
            <p>{equipementInfo} <span>equipement</span></p>
            <p>100 <span>imaginations</span></p>
            <p>{abilityInfo} <span>abilitys</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}