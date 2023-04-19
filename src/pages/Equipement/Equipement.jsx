import React from "react";
import { useParams } from "react-router-dom";
import imgDefault from '@assets/img/imgDefault/stuff_303.png';
import Stats from "@components/stats/stats";
import Effect from "@components/effect/effect";
import { Helmet } from "react-helmet-async";
import useEquipement from "@hook/useEquipement";
import "./Equipement.css";

export default function Equipement() {
  const param = useParams();
  const idPram = param.id;
  const { equipement } = useEquipement(idPram);

  return(
    <>
      <Helmet>
        <title>Equipement {idPram}</title>
      </Helmet>
      <div className="imgHeader">
        <div className="leftHeader" />
        <div className="midHeader" />
        <div className="rightHeader" />
      </div>
      <div className="imgMid">
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
      <div className="imgFooter">
        <div className="leftFooter" />
        <div className="midFooter" />
        <div className="rightFooter" />
      </div>
    </>
  )
}