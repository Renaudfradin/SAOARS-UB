import axios from "axios";
import React from "react";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import imgDefault from '../../assets/img/imgDefault/stuff_303.png'
import Stats from "../../components/stats/stats";
import Effect from "../../components/effect/effect";
import "./Equipement.css"

export default function Equipement(params) {
  const param = useParams();
  const idPram = param.id;
  const [equipement, updateEquipement] = useState([]);

  useEffect(()=>{
    axios.get(`https://api-saoars.vercel.app/equipment/${idPram}`)
      .then((response)=>{
        updateEquipement(response.data.equipment[0]);
      })
      .catch((error)=>{
        console.log(error);
      })
  },[])

  useEffect(()=>{
    document.title = `${equipement.name}`;
  })

  return(
    <div>
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