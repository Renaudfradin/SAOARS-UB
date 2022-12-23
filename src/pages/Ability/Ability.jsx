import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import imgAbilityDefault from "../../assets/img/imgDefault/abilitys.jpg"

export default function Ability(params) {
  const param = useParams();
  const idParam = param.id;
  const [ability , updateAbility] = useState([]);

  useEffect(() => {
    console.log(idParam);
    axios.get(`https://api-saoars.vercel.app/ability/${idParam}`)
    .then((response) => {
      updateAbility(response.data.Ability[0]);
    })
  }, [])

  useEffect(()=>{
    document.title= `${ability.name}`;
  })

  return(
    <div>
      <p>Ability</p>
      <p>{ability.name}</p>
      <p>{ability.description}</p>
      <p>{ability.type}</p>
      <p>{ability.start}</p>
      <img src={imgAbilityDefault} alt="" />
    </div>
  )
}