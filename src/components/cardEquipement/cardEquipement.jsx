import React from "react";
import { Link } from "react-router-dom";
import RenderStart from "../renderStars/renderStart.jsx";
import RenderTypeWeapon from "../renderTypeWeapon/renderTypeWeapon.jsx";
import defaultImg from '@assets/img/imgDefault/stuff_303.png';
import "./cardEquipement.css";

export default function cardEquipement({id,name,stars,type,typeEquipement}) {
  return(
    <div className="layoutEquipement">
      <div className="infoEquipement">
        <RenderStart list={true} stars={stars} />
        <Link to={`/equipements/${id}`}><img className="imgEquipement" src={defaultImg} alt={defaultImg} /></Link>
        <RenderStart list={true} stars={stars} />
      </div>
      <p>{name}</p>
    </div>
  )
}