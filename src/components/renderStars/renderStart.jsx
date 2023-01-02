import React from "react";
import OneStart from "../../assets/img/icon_stars/rarity_1.svg"
import TwoStart from "../../assets/img/icon_stars/rarity_2.svg"
import ThreeStart from "../../assets/img/icon_stars/rarity_3.svg"
import ForStart from "../../assets/img/icon_stars/rarity_4.svg"
import OneStarts from "../../assets/img/icon_stars/stars_1.svg"
import TwoStarts from "../../assets/img/icon_stars/stars_2.svg"
import ThreeStarts from "../../assets/img/icon_stars/stars_3.svg"
import ForStarts from "../../assets/img/icon_stars/stars_4.svg"
import "./renderStart.css"

export default function renderStart({list,stars}) {
  function renderStar(stars) {
    if (list === true) {
      switch (stars) {
        case 1:
          return OneStart;
        case 2:
          return TwoStart;
        case 3:
          return ThreeStart;
        case 4:
          return ForStart;
      }
    }else if (list === false) {
      switch (stars) {
        case 1:
          return OneStarts;
        case 2:
          return TwoStarts;
        case 3:
          return ThreeStarts;
        case 4:
          return ForStarts;
      }
    }
    
  }
  
  return(<img className="imgStart" src={renderStar(stars)} alt="" />)
}