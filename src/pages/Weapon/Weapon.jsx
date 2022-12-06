import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import imgDefault from "../../assets/img/stuff_370.png"

export default function Weapon(params) {
  const param = useParams();
  const idParam = param.id;
  const [weapon , updateWeapon] = useState([]);

  useEffect(() => {
    console.log(idParam);
    axios.get(`https://api-saoars.vercel.app/weapon/${idParam}`)
    .then((response) => {
      console.log(response.data.weapon);
      updateWeapon(response.data.weapon);
    })
  }, [])

  useEffect(()=>{
    document.title= `${weapon.name_weapon}`;
  })


  return(
    <div>
      <p>Weapon</p>
      <p>{weapon.idw}</p>
      <p>{weapon.name_weapon}</p>
      <p>{weapon.effect_1}</p>
      <p>{weapon.effect_2}</p>
      <p>{weapon.effect_3}</p>
      <p>{weapon.atk_w}</p>
      <p>{weapon.hp_w}</p>
      <p>{weapon.mp_w}</p>
      <p>{weapon.atk_w}</p>
      <p>{weapon.matk_w}</p>
      <p>{weapon.def_w}</p>
      <p>{weapon.mdef_w}</p>
      <p>{weapon.crit_w}</p>
      <p>{weapon.spd_w}</p>
      <p>{weapon.stars}</p>
      <img src={imgDefault} alt="" />
    </div>
  )
}