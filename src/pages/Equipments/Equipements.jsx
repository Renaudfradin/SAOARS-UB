import React from "react";
import CardEquipement from "@components/cardEquipement/cardEquipement";
import RenderStart from "@components/renderStars/renderStart";
import { Helmet } from "react-helmet-async";
import useEquipements from "../../hook/useEquipements";

export default function Equipements(){
  const { equipements } = useEquipements();

  return(
    <div className="cardList">
      <Helmet>
        <title>List Equipements - Sword Art Online : Unleash Blading - Database</title>
      </Helmet>
      {equipements.map((equipement)=>(
        <CardEquipement
          key={equipement.id}
          id={equipement.id}
          name={equipement.name}
          stars={<RenderStart list={true} stars={equipement.stars} />}
        ></CardEquipement>
      ))}
    </div>
  )
}