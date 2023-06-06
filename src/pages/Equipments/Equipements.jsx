import React from "react";
import CardEquipement from "@components/cardEquipement/cardEquipement";
import { Helmet } from "react-helmet-async";
import useEquipements from "../../hook/useEquipements";

export default function Equipements(){
  const { equipements } = useEquipements();

  return (
    <>
      <Helmet>
        <title>List Equipements - Sword Art Online : Unleash Blading - Database</title>
        <meta name="title" content="List Equipements - Sword Art Online : Unleash Blading - Database" />
        <meta name="description" content="List Equipements - Sword Art Online : Unleash Blading - Database" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
      </Helmet>
      <div className="imgMid">
        <div className="cardList">
          {equipements.map((equipement) => (
            <CardEquipement
              key={equipement.id}
              id={equipement.id}
              name={equipement.name}
              stars={equipement.stars}
              type={equipement.type}
              typeEquipement={equipement.type_equipement}
            ></CardEquipement>
          ))}
        </div>
      </div>
    </>
  )
}