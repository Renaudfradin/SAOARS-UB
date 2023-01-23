import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import RenderStart from "../renderStars/renderStart";
import RenderTypeAtk from "../renderTypeAtk/renderTypeAtk";
import RenderTypeWeapon from "../renderTypeWeapon/renderTypeWeapon";
import "./cardCharacters.css"

export default function cardCharacters({
  imgDefault,
  infoCharacters
}) {
  useEffect(()=>{
    console.log(infoCharacters);
  }, [])
  return(
    <div className="layoutCharacter">
      <div className="infoCharacter">
        <RenderStart list={true} stars={infoCharacters.stars} />
        <Link to={`/characters/${infoCharacters.id}`}><img className="imgCharacter" src={imgDefault} alt={imgDefault} /></Link>
        <div className="listIconAtk">
          <RenderTypeWeapon weapon_type={infoCharacters.weapon_type} character_type={infoCharacters.character_type}/>
          <RenderTypeAtk type={infoCharacters.atk1_type} />
          <RenderTypeAtk type={infoCharacters.atk2_type} />
          <RenderTypeAtk type={infoCharacters.atk3_type} />
        </div>
      </div>
      <p>{infoCharacters.name_characters}</p>  
      <p>[{infoCharacters.description}]</p> 
    </div>
  )
}