import axios from "axios";
import React, { useEffect, useState } from "react";
import CardAbilitys from "../../components/cardAbilitys/cardAbilitys.jsx";
import RenderStart from "../../components/renderStars/renderStart.jsx";
import imgAbilityDefault from "../../assets/img/imgDefault/abilitys.jpg"
import "./Abilitys.css"

export default function contentAbility(params) {
  const [Abilitys , updateAbilitys] = useState([])

  useEffect(()=>{
    document.title = "List Ability";

    axios.get('https://api-saoars.vercel.app/ability')
      .then((response)=>{
        updateAbilitys(response.data.abilitys);
      })
      .catch((error)=>{
        console.log(error);
      })
  }, [])
  
  return(
    <div className="layoutAbilitys">
      {Abilitys.map((ability)=>(
        <CardAbilitys
          key={ability.id}
          id={ability.id}
          name={ability.name}
          stars={<RenderStart stars={ability.start} />}
          type={ability.type}
          imgAbilityDefault={imgAbilityDefault}
        ></CardAbilitys>
      ))}
    </div>
  )
}