import React from "react";
import { Link } from "react-router-dom";
import RenderStart from "../renderStars/renderStart.jsx";
import "./cardAbilitys.css"

export default function cardAbilitys({id,name,stars,type,imgAbilityDefault}) {
  return(
    <div className="layoutAbility">
      <div className="infoAbility">
        <RenderStart list={true} stars={stars} />
        <Link to={`/abilitys/${id}`}><img className="imgAbility" src={imgAbilityDefault} alt={imgAbilityDefault} /></Link>
        <RenderStart list={true} stars={stars} />
      </div>
      <p>{name}</p>
      {/* <p>{type}</p> */}
    </div>
  )
}