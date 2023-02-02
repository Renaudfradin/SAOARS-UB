import axios from "axios";
import React, { useEffect, useState } from "react";
import CardAbilitys from "../../components/cardAbilitys/cardAbilitys.jsx";
import RenderStart from "../../components/renderStars/renderStart.jsx";
import imgAbilityDefault from "../../assets/img/imgDefault/abilitys.jpg"
import { Helmet } from "react-helmet-async";

export default function contentAbility(params) {
  const [Abilitys , updateAbilitys] = useState([])

  useEffect(()=>{
    axios.get('https://api-saoars.vercel.app/ability')
      .then((response)=>{
        updateAbilitys(response.data.abilitys);
      })
      .catch((error)=>{
        console.log(error);
      })
  }, [])
  
  return(
    <div className="cardList">
      <Helmet>
        <title>List Abilitys - Sword Art Online : Unleash Blading - Database</title>
      </Helmet>
      {Abilitys.map((ability)=>(
        <CardAbilitys
          key={ability.id}
          id={ability.id}
          name={ability.name}
          stars={<RenderStart list={true} stars={ability.start} />}
          type={ability.type}
          imgAbilityDefault={imgAbilityDefault}
        ></CardAbilitys>
      ))}
    </div>
  )
}