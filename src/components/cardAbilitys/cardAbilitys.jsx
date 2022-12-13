import React from "react";
import { Link } from "react-router-dom";

export default function cardAbilitys(props) {
  const id = props.id
  const name = props.name
  const stars = props.stars
  const type = props.type
  const imgAbilityDefault = props.imgAbilityDefault

  return(
    <div>
      <p>{name}</p>
      {stars}
      <p>{type}</p>
      <Link to={`/ability/${id}`}>{id}</Link>
      <img src={imgAbilityDefault} alt="" />
    </div>
  )
}