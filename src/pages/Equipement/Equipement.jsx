import axios from "axios";
import React from "react";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import imgDefault from '../../assets/img/stuff_303.png'

export default function Equipement(params) {
  const param = useParams();
  const idPram = param.id;
  const [equipement, updateEquipement] = useState([]);

  useEffect(()=>{
    console.log(idPram);
    axios.get(`https://api-saoars.vercel.app/equipment/${idPram}`)
      .then((response)=>{
        console.log(response.data.equipment[0]);
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
      <p>equipement</p>
      <p>{equipement.name}</p>
      <img src={imgDefault} alt="" />
      
      <p>{equipement.hp}</p>
      <p>{equipement.mp}</p>
      <p>{equipement.atk}</p>
      <p>{equipement.matk}</p>
      <p>{equipement.def}</p>
      <p>{equipement.mdef}</p>
      <p>{equipement.crit}</p>
      <p>{equipement.spd}</p>
      
      <p>{equipement.effect_1}</p>
      <p>{equipement.effect_2}</p>

    </div>
  )
}