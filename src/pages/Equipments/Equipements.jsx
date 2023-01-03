import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import CardEquipement from "../../components/cardEquipement/cardEquipement";
import RenderStart from "../../components/renderStars/renderStart";
import "./Equipements.css"

export default function Equipements(){
  const [equipements, updateEquipement] = useState([]);

  useEffect(()=>{
    document.title= "List Equipements";

    axios.get('https://api-saoars.vercel.app/equipment/')
      .then((response)=>{
        console.log(response.data.equipments);
        updateEquipement(response.data.equipments);
      })
      .catch((error)=>{
        console.log(error);
      })
  },[])

  return(
    <div className="layoutEquipements">
      {equipements.map((equipement)=>(
        <CardEquipement
          key={equipement.id}
          id={equipement.id}
          name={equipement.name}
          type={equipement.type}
          type_equipement={equipement.type_equipement}
          hp={equipement.hp}
          mp={equipement.mp}
          atk={equipement.atk}
          matk={equipement.matk}
          def={equipement.def}
          mdef={equipement.mdef}
          crit={equipement.crit}
          spd={equipement.spd}
          effect_1={equipement.effect_1}
          effect_2={equipement.effect_2}
          stars={<RenderStart list={true} stars={equipement.stars} />}
        ></CardEquipement>
      ))}
    </div>
  )
}