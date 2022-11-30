import React from "react";

export default function cardWeapon(props) {
  const name_weapon = props.name_weapon
  const imgWeaponDefault = props.imgWeaponDefault
  const stars = props.stars

  return(
    <div>
      <p>{name_weapon}</p>
      <img src={imgWeaponDefault} alt="" />
      <img src={stars} alt="" />
    </div>
  )
}