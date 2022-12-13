import React from "react";
import { Link } from "react-router-dom"

export default function cardWeapon(props) {
  const idw = props.idw
  const name_weapon = props.name_weapon
  const imgWeaponDefault = props.imgWeaponDefault
  const stars = props.stars

  return(
    <div>
      <p>{name_weapon}</p>
      <img src={imgWeaponDefault} alt="" />
      {stars}
      <Link to={`/weapon/${idw}`}>{idw}</Link>
    </div>
  )
}