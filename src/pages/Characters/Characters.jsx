import axios from "axios";
import React, { useEffect, useState } from "react";
import CardCharacters from "../../components/cardCharacters/cardCharacters.jsx";

//import icon start and atk
import imgDefault from "../../assets/img/character_250.png"
import OneStart from "../../assets/img/rarity_1.webp"
import TwoStart from "../../assets/img/rarity_2.webp"
import ThreeStart from "../../assets/img/rarity_3.webp"
import ForStart from "../../assets/img/rarity_4.webp"
import AIcon from "../../assets/img/icon_assult.png"
import BIcon from "../../assets/img/icon_break.png"
import CIcon from "../../assets/img/icon_charge.png"
import EIcon from "../../assets/img/icon_enhance.png"
import EMIcon from "../../assets/img/icon_enhance.m.png"
import DIcon from "../../assets/img/icon_debuff.png"
import HIcon from "../../assets/img/icon_heal.png"

export default function contentCharacters(){
  const [characters, updateCharacters] = useState([]);

  useEffect(() => {
    axios.get('https://api-saoars.vercel.app/perso')
      .then((response)=> {
        updateCharacters(response.data.characters);
      })
      .catch((error)=>{
        console.log(error);
      })
  }, []);

  function renderStarCharacter(param) {
    switch (param) {
      case 1:
        return OneStart;
      case 2:
        return TwoStart;
      case 3:
        return ThreeStart;
      case 4:
        return ForStart;
    }
  }

  function renderTypeAtk(param) {
    switch (param) {
      case 'A':
        return AIcon
      case 'B':
        return BIcon
      case 'C':
        return CIcon
      case 'D':
        return DIcon
      case 'E':
        return EIcon
      case 'EM':
        return EMIcon
      case 'H':
        return HIcon
    }
  }

  return(
    <div>
      <h2>caracter page</h2>
      {characters.map((character) => (
        <CardCharacters
          key={character.id} 
          style={{border:"1px solid white", marginTop:"10px"}}
          name_characters={character.name_characters}
          description={character.description}
          imgDefault={imgDefault}
          stars={renderStarCharacter(character.stars)}
          weapon_type={character.weapon_type}
          character_type={character.character_type}
          atk1_type={renderTypeAtk(character.atk1_type)}
          atk2_type={renderTypeAtk(character.atk2_type)}
          atk3_type={renderTypeAtk(character.atk3_type)}
        ></CardCharacters>
      ))}
    </div>
  )
}