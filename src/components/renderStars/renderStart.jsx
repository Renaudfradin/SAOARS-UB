import React from "react";
import OneStart from "../../assets/img/icon_stars/rarity_1.svg"
import TwoStart from "../../assets/img/icon_stars/rarity_2.svg"
import ThreeStart from "../../assets/img/icon_stars/rarity_3.svg"
import ForStart from "../../assets/img/icon_stars/rarity_4.svg"
import "./renderStart.css"

export default function renderStart({stars}) {

  function renderStar(param) {
    switch (param) {
      case 1:
        return OneStart;
      case 2:
        return TwoStart;
      case 3:
        return ThreeStart;
      case 4:
        return ForStart;
    }
  }
  
  return(<img className="imgStart" src={renderStar(stars)} alt="" />)
}