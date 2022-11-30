import axios from "axios";
import React, { useEffect, useState } from "react";
import OneStart from "../../assets/img/rarity_1.webp"
import TwoStart from "../../assets/img/rarity_2.webp"
import ThreeStart from "../../assets/img/rarity_3.webp"
import ForStart from "../../assets/img/rarity_4.webp"
import imgAbilityDefault from "../../assets/img/abilitys.jpg"

export default function contentAbility(params) {
  const [Abilitys , updateAbilitys] = useState([])

  useEffect(()=>{
    axios.get('https://api-saoars.vercel.app/ability')
      .then((response)=>{
        console.log(response.data.abilitys);
        updateAbilitys(response.data.abilitys)
      })
      .catch((error)=>{
        console.log(error);
      })
  }, [])

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
  
  return(
    <div>
      <p>contenta bility</p>
      {Abilitys.map((ability)=>(
        <div key={ability.id}>
          <p>{ability.name}</p>
          <img src={renderStarCharacter(ability.start)} alt="" />
          <p>{ability.type}</p>
          <img src={imgAbilityDefault} alt="" />
        </div>
      ))}
    </div>
  )
}