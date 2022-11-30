import axios from "axios";
import React, { useEffect, useState } from "react";
import imgWeaponDefault from "../../assets/img/stuff_370.png"
import OneStart from "../../assets/img/rarity_1.webp"
import TwoStart from "../../assets/img/rarity_2.webp"
import ThreeStart from "../../assets/img/rarity_3.webp"
import ForStart from "../../assets/img/rarity_4.webp"

export default function contentWeapons(params) {
  const [weapons , updateWeapons ] = useState([])

  useEffect(()=>{
    axios.get('https://api-saoars.vercel.app/weapon')
      .then((response)=>{
        console.log(response.data.weapons);
        updateWeapons(response.data.weapons)
      })
      .catch((error)=>{
        console.log(error);
      })
  }, [])

  function renderStarCharacter(param) {
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

  return(
    <div>
      <p>coontent weapon pages</p>
      {weapons.map((weapon)=>(
        <div key={weapon.idw}>
          <p>{weapon.name_weapon}</p>
          <img src={imgWeaponDefault} alt="" />
          <img src={renderStarCharacter(weapon.stars)} alt="" />
        </div>
      ))}
    </div>
  )
}