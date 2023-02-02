import axios from "axios";
import React, { useEffect, useState } from "react";
import CardWeapon from "../../components/cardWeapons/cardWeapons.jsx";
import RenderStart from "../../components/renderStars/renderStart.jsx";
import imgWeaponDefault from "../../assets/img/imgDefault/stuff_370.png"
import { Helmet } from "react-helmet-async";

export default function contentWeapons() {
  const [weapons , updateWeapons ] = useState([])

  useEffect(()=>{
    axios.get('https://api-saoars.vercel.app/weapon')
      .then((response)=>{
        updateWeapons(response.data.weapons)
      })
      .catch((error)=>{
        console.log(error);
      })
  }, [])

  return(
    <div className="cardList">
      <Helmet>
        <title>List Weapons - Sword Art Online : Unleash Blading - Database</title>
      </Helmet>
      {weapons.map((weapon)=>(
        <CardWeapon
          key={weapon.idw}
          idw={weapon.idw}
          name_weapon={weapon.name_weapon}
          imgWeaponDefault={imgWeaponDefault}
          stars={<RenderStart list={true} stars={weapon.stars} />}
        ></CardWeapon>
      ))}
    </div>
  )
}