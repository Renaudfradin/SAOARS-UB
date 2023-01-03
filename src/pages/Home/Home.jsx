import React from "react";
import { useEffect } from "react";
import imgPop1 from "../../assets/img/pop_data1.png"
import imgPop2 from "../../assets/img/pop_data2.png"
import imgPop3 from "../../assets/img/pop_data3.png"
import imgPop4 from "../../assets/img/pop_data4.png"
import imgDefault from "../../assets/img/imgDefault/character_2502.png"
import imgDefaultBanner from "../../assets/img/imgDefault/scout_130.jpg"
import './Home.css'

export default function Home(){
  useEffect(()=>{
    document.title = "Home";
  })
  
  return(
    <div>
      <div>
        <h2>SAOARS/UB</h2>
        <img src={imgPop1} alt={imgPop1} />
        <img src={imgPop2} alt={imgPop2} />
        <img src={imgPop3} alt={imgPop3} />
        <img src={imgPop4} alt={imgPop4} />
      </div>
      <img src={imgDefault} alt={imgDefault} />
      <div>
        <img src={imgDefaultBanner} alt={imgDefaultBanner} />
        <img src={imgDefaultBanner} alt={imgDefaultBanner} />
        <img src={imgDefaultBanner} alt={imgDefaultBanner} />
        <img src={imgDefaultBanner} alt={imgDefaultBanner} />
        <img src={imgDefaultBanner} alt={imgDefaultBanner} />
      </div>
      <div>
        <p>banner : 100</p>
        <p>character : 100</p>
        <p>weapon : 100</p>
        <p>equipement : 100</p>
        <p>imaginations : 100</p>
        <p>abilitys : 100</p>
      </div>
    </div>
  )
}