import axios from "axios";
import React, { useEffect, useState } from "react";
import CardWeapon from "../../components/cardWeapons/cardWeapons.jsx";
import RenderStart from "../../components/renderStars/renderStart.jsx";

import imgWeaponDefault from "../../assets/img/stuff_370.png"

export default function contentWeapons(params) {
  const [weapons , updateWeapons ] = useState([])

  useEffect(()=>{
    document.title = "List Weapons";

    axios.get('https://api-saoars.vercel.app/weapon')
      .then((response)=>{
        updateWeapons(response.data.weapons)
      })
      .catch((error)=>{
        console.log(error);
      })
  }, [])

  return(
    <div>
      {weapons.map((weapon)=>(
        <CardWeapon
          key={weapon.idw}
          idw={weapon.idw}
          name_weapon={weapon.name_weapon}
          imgWeaponDefault={imgWeaponDefault}
          stars={<RenderStart stars={weapon.stars} />}
        ></CardWeapon>
      ))}
    </div>
  )
}