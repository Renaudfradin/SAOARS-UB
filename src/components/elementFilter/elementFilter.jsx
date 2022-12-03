import React,{ useState } from "react";

export default function filter(props) {
  const typeElementCharacters = props.ElementCharacters;
  const characters = props.characters;
  const updateData = props.updateData;
  const [checkbox , clickCheckbox] = useState(true);

  function filterCheck() {
    clickCheckbox(!checkbox)
    console.log(typeElementCharacters);
    if (checkbox) {
      const filter = characters.filter((data)=> data.character_type.includes(typeElementCharacters));
      updateData(filter);
      console.log("data filtre",filter);
    }else{
      updateData(characters);
      console.log("datav de base",characters);
    }
  }

  return(
    <div>
      <button onClick={filterCheck}>{typeElementCharacters} {checkbox}</button>
    </div>
  )
}