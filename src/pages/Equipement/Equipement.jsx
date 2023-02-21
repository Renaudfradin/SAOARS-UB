import React from "react";
import { useParams } from "react-router-dom";
import imgDefault from '@assets/img/imgDefault/stuff_303.png'
import Stats from "@components/stats/stats";
import Effect from "@components/effect/effect";
import "./Equipement.css";
import { Helmet } from "react-helmet-async";
import useEquipement from "@hook/useEquipement";

export default function Equipement(params) {
  const param = useParams();
  const idPram = param.id;
  const { equipement } = useEquipement(idPram);

  return(
    <div>
      <Helmet>
        <title>Equipement {idPram}</title>
      </Helmet>
      <p>{equipement.name}</p>
      <img src={imgDefault} alt="" />

      <div className="layoutStat">
        <div className="containerEffect">
          <Effect
            effect={equipement.effect_1}
          ></Effect>
          <Effect
            effect={equipement.effect_2}
          ></Effect>
        </div>
  
        <Stats
          hp={equipement.hp}
          mp={equipement.mp}
          atk={equipement.atk}
          matk={equipement.matk}
          def={equipement.def}
          mdef={equipement.mdef}
          crit={equipement.crit}
          spd={equipement.spd}
        ></Stats>
      </div>
      
    </div>
  )
}