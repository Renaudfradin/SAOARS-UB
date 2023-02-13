import React from "react";
import iconatk from "@assets/img/limit_break_0.svg";
import iconatk1 from "@assets/img/icon_passiv.svg";
import RenderTypeAtk from "../renderTypeAtk/renderTypeAtk";
import "./effect.css";

export default function effect({character,effect,title,description,mp,typeAtk}) {
  return(
    <div className="containerInfo">
      {character == true ? 
      <div className="info">
        <div className="infoEffectleft">
          <RenderTypeAtk type={typeAtk}/>
        </div>
        <div className="infoEffectrighttt">
          <div className="infoEffectrightt">
            <p>{title}</p>
            <p>{description}</p>
          </div>
          <p className="infoMp">{mp} MP</p>
        </div>
      </div>
      :
      <div className="info">
        <div className="infoEffectleft">
          <img src={iconatk1} alt={iconatk1} />
        </div>
        <div className="infoEffectright">
          <img className="imgEffect" src={iconatk} alt={iconatk} />
          <p>{effect}</p>
        </div>
      </div>
      }
    </div> 
  )
}