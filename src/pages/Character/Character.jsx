import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import imgDefault from "../../assets/img/imgDefault/character_2502.png"

export default function Character() {
  const param = useParams();
  const idParam = param.id;
  const [character , updateCharacter] = useState([]);

  useEffect(() => {
    console.log(idParam);
    axios.get(`https://api-saoars.vercel.app/perso/${idParam}`)
    .then((response) => {
      updateCharacter(response.data.character[0]);
    })
  }, [])

  useEffect(()=>{
    document.title = `${character.name_characters} [${character.description}]`;
  })
  return(
    <div>
      <p>character </p>
      <p>{character.id}</p>
      <p>{character.name_characters}</p>
      <p>{character.description}</p>
      <p>{character.profile}</p>
      <img src={imgDefault} alt="" srcset="" />

      <p>{character.atk1}</p>
      <p>{character.atk1_type}</p>
      <p>{character.description_atk1}</p>
      <p>{character.mp_atk1}</p>

      <p>{character.atk2}</p>
      <p>{character.atk2_type}</p>
      <p>{character.description_atk2}</p>
      <p>{character.mp_atk2}</p>

      <p>{character.atk3}</p>
      <p>{character.atk3_type}</p>
      <p>{character.description_atk3}</p>
      <p>{character.mp_atk3}</p>

      <p>{character.hp}</p>
      <p>{character.mp}</p>
      <p>{character.atk}</p>
      <p>{character.matk}</p>
      <p>{character.def}</p>
      <p>{character.mdef}</p>
      <p>{character.crit}</p>
      <p>{character.spd}</p>

      <p>{character.ultime}</p>
      <p>{character.ultime_description}</p>
      <p>{character.enhance_ultime}</p>
      <p>{character.enhance_ultime_description}</p>
      <p>{character.enhance_ultime_mp}</p>
      <p>{character.enhance_atk1}</p>
      <p>{character.enhance_atk1_description}</p>
      <p>{character.enhance_atk1_mp}</p>
      <p>{character.enhance_atk2}</p>
      <p>{character.enhance_atk2_description}</p>
      <p>{character.enhance_atk2_mp}</p>
      <p>{character.special_partner}</p>
      <p>{character.stars}</p>

    </div>
  )
}