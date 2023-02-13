import axios from "axios";
import React, { useEffect, useState } from "react";
import CardCharacters from "@components/cardCharacters/cardCharacters.jsx";
// import ElementsFilter from "@components/elementsFilter/elementsFilter.jsx";
import imgDefault from "@assets/img/imgDefault/character_250.png"
import { Helmet } from "react-helmet-async";

export default function contentCharacters(){
  const [character, updateCharacter] = useState([]);
  const [inputvalue , updateInputValue] = useState("");
  const [filteredData, updateFilteredData] = useState([]);
  const [advancedsearch, updateAdvancedsearch] = useState(false);

  useEffect(() => {
    document.title = "List Characters";
    axios.get('https://api-saoars.vercel.app/perso')
      .then((response)=> {
        updateCharacter(response.data.characters);
      })
      .catch((error)=>{
        console.log(error);
      })
  }, [ ] );

  function handleChange(event) {
    updateInputValue(event.target.value);
    const filter = character.filter(data => data.name_characters.toLowerCase().includes(inputvalue));
    if (inputvalue) {
      updateFilteredData(filter);
    }else{
      updateCharacter(character);
    }
  }

  function searchAdvence(){
    updateAdvancedsearch(!advancedsearch);
    console.log(advancedsearch);
  }

  return(
    <div className="container_characters">
      <Helmet>
        <title>List Characters - Sword Art Online : Unleash Blading - Database</title>
      </Helmet>
      <div>
        <button onClick={searchAdvence}>Advanced search</button>
      </div>
      { advancedsearch ? 
        <div>
          <input type="search" name="inputName" value={inputvalue} onChange={handleChange} />
        </div>
        :""
      }

      <div className="cardList">
        { inputvalue && filteredData.length != 0 ? (
            filteredData.map((character) => (
              <CardCharacters
                key = { character.id } 
                infoCharacters = {{ ...character  }}
                imgDefault = { imgDefault }
              ></CardCharacters>
            ))
          ):(
            character.map((character) => (
              <CardCharacters
                key = { character.id } 
                infoCharacters = {{ ...character  }}
                imgDefault = { imgDefault }
              ></CardCharacters>
            ))
          )
        }
      </div>
    </div>
  )
}