import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import imgAbilityDefault from "@assets/img/imgDefault/abilitys.jpg";
import "./Ability.css";
import { Helmet } from "react-helmet-async";

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

  return(
    <div>
      <Helmet>
        <title>{ability.name}</title>
      </Helmet>
      <p>{ability.name}</p>
      <p>{ability.description}</p>
      <p>{ability.type}</p>
      <p>{ability.start}</p>
      <img src={imgAbilityDefault} alt="" />
    </div>
  )
}