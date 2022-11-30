import React from "react";

export default function cardAbilitys(props) {
  const name = props.name
  const start = props.start
  const type = props.type
  const imgAbilityDefault = props.imgAbilityDefault

  return(
    <div>
      <p>{name}</p>
      <img src={start} alt="" />
      <p>{type}</p>
      <img src={imgAbilityDefault} alt="" />
    </div>
  )
}