import React from "react";
import { Link } from "react-router-dom";
import RenderStart from "../renderStars/renderStart.jsx";
import RenderTypeWeapon from "../renderTypeWeapon/renderTypeWeapon.jsx";
import imgWeaponDefault from "@assets/img/imgDefault/stuff_370.png"
import "./cardWeapons.css"

export default function cardWeapon({idw,name_weapon,stars,weaponType,weaponElement}) {
  return(
    <div className="layoutWeapon">
      <div className="infoWeapon">
        <RenderStart list={true} stars={stars} />
        <Link to={`/weapons/${idw}`}><img className="imgWeapon" src={imgWeaponDefault} alt={imgWeaponDefault} /></Link>
        <RenderTypeWeapon weapon_type={weaponType} character_type={weaponElement}/>
      </div>
      <p>{name_weapon}</p>
    </div>
  )
}