import React, { useState } from "react";
import CardCharacters from "@components/cardCharacters/cardCharacters.jsx";
// import ElementsFilter from "@components/elementsFilter/elementsFilter.jsx";
import { Helmet } from "react-helmet-async";
import useCharacters from "@hook/useCharacters.jsx";

export default function contentCharacters(){
  const [inputvalue , updateInputValue] = useState("");
  const [filteredData, updateFilteredData] = useState([]);
  const [advancedsearch, updateAdvancedsearch] = useState(false);
  const { characters } = useCharacters();

  function handleChange(event) {
    updateInputValue(event.target.value);
    const filter = characters.filter(data => data.name_characters.toLowerCase().includes(inputvalue));
    if (inputvalue) {
      updateFilteredData(filter);
    }else{
      return characters;
    }
  }

  function searchAdvence(){
    updateAdvancedsearch(!advancedsearch);
    console.log(advancedsearch);
  }

  return (
    <>
      <Helmet>
        <title>List Characters - Sword Art Online : Unleash Blading - Database</title>
        <meta name="description" content="List Characters - Sword Art Online : Unleash Blading - Database" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
      </Helmet>
      <div className="imgMid">
        <div className="container_characters">
          <div>
            <button onClick={searchAdvence}>Advanced search</button>
          </div>
          { advancedsearch ? 
            <div>
              <input type="search" name="inputName" value={inputvalue} onChange={handleChange} />
            </div>
            : null }
          <div className="cardList">
            { inputvalue && filteredData.length != 0 ? (
                filteredData.map((character) => (
                  <CardCharacters
                    key = { character.id } 
                    infoCharacters = {{ ...character  }}
                  ></CardCharacters>
                ))
              ):(
                characters.map((character) => (
                  <CardCharacters
                    key = { character.id } 
                    infoCharacters = {{ ...character  }}
                  ></CardCharacters>
                ))
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}