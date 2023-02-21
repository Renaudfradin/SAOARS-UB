import React from "react";
import CardAbilitys from "@components/cardAbilitys/cardAbilitys.jsx";
import RenderStart from "@components/renderStars/renderStart.jsx";
import imgAbilityDefault from "@assets/img/imgDefault/abilitys.jpg"
import { Helmet } from "react-helmet-async";
import useAbilitys from "@hook/useAbilitys";

export default function contentAbility() {
  const { abilitys } = useAbilitys();

  return(
    <div className="cardList">
      <Helmet>
        <title>List Abilitys - Sword Art Online : Unleash Blading - Database</title>
      </Helmet>
      {abilitys.map((ability)=>(
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