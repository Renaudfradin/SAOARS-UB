import React from "react";
import CardEquipement from "@components/cardEquipement/cardEquipement";
import RenderStart from "@components/renderStars/renderStart";
import { Helmet } from "react-helmet-async";
import useEquipements from "../../hook/useEquipements";

export default function Equipements(){
  const { equipements } = useEquipements();

  return (
    <>
      <Helmet>
        <title>List Equipements - Sword Art Online : Unleash Blading - Database</title>
        <meta name="description" content="List Equipements - Sword Art Online : Unleash Blading - Database" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
      </Helmet>
      <div className="imgHeader">
        <div className="leftHeader" />
        <div className="midHeader" />
        <div className="rightHeader" />
      </div>
      <div className="imgMid">
        <div className="cardList">
          {equipements.map((equipement)=>(
            <CardEquipement
              key={equipement.id}
              id={equipement.id}
              name={equipement.name}
              stars={<RenderStart list={true} stars={equipement.stars} />}
            ></CardEquipement>
          ))}
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