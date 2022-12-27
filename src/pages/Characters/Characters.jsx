import axios from "axios";
import React, { useEffect, useState } from "react";
import CardCharacters from "../../components/cardCharacters/cardCharacters.jsx";
import ElementsFilter from "../../components/elementsFilter/elementsFilter.jsx";
import RenderStart from "../../components/renderStars/renderStart.jsx";
import "./Characters.css"

//import icon atk
import imgDefault from "../../assets/img/imgDefault/character_250.png"
import AIcon from "../../assets/img/icon_atk/icon_assult.svg"
import BIcon from "../../assets/img/icon_atk/icon_break.svg"
import CIcon from "../../assets/img/icon_atk/icon_charge.svg"
import EIcon from "../../assets/img/icon_atk/icon_enhance.svg"
import EMIcon from "../../assets/img/icon_atk/icon_enhance-1.svg"
import DIcon from "../../assets/img/icon_atk/icon_debuff.svg"
import HIcon from "../../assets/img/icon_atk/icon_heal.svg"

export default function contentCharacters(){
  const [characters, updateCharacters] = useState([]);
  const [inputvalue , updateInputValue] = useState("");
  const [filteredData, updateFilteredData] = useState([]);

  useEffect(() => {
    document.title = "List Characters";

    axios.get('https://api-saoars.vercel.app/perso')
      .then((response)=> {
        updateCharacters(response.data.characters);
      })
      .catch((error)=>{
        console.log(error);
      })
  }, []);

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

  function filterData(value) {
    updateInputValue(value);
    const filter = characters.filter((data) => data.name_characters.toLowerCase().includes(inputvalue));
    console.log(filter)
    if (filter.length > 0) {
      updateFilteredData(filter)
    }else{
      updateFilteredData(characters)
      console.log("aucune data",filteredData);
    }
  }


  return(
    <div className="container_characters">
      <h2>caracter page</h2>
      <label htmlFor="">by name</label>
      <input type="text" name="inputName" value={inputvalue} onChange={(e)=> filterData(e.target.value)} />

      <ElementsFilter
        characters={characters}
        updateData={updateFilteredData}
        filteredData={filteredData}
      ></ElementsFilter>

      <div className="CardList">
      { filteredData.length != 0 ? (
        filteredData.map((character) => (
          <CardCharacters
            key={character.id} 
            id={character.id}
            name_characters={character.name_characters}
            description={character.description}
            imgDefault={imgDefault}
            stars={<RenderStart stars={character.stars} />}
            weapon_type={character.weapon_type}
            character_type={character.character_type}
            atk1_type={renderTypeAtk(character.atk1_type)}
            atk2_type={renderTypeAtk(character.atk2_type)}
            atk3_type={renderTypeAtk(character.atk3_type)}
          ></CardCharacters>
        ))) :(
          characters.map((character) => (
            <CardCharacters
              id={character.id}
              key={character.id} 
              name_characters={character.name_characters}
              description={character.description}
              imgDefault={imgDefault}
              stars={<RenderStart stars={character.stars} />}
              weapon_type={character.weapon_type}
              character_type={character.character_type}
              atk1_type={renderTypeAtk(character.atk1_type)}
              atk2_type={renderTypeAtk(character.atk2_type)}
              atk3_type={renderTypeAtk(character.atk3_type)}
            ></CardCharacters>
          ))
        )
      }
      </div>
    </div>
  )
}