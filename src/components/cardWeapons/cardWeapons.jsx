import React from "react";
import { Link } from "react-router-dom"
import "./cardWeapons.css"

export default function cardWeapon({idw,name_weapon,imgWeaponDefault,stars}) {
  return(
    <div className="layoutWeapon">
      <div className="infoWeapon">
        <Link to={`/weapon/${idw}`}><img className="imgWeapon" src={imgWeaponDefault} alt={imgWeaponDefault} /></Link>
        {stars}
      </div>
      <p>{name_weapon}</p>
    </div>
  )
}