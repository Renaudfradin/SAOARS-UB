import axios from "axios";
import React, { useEffect, useState, useMemo  } from "react";
import CardCharacters from "../../components/cardCharacters/cardCharacters.jsx";
import ElementsFilter from "../../components/elementsFilter/elementsFilter.jsx";
import RenderStart from "../../components/renderStars/renderStart.jsx";
import RenderTypeAtk from "../../components/renderTypeAtk/renderTypeAtk.jsx";
import imgDefault from "../../assets/img/imgDefault/character_250.png"
import "./Characters.css"

export default function contentCharacters(){
  const [characters, updateCharacters] = useState([]);
  const [inputvalue , updateInputValue] = useState("");
  const [filteredData, updateFilteredData] = useState([]);

  useMemo(() => {
    document.title = "List Characters";

    axios.get('https://api-saoars.vercel.app/perso')
      .then((response)=> {
        updateCharacters(response.data.characters);
        console.log(response.data.characters);
      })
      .catch((error)=>{
        console.log(error);
      })
  }, [ ] );

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
            stars={<RenderStart list={true} stars={character.stars} />}
            weapon_type={character.weapon_type}
            character_type={character.character_type}
            atk1_type={<RenderTypeAtk type={character.atk1_type} />}
            atk2_type={<RenderTypeAtk type={character.atk2_type} />}
            atk3_type={<RenderTypeAtk type={character.atk3_type} />}
          ></CardCharacters>
        ))) :(
          characters.map((character) => (
            <CardCharacters
              id={character.id}
              key={character.id} 
              name_characters={character.name_characters}
              description={character.description}
              imgDefault={imgDefault}
              stars={<RenderStart list={true} stars={character.stars} />}
              weapon_type={character.weapon_type}
              character_type={character.character_type}
              atk1_type={<RenderTypeAtk type={character.atk1_type} />}
              atk2_type={<RenderTypeAtk type={character.atk2_type} />}
              atk3_type={<RenderTypeAtk type={character.atk3_type} />}
            ></CardCharacters>
          ))
        )
      }
      </div>
    </div>
  )
}