import React from "react";
import CardAbilitys from "@components/cardAbilitys/cardAbilitys.jsx";
import RenderStart from "@components/renderStars/renderStart.jsx";
import imgAbilityDefault from "@assets/img/imgDefault/abilitys.jpg"
import { Helmet } from "react-helmet-async";
import useAbilitys from "@hook/useAbilitys";

export default function contentAbility() {
  const { abilitys } = useAbilitys();

  return (
    <>
      <Helmet>
        <title>List Abilitys - Sword Art Online : Unleash Blading - Database</title>
        <meta name="title" content="List Abilitys - Sword Art Online : Unleash Blading - Database" />
        <meta name="description" content="List Abilitys - Sword Art Online : Unleash Blading - Database" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
      </Helmet>
      <div className="imgMid">
        <div className="cardList">
          {abilitys.map((ability) => (
              <CardAbilitys
              key={ability.id}
              id={ability.id}
              name={ability.name}
              stars={ability.start}
              type={ability.type}
              imgAbilityDefault={imgAbilityDefault}
            ></CardAbilitys>
          ))}
        </div>
      </div>
    </>
  )
}