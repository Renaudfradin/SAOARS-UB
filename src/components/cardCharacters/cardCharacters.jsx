import React from "react";
import { Link } from "react-router-dom";
import "./cardCharacters.css"

export default function cardCharacters({
  id,
  name_characters,
  description,
  imgDefault,
  stars,
  weapon_type,
  character_type,
  atk1_type,
  atk2_type,
  atk3_type
}) {
  return(
    <div className="layoutCharacter">
      <div className="infoCharacter">
        {stars}   
        <Link to={`/characters/${id}`}><img className="imgCharacter" src={imgDefault} alt={imgDefault} /></Link>
        <div className="listIconAtk">
          {atk1_type}
          {atk2_type}
          {atk3_type}
        </div>
      </div>
      <p>{name_characters}</p>  
      <p>[{description}]</p> 
      {/* <p>{weapon_type}</p>
      <p>{character_type}</p> */}
      
    </div>
  )
}