import React from "react";
import useCharacter from "@hook/useCharacter";

export default function homeImg() {
  function randomId(min,max) {
    const random = Math.floor(Math.random() * (max - min) + min);
    return random;
  }
  
  const { character } = useCharacter(randomId(36, 253));

  return (
    <div className="divimgProm">
      <img src={character.img} alt={character.img} />
    </div>
  )
}