import React from "react";

export default function cardCharacters(props) {
  const name_characters = props.name_characters
  const description = props.description
  const imgDefault = props.imgDefault
  const stars = props.stars
  const weapon_type = props.weapon_type
  const character_type = props.character_type
  const atk1_type = props.atk1_type
  const atk2_type = props.atk2_type
  const atk3_type = props.atk3_type

  return(
    <div>
      <p>card characters</p>

      <p>{name_characters}</p>
      <p>{description}</p>
      <img src={imgDefault} alt="" />
      <br />
      <img src={stars} alt="" />
      <p>{weapon_type}</p>
      <p>{character_type}</p>
      <img src={atk1_type} alt="" />
      <img src={atk2_type} alt="" />
      <img src={atk3_type} alt="" />
    </div>
  )
}