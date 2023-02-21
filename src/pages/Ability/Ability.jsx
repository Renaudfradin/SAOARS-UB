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
    <div className="containerAbility">
      <Helmet>
        <title>{ability.name}</title>
      </Helmet>
      <div className="divTitle">
        <p>{ability.name}</p>
        <RenderStart
          list={false}
          stars={ability.start}
        ></RenderStart>
      </div>
      <div className="divInfo">
        <p>{ability.description}</p>
        <p>{ability.type}</p>
      </div>
      <img src={imgAbilityDefault} alt="" />
    </div>
  )
}