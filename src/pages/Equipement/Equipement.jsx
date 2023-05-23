import React from "react";
import { useParams } from "react-router-dom";
import imgDefault from "@assets/img/imgDefault/stuff_306.jpg";
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
        <meta name="description" content="List Equipements - Sword Art Online : Unleash Blading - Database" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
      </Helmet>
      <div className="imgMid">
        <div className="infoEquipment">
          <div className="bg1">
            <div className="bg2">
              <p>{equipement.name}</p>
              <img src={imgDefault} alt={imgDefault} />
            </div>
          </div>
        </div>
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
            stats={{ ...equipement }}
          ></Stats>
        </div>
      </div>
    </>
  )
}