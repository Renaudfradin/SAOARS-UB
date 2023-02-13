import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import CardEquipement from "@components/cardEquipement/cardEquipement";
import RenderStart from "@components/renderStars/renderStart";
import { Helmet } from "react-helmet-async";

export default function Equipements(){
  const [equipements, updateEquipement] = useState([]);

  useEffect(()=>{
    axios.get('https://api-saoars.vercel.app/equipment/')
      .then((response)=>{
        updateEquipement(response.data.equipments);
      })
      .catch((error)=>{
        console.log(error);
      })
  },[])

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