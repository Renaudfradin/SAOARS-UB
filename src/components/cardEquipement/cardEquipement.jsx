import React from "react";
import { Link } from "react-router-dom";
import defaultImg from '../../assets/img/imgDefault/stuff_303.png';
import "./cardEquipement.css"

export default function cardEquipement({id,name,stars}) {
  return(
    <div className="layoutEquipement">
      <div className="infoEquipement">
        <Link to={`/equipements/${id}`}><img className="imgEquipement" src={defaultImg} alt={defaultImg} /></Link>
        {stars}
      </div>
      <p>{name}</p>
    </div>
  )
}