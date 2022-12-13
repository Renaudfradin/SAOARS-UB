import React from "react";
import { Link } from "react-router-dom";

export default function cardCharacters(props) {
  const id = props.id
  const name_characters = props.name_characters
  const description = props.description
  const imgDefault = props.imgDefault
  const stars = props.stars
  const weapon_type = props.weapon_type
  const character_type = props.character_type
  const atk1_type = props.atk1_type
  const atk2_type = props.atk2_type
  const atk3_type = props.atk3_type
  // const starts = props.starts

  return(
    <div>
      <p>card characters</p>
      <p>{name_characters}</p>  
      <p>{description}</p>
      <img src={imgDefault} alt="" />
      <br />
      {stars}
      <p>{weapon_type}</p>
      <p>{character_type}</p>
      <Link to={`/character/${id}`}>{id}</Link>
      <img src={atk1_type} alt="" />
      <img src={atk2_type} alt="" />
      <img src={atk3_type} alt="" />
    </div>
  )
}