import React from "react";
import { Link } from "react-router-dom";
import "./cardAbilitys.css"

export default function cardAbilitys({id,name,stars,type,imgAbilityDefault}) {
  return(
    <div className="layoutAbility">
      <div className="infoAbility">
        <Link to={`/abilitys/${id}`}><img className="imgAbility" src={imgAbilityDefault} alt={imgAbilityDefault} /></Link>
        {stars}
      </div>
      <p>{name}</p>
      {/* <p>{type}</p> */}
    </div>
  )
}