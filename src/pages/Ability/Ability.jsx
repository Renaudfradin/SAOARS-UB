import React from "react";
import { useParams } from "react-router-dom";
import imgAbilityDefault from "@assets/img/imgDefault/abilitys.jpg";
import "./Ability.css";
import { Helmet } from "react-helmet-async";
import useAbility from "@hook/useAbility";
import RenderStart from "@components/renderStars/renderStart";

export default function Ability() {
  const param = useParams();
  const idParam = param.id;
  const { ability } = useAbility(idParam);

  return(
    <>
      <Helmet>
        <title>{ability.name}</title>
        <meta name="description" content="List Abilitys - Sword Art Online : Unleash Blading - Database" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
      </Helmet>
      <div className="imgMid">
        <div className="infoAbilitys">
          <div className="bg1">
            <div className="bg2">
              <p>{ability.name}</p>
              <img src={imgAbilityDefault} alt={imgAbilityDefault} />
            </div>
          </div>
        </div>
          <RenderStart
            list={false}
            stars={ability.start}
          ></RenderStart>
        <div className="divInfo">
          <p>{ability.description}</p>
          {/* <p>{ability.type}</p> */}
        </div>
      </div>
    </>
  )
}