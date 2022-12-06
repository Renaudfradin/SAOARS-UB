import React from "react";
import { Link } from "react-router-dom";

export default function cardAbilitys(props) {
  const id = props.id
  const name = props.name
  const start = props.start
  const type = props.type
  const imgAbilityDefault = props.imgAbilityDefault

  return(
    <div>
      <p>{name}</p>
      <img src={start} alt="" />
      <p>{type}</p>
      <Link to={`/ability/${id}`}>{id}</Link>
      <img src={imgAbilityDefault} alt="" />
    </div>
  )
}