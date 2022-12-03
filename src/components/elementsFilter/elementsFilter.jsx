import React from "react";
import ElementFilter from "../elementFilter/elementFilter.jsx"

export default function elementsFilter(props) {
  const characters = props.characters;
  const updateData = props.updateData;
  const filteredData = props.filteredData;

  return(
    <div>
      <ElementFilter
        ElementCharacters={"neutre"}
        characters={characters}
        updateData={updateData}
        filteredData={filteredData}
      ></ElementFilter>
      <ElementFilter
        ElementCharacters={"eau"}
        characters={characters}
        updateData={updateData}
        filteredData={filteredData}
      ></ElementFilter>
      <ElementFilter
        ElementCharacters={"terre"}
        characters={characters}
        updateData={updateData}
        filteredData={filteredData}
      ></ElementFilter><ElementFilter
        ElementCharacters={"feu"}
        characters={characters}
        updateData={updateData}
        filteredData={filteredData}
      ></ElementFilter>
      <ElementFilter
        ElementCharacters={"lumiere"}
        characters={characters}
        updateData={updateData}
        filteredData={filteredData}
      ></ElementFilter>
      <ElementFilter
        ElementCharacters={"ténèbres"}
        characters={characters}
        updateData={updateData}
        filteredData={filteredData}
      ></ElementFilter>
      <ElementFilter
        ElementCharacters={"vent"}
        characters={characters}
        updateData={updateData}
      ></ElementFilter>
    </div>
  )
}